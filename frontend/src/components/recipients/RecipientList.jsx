import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipientList = () => {
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const res = await axios.get('/api/recipients');
                setRecipients(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching recipients:', err);
                setError('Failed to load recipients. Please try again later.');
                setLoading(false);
            }
        };

        fetchRecipients();
    }, []);

    const deleteRecipient = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipient?')) {
            try {
                await axios.delete(`/api/recipients/${id}`);
                // Aktualizuj lokalny stan, aby usunąć odbiorcę z listy
                setRecipients(recipients.filter(recipient => recipient._id !== id));
            } catch (err) {
                console.error('Error deleting recipient:', err);
                setError(err.response?.data?.message || 'Error deleting recipient');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Recipients</h1>
                <Link
                    to="/recipients/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Recipient
                </Link>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {recipients.length === 0 ? (
                <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="text-lg text-gray-600">You haven't added any recipients yet.</p>
                    <p className="mt-2 text-gray-500">
                        Add people who should receive your messages when they're sent.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Relationship</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {recipients.map(recipient => (
                            <tr key={recipient._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    <div className="font-medium">{recipient.name}</div>
                                </td>
                                <td className="py-3 px-4">{recipient.email}</td>
                                <td className="py-3 px-4">{recipient.relationship || '-'}</td>
                                <td className="py-3 px-4">
                                    <div className="flex justify-center space-x-2">
                                        <Link
                                            to={`/recipients/${recipient._id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/recipients/edit/${recipient._id}`}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteRecipient(recipient._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RecipientList;