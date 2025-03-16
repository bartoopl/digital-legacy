import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                    <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold mt-4">Payment Canceled</h2>
                <p className="text-gray-600 mt-2">
                    Your subscription payment was canceled. No charges have been made.
                </p>
                <div className="mt-6 space-y-4">
                    <Link
                        to="/subscription/plans"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Try Again
                    </Link>
                    <div>
                        <Link
                            to="/dashboard"
                            className="text-sm text-blue-600 hover:text-blue-500"
                        >
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCancel;