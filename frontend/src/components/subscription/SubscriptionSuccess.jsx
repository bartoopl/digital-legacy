import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SubscriptionSuccess = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sessionDetails, setSessionDetails] = useState(null);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        const verifySession = async () => {
            if (!sessionId) {
                setError('Invalid session');
                setLoading(false);
                return;
            }

            try {
                // Opcjonalnie: możesz zweryfikować sesję po stronie serwera
                // Tutaj po prostu symulujemy opóźnienie
                await new Promise(resolve => setTimeout(resolve, 1500));

                setSessionDetails({
                    success: true,
                    plan: 'premium', // To powinno być pobrane z backendu
                });
                setLoading(false);
            } catch (err) {
                console.error('Error verifying session:', err);
                setError('Failed to verify payment session');
                setLoading(false);
            }
        };

        verifySession();
    }, [sessionId]);

    // Automatyczne przekierowanie do panelu subskrypcji po 5 sekundach
    useEffect(() => {
        if (sessionDetails?.success) {
            const timer = setTimeout(() => {
                navigate('/subscription');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [sessionDetails, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <h2 className="text-2xl font-semibold mt-4">Processing your subscription...</h2>
                    <p className="text-gray-600 mt-2">Please wait while we confirm your payment</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Something went wrong</h2>
                    <p className="text-gray-600 mt-2">{error}</p>
                    <div className="mt-6">
                        <Link
                            to="/subscription/plans"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Try Again
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold mt-4">Subscription Successful!</h2>
                <p className="text-gray-600 mt-2">
                    Thank you for subscribing to Digital Legacy {sessionDetails.plan}. Your subscription is now active.
                </p>
                <p className="text-gray-600 mt-4">
                    You will be redirected to your subscription dashboard in a few seconds...
                </p>
                <div className="mt-6">
                    <Link
                        to="/subscription"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Go to My Subscription
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSuccess;