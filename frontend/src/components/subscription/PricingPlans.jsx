import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { SubscriptionContext } from '../../context/SubscriptionContext';

// Zainstaluj paczkę stripe-js: npm install @stripe/stripe-js
import { loadStripe } from '@stripe/stripe-js';

// Inicjalizacja Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PricingPlans = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);
    const { subscription, createCheckoutSession } = useContext(SubscriptionContext);
    const navigate = useNavigate();

    // Plany subskrypcji - w rzeczywistym projekcie te identyfikatory powinny być pobierane z backendu
    // lub ze zmiennych środowiskowych
    const plans = [
        {
            id: 'basic',
            name: 'Basic',
            price: '$5.99',
            priceId: 'price_XXXXXXXXXXXX', // Zastąp rzeczywistym ID ceny z panelu Stripe
            features: [
                '5 notatek',
                '10 minut audio',
                '5 minut wideo',
                '3 odbiorców'
            ],
            popular: false
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '$14.99',
            priceId: 'price_YYYYYYYYYYYY', // Zastąp rzeczywistym ID ceny z panelu Stripe
            features: [
                'Nieograniczona liczba notatek',
                'Nieograniczona ilość audio',
                'Nieograniczona ilość wideo',
                'Nieograniczona liczba odbiorców',
                'Priorytetowe wsparcie'
            ],
            popular: true
        },
        {
            id: 'lifetime',
            name: 'Lifetime',
            price: '$199.99',
            priceId: 'price_ZZZZZZZZZZZZ', // Zastąp rzeczywistym ID ceny z panelu Stripe
            features: [
                'Wszystkie funkcje Premium',
                'Jednorazowa płatność',
                'Dożywotni dostęp',
                'VIP wsparcie'
            ],
            popular: false
        }
    ];

    const handleSelectPlan = async (plan) => {
        try {
            setLoading(true);
            setError(null);

            // Sprawdź, czy użytkownik ma już aktywną subskrypcję
            if (subscription?.active && !subscription.cancelAtPeriodEnd) {
                if (!window.confirm('You already have an active subscription. Do you want to change your plan?')) {
                    setLoading(false);
                    return;
                }
            }

            // Utwórz sesję checkout w Stripe
            const sessionId = await createCheckoutSession(plan.id, plan.priceId);

            if (!sessionId) {
                throw new Error('Failed to create checkout session');
            }

            // Przekieruj do formularza płatności Stripe
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                throw error;
            }
        } catch (err) {
            console.error('Error selecting plan:', err);
            setError(err.message || 'An error occurred while selecting the plan');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Choose Your Digital Legacy Plan
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Select the right plan for preserving your digital legacy
                    </p>
                </div>

                {error && (
                    <div className="mt-8 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-lg shadow-lg divide-y divide-gray-200 ${
                                plan.popular ? 'border-2 border-blue-500 relative' : ''
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                                    <div className="inline-block px-4 py-1 text-sm font-semibold tracking-wider uppercase bg-blue-500 text-white rounded-full">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className="p-6">
                                <h2 className="text-2xl font-medium text-gray-900">{plan.name}</h2>
                                <p className="mt-4 text-gray-500">{plan.price} / month</p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {plan.id === 'lifetime' ? 'One-time payment' : 'Billed monthly'}
                                </p>

                                <button
                                    type="button"
                                    className={`mt-8 w-full bg-blue-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-blue-700 ${
                                        loading ? 'opacity-75 cursor-not-allowed' : ''
                                    }`}
                                    onClick={() => handleSelectPlan(plan)}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : (
                                        subscription?.active && subscription.plan === plan.id
                                            ? 'Current Plan'
                                            : 'Select Plan'
                                    )}
                                </button>
                            </div>

                            <div className="p-6">
                                <h3 className="text-sm font-medium text-gray-900">What's included</h3>
                                <ul className="mt-6 space-y-4">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-gray-700">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {subscription?.active && (
                    <div className="mt-12 max-w-md mx-auto">
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">
                                        Your Current Plan: {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {subscription.cancelAtPeriodEnd
                                            ? `Your subscription will end on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                                            : `Next billing date: ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                                        }
                                    </p>
                                    <p className="mt-2">
                                        <button
                                            type="button"
                                            className="text-blue-600 hover:text-blue-500"
                                            onClick={() => navigate('/subscription')}
                                        >
                                            Manage your subscription
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PricingPlans;