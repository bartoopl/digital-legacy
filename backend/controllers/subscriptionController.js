const Subscription = require('../models/Subscription');
const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    try {
        const { plan } = req.body;

        if (!['basic', 'premium', 'family'].includes(plan)) {
            return res.status(400).json({ message: 'Invalid plan selected' });
        }

        // Pobierz lub utwórz użytkownika Stripe
        let customer;
        const user = await User.findById(req.user.id);

        // Sprawdź, czy użytkownik ma już ID klienta Stripe
        const subscription = await Subscription.findOne({ user: req.user.id });

        if (subscription && subscription.stripeCustomerId) {
            customer = await stripe.customers.retrieve(subscription.stripeCustomerId);
        } else {
            // Utwórz nowego klienta w Stripe
            customer = await stripe.customers.create({
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                metadata: {
                    userId: user.id
                }
            });
        }

        // Ustaw odpowiedni plan cenowy w zależności od wybranego planu
        let priceId;
        switch (plan) {
            case 'basic':
                priceId = process.env.STRIPE_BASIC_PRICE_ID;
                break;
            case 'premium':
                priceId = process.env.STRIPE_PREMIUM_PRICE_ID;
                break;
            case 'family':
                priceId = process.env.STRIPE_FAMILY_PRICE_ID;
                break;
        }

        // Utwórz sesję zamówienia
        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
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
                userId: user.id,
                plan: plan
            }
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (err) {
        console.error('Error creating checkout session:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({ user: req.user.id });

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        res.json(subscription);
    } catch (err) {
        console.error('Error fetching subscription:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.cancelSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({ user: req.user.id });

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        // Anuluj subskrypcję w Stripe
        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
            cancel_at_period_end: true
        });

        // Zaktualizuj w bazie danych
        subscription.cancelAtPeriodEnd = true;
        await subscription.save();

        res.json(subscription);
    } catch (err) {
        console.error('Error canceling subscription:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.webhookHandler = async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Obsługa różnych typów zdarzeń
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            await handleCheckoutSessionCompleted(session);
            break;
        case 'customer.subscription.updated':
            const subscription = event.data.object;
            await handleSubscriptionUpdated(subscription);
            break;
        case 'customer.subscription.deleted':
            const deletedSubscription = event.data.object;
            await handleSubscriptionDeleted(deletedSubscription);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send();
};

async function handleCheckoutSessionCompleted(session) {
    try {
        const userId = session.metadata.userId;
        const plan = session.metadata.plan;

        // Pobierz szczegóły subskrypcji ze Stripe
        const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription);

        // Sprawdź, czy subskrypcja już istnieje
        let subscription = await Subscription.findOne({ user: userId });

        if (subscription) {
            // Zaktualizuj istniejącą subskrypcję
            subscription.stripeSubscriptionId = session.subscription;
            subscription.status = stripeSubscription.status;
            subscription.plan = plan;
            subscription.currentPeriodStart = new Date(stripeSubscription.current_period_start * 1000);
            subscription.currentPeriodEnd = new Date(stripeSubscription.current_period_end * 1000);
            subscription.cancelAtPeriodEnd = stripeSubscription.cancel_at_period_end;
        } else {
            // Utwórz nową subskrypcję
            subscription = new Subscription({
                user: userId,
                stripeCustomerId: session.customer,
                stripeSubscriptionId: session.subscription,
                status: stripeSubscription.status,
                plan: plan,
                currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
                currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
                cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
            });
        }

        await subscription.save();
    } catch (err) {
        console.error('Error handling checkout.session.completed:', err);
    }
}

async function handleSubscriptionUpdated(subscription) {
    try {
        // Znajdź subskrypcję w bazie danych
        const dbSubscription = await Subscription.findOne({
            stripeSubscriptionId: subscription.id
        });

        if (dbSubscription) {
            // Zaktualizuj status
            dbSubscription.status = subscription.status;
            dbSubscription.currentPeriodStart = new Date(subscription.current_period_start * 1000);
            dbSubscription.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
            dbSubscription.cancelAtPeriodEnd = subscription.cancel_at_period_end;

            await dbSubscription.save();
        }
    } catch (err) {
        console.error('Error handling subscription.updated:', err);
    }
}

async function handleSubscriptionDeleted(subscription) {
    try {
        // Znajdź subskrypcję w bazie danych
        const dbSubscription = await Subscription.findOne({
            stripeSubscriptionId: subscription.id
        });

        if (dbSubscription) {
            // Zaktualizuj status na nieaktywny
            dbSubscription.status = 'inactive';
            await dbSubscription.save();

            // Tutaj można dodać kod, który przygotuje wiadomości do wysłania do odbiorców,
            // jeśli subskrypcja została zakończona
        }
    } catch (err) {
        console.error('Error handling subscription.deleted:', err);
    }
}