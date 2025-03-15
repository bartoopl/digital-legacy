import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RecipientMediaAssign = () => {
    const [recipient, setRecipient] = useState(null);
    const [allMedia, setAllMedia] = useState([]);
    const [assignedMediaIds, setAssignedMediaIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(`Fetching data for recipient ID: ${id}`);

                // Najpierw pobierz dane odbiorcy
                const recipientRes = await axios.get(`/api/recipients/${id}`);
                console.log('Recipient data:', recipientRes.data);
                setRecipient(recipientRes.data);

                // Ustaw listę przypisanych mediów
                if (recipientRes.data.media && recipientRes.data.media.length > 0) {
                    console.log('Assigned media IDs:', recipientRes.data.media);
                    setAssignedMediaIds(recipientRes.data.media);
                }

                // Następnie pobierz wszystkie media
                const mediaRes = await axios.get('/api/media');
                console.log('All media:', mediaRes.data);
                setAllMedia(mediaRes.data);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                const errorMessage = err.response?.data?.message || 'Failed to load data. Please try again later.';
                console.error('Error message:', errorMessage);
                setError(errorMessage);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Sprawdź czy medium jest przypisane do tego odbiorcy
    const isMediaAssigned = (mediaId) => {
        return assignedMediaIds.includes(mediaId);
    };

    // Przełącz przypisanie medium
    const toggleMediaAssignment = async (mediaId) => {
        try {
            setSaving(true);

            const isAssigned = isMediaAssigned(mediaId);
            console.log(`Toggling media ${mediaId} assignment to ${isAssigned ? 'false' : 'true'}`);

            // Wyślij żądanie do API
            const response = await axios.put(`/api/recipients/${id}/media/${mediaId}`, {
                assign: !isAssigned
            });

            console.log('API response:', response.data);

            // Zaktualizuj lokalny stan
            if (isAssigned) {
                // Usuń medium z listy przypisanych
                setAssignedMediaIds(
                    assignedMediaIds.filter(id => id !== mediaId)
                );
            } else {
                // Dodaj medium do listy przypisanych
                setAssignedMediaIds([...assignedMediaIds, mediaId]);
            }

            setSaving(false);
        } catch (err) {
            console.error('Error toggling media assignment:', err);
            const errorMessage = err.response?.data?.message || 'Failed to update media assignment. Please try again.';
            console.error('Error message:', errorMessage);
            setError(errorMessage);
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
                <Link
                    to="/recipients"
                    className="text-blue-600 hover:text-blue-800"
                >
                    Back to Recipients
                </Link>
            </div>
        );
    }

    if (!recipient) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    Recipient not found
                </div>
                <Link
                    to="/recipients"
                    className="text-blue-600 hover:text-blue-800"
                >
                    Back to Recipients
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Assign Media to {recipient.name}</h1>
                    <Link
                        to={`/recipients/${id}`}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Back to Recipient Details
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {allMedia.length === 0 ? (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                        <p>You don't have any media to assign. Create some media first.</p>
                        <div className="mt-3">
                            <Link
                                to="/media/note/new"
                                className="inline-block mr-3 text-blue-600 hover:text-blue-800"
                            >
                                Create Note
                            </Link>
                            <Link
                                to="/media/upload"
                                className="inline-block text-blue-600 hover:text-blue-800"
                            >
                                Upload Media
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4">
                            <p className="mb-4 text-gray-600">
                                Select the media items you want to share with this recipient.
                                When your subscription expires, assigned media will be sent to this recipient.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {allMedia.map(media => (
                                    <div
                                        key={media._id}
                                        className={`border rounded p-4 cursor-pointer ${
                                            isMediaAssigned(media._id)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                        onClick={() => !saving && toggleMediaAssignment(media._id)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{media.title}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {media.type.charAt(0).toUpperCase() + media.type.slice(1)} ·
                                                    Created {new Date(media.createdAt).toLocaleDateString()}
                                                </p>
                                                {media.type === 'note' && media.content && (
                                                    <p className="text-sm text-gray-600 mt-2 truncate max-w-xs">
                                                        {media.content}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="ml-4 flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isMediaAssigned(media._id)}
                                                    onChange={() => {}} // Handled by the parent div onClick
                                                    className="h-5 w-5 text-blue-600"
                                                    disabled={saving}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t flex justify-between items-center">
                                <div className="text-gray-600">
                                    {assignedMediaIds.length} item(s) assigned
                                </div>
                                <button
                                    onClick={() => navigate(`/recipients/${id}`)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Done'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipientMediaAssign;