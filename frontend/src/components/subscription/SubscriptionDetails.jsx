import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubscriptionContext } from '../../context/SubscriptionContext';

const SubscriptionDetails = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { subscription, cancelSubscription, getPaymentHistory } = useContext(SubscriptionContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                setLoading(true);
                const history = await getPaymentHistory();
                setPaymentHistory(history);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching payment history:', err);
                setError('Failed to load payment history');
                setLoading(false);
            }
        };

        if (subscription?.active) {
            fetchPaymentHistory();
        }
    }, [subscription, getPaymentHistory]);

    const handleCancelSubscription = async () => {
        // Potwierdzenie anulowania subskrypcji
        if (!window.confirm('Are you sure you want to cancel your subscription? Your media will be sent to recipients when the subscription ends.')) {
            return;
        }

        try {
            setLoading(true);
            const success = await cancelSubscription();

            if (success) {
                alert('Your subscription has been canceled and will end at the current billing period');
            } else {
                throw new Error('Failed to cancel subscription');
            }

            setLoading(false);
        } catch (err) {
            console.error('Error canceling subscription:', err);
            setError(err.message || 'An error occurred while canceling the subscription');
            setLoading(false);
        }
    };

    if (!subscription) {
        return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                No Active Subscription
                            </h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>
                                    You don't have an active subscription. Choose a plan to start preserving your digital legacy.
                                </p>
                            </div>
                            <div className="mt-5">
                                <Link
                                    to="/subscription/plans"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    View Plans
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Your Subscription</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Subscription Details
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Plan
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Status
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                      subscription.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : subscription.status === 'past_due'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                  }`}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1).replace('_', ' ')}
                  </span>

                                    {subscription.cancelAtPeriodEnd && (
                                        <span className="ml-2 text-xs text-red-600">
                      (Cancels on {new Date(subscription.currentPeriodEnd).toLocaleDateString()})
                    </span>
                                    )}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Current Period
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {new Date(subscription.currentPeriodStart).toLocaleDateString()} - {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="flex space-x-4 mb-8">
                    <Link
                        to="/subscription/plans"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Change Plan
                    </Link>

                    {!subscription.cancelAtPeriodEnd && (
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                            onClick={handleCancelSubscription}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Cancel Subscription'}
                        </button>
                    )}
                </div>

                <h2 className="text-xl font-semibold mb-4">Payment History</h2>

                {paymentHistory.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-gray-500">No payment history available</p>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {paymentHistory.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.amount.toFixed(2)} {payment.currency.toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                          payment.status === 'succeeded'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionDetails;