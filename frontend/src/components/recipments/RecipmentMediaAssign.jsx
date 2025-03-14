import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RecipientMediaAssign = () => {
    const [recipient, setRecipient] = useState(null);
    const [allMedia, setAllMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch recipient data
                const recipientRes = await axios.get(`/api/recipients/${id}`);
                setRecipient(recipientRes.data);

                // Fetch all user media
                const mediaRes = await axios.get('/api/media');
                setAllMedia(mediaRes.data);

                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Check if media is assigned to this recipient
    const isMediaAssigned = (mediaId) => {
        return recipient.media && recipient.media.some(id => id === mediaId);
    };

    // Toggle media assignment
    const toggleMediaAssignment = async (mediaId) => {
        try {
            const isAssigned = isMediaAssigned(mediaId);

            await axios.put(`/api/recipients/${id}/media/${mediaId}`, {
                assign: !isAssigned
            });

            // Update local state
            if (isAssigned) {
                // Remove media
                setRecipient({
                    ...recipient,
                    media: recipient.media.filter(id => id !== mediaId)
                });
            } else {
                // Add media
                setRecipient({
                    ...recipient,
                    media: [...recipient.media, mediaId]
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating media assignment');
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
                        <Link
                            to="/media/note/new"
                            className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                        >
                            Create Note
                        </Link>
                        {' or '}
                        <Link
                            to="/media/upload"
                            className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                        >
                            Upload Media
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4">
                            <p className="mb-4 text-gray-600">
                                Select the media items you want to share with this recipient.
                                Assigned media will be sent to the recipient when your subscription expires.
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
                                        onClick={() => toggleMediaAssignment(media._id)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{media.title}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {media.type.charAt(0).toUpperCase() + media.type.slice(1)} ·
                                                    Created {new Date(media.createdAt).toLocaleDateString()}
                                                </p>
                                                {media.type === 'note' && media.content && (
                                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t flex justify-between items-center">
                                <div className="text-gray-600">
                                    {recipient.media ? recipient.media.length : 0} item(s) assigned
                                </div>
                                <button
                                    onClick={() => navigate(`/recipients/${id}`)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Done
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