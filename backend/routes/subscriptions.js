const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stripe = require('../config/stripe');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

// Utwórz klienta Stripe dla użytkownika lub pobierz istniejącego
const getOrCreateStripeCustomer = async (userId) => {
    const user = await User.findById(userId);

    if (user.stripeCustomerId) {
        return user.stripeCustomerId;
    }

    // Utwórz nowego klienta w Stripe
    const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: {
            userId: userId.toString()
        }
    });

    // Zapisz ID klienta w bazie danych
    user.stripeCustomerId = customer.id;
    await user.save();

    return customer.id;
};

// Pobierz aktualną subskrypcję użytkownika
router.get('/current', auth, async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            user: req.user.id,
            status: { $in: ['active', 'trialing', 'past_due'] }
        }).sort({ createdAt: -1 });

        if (!subscription) {
            return res.json({ active: false });
        }

        res.json({
            active: true,
            plan: subscription.plan,
            status: subscription.status,
            currentPeriodEnd: subscription.currentPeriodEnd,
            cancelAtPeriodEnd: subscription.cancelAtPeriodEnd
        });
    } catch (err) {
        console.error('Error fetching subscription:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Utwórz sesję płatności dla nowej subskrypcji
router.post('/create-checkout-session', auth, async (req, res) => {
    try {
        const { plan, priceId } = req.body;

        if (!plan || !priceId) {
            return res.status(400).json({ message: 'Plan and price ID are required' });
        }

        const customerId = await getOrCreateStripeCustomer(req.user.id);

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.CLIENT_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/subscription/cancel`,
            metadata: {
                userId: req.user.id,
                plan
            }
        });

        res.json({ sessionId: session.id });
    } catch (err) {
        console.error('Error creating checkout session:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Anuluj subskrypcję
router.post('/cancel', auth, async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            user: req.user.id,
            status: { $in: ['active', 'trialing', 'past_due'] }
        });

        if (!subscription) {
            return res.status(404).json({ message: 'No active subscription found' });
        }

        // Anuluj subskrypcję w Stripe (na końcu okresu rozliczeniowego)
        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
            cancel_at_period_end: true
        });

        // Zaktualizuj informacje w bazie danych
        subscription.cancelAtPeriodEnd = true;
        await subscription.save();

        res.json({ message: 'Subscription will be canceled at the end of the billing period' });
    } catch (err) {
        console.error('Error canceling subscription:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Webhook do obsługi zdarzeń ze Stripe
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Obsługa zdarzeń
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            // Pobierz informacje o użytkowniku i planie
            const userId = session.metadata.userId;
            const plan = session.metadata.plan;

            // Pobierz informacje o subskrypcji ze Stripe
            const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription);

            // Zapisz subskrypcję w bazie danych
            await Subscription.create({
                user: userId,
                stripeCustomerId: session.customer,
                stripeSubscriptionId: session.subscription,
                plan,
                status: stripeSubscription.status,
                currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
                currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000)
            });

            console.log(`Subscription created for user: ${userId}`);
            break;

        case 'customer.subscription.updated':
            const subscription = event.data.object;

            // Zaktualizuj subskrypcję w bazie danych
            await Subscription.findOneAndUpdate(
                { stripeSubscriptionId: subscription.id },
                {
                    status: subscription.status,
                    currentPeriodStart: new Date(subscription.current_period_start * 1000),
                    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    cancelAtPeriodEnd: subscription.cancel_at_period_end
                }
            );

            console.log(`Subscription updated: ${subscription.id}`);
            break;

        case 'customer.subscription.deleted':
            const canceledSubscription = event.data.object;

            // Oznacz subskrypcję jako anulowaną
            await Subscription.findOneAndUpdate(
                { stripeSubscriptionId: canceledSubscription.id },
                {
                    status: 'canceled'
                }
            );

            console.log(`Subscription canceled: ${canceledSubscription.id}`);

            // Tutaj możemy dodać logikę wysyłania wiadomości do odbiorców
            // Np. wywołać funkcję, która przygotuje wysyłkę wiadomości
            break;
    }

    res.json({ received: true });
});

// Pobierz historię płatności
router.get('/payment-history', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user.stripeCustomerId) {
            return res.json([]);
        }

        const charges = await stripe.charges.list({
            customer: user.stripeCustomerId
        });

        const paymentHistory = charges.data.map(charge => ({
            id: charge.id,
            amount: charge.amount / 100, // Konwersja z centów na dolary/złotówki
            currency: charge.currency,
            status: charge.status,
            date: new Date(charge.created * 1000)
        }));

        res.json(paymentHistory);
    } catch (err) {
        console.error('Error fetching payment history:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;