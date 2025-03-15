import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RecipientDetail = () => {
  const [recipient, setRecipient] = useState(null);
  const [assignedMedia, setAssignedMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipientAndMedia = async () => {
      try {
        const recipientRes = await axios.get(`/api/recipients/${id}`);
        setRecipient(recipientRes.data);
        
        // Jeśli odbiorca ma przypisane media, pobierz szczegóły każdego medium
        if (recipientRes.data.media && recipientRes.data.media.length > 0) {
          const mediaPromises = recipientRes.data.media.map(mediaId => 
            axios.get(`/api/media/${mediaId}`)
          );
          
          const mediaResults = await Promise.all(mediaPromises);
          setAssignedMedia(mediaResults.map(res => res.data));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipient details:', err);
        setError('Error fetching recipient details. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecipientAndMedia();
  }, [id]);

  const deleteRecipient = async () => {
    if (window.confirm('Are you sure you want to delete this recipient?')) {
      try {
        await axios.delete(`/api/recipients/${id}`);
        navigate('/recipients');
      } catch (err) {
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
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{recipient.name}</h1>
              <div className="space-x-2">
                <Link
                  to={`/recipients/edit/${recipient._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <Link
                  to={`/recipients/${recipient._id}/media`}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Assign Media
                </Link>
                <button
                  onClick={deleteRecipient}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg">{recipient.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg">{recipient.phone || 'Not provided'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Relationship</p>
                <p className="text-lg">{recipient.relationship || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Added on</p>
                <p className="text-lg">{new Date(recipient.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            {recipient.personalMessage && (
              <div className="mb-6">
                <p className="text-sm text-gray-500">Personal Message</p>
                <div className="bg-gray-50 p-4 rounded mt-1">
                  <p className="whitespace-pre-line">{recipient.personalMessage}</p>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">Assigned Media</h2>
                <Link
                  to={`/recipients/${recipient._id}/media`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Manage Media
                </Link>
              </div>
              
              {assignedMedia.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded text-center">
                  <p className="text-gray-600">No media assigned to this recipient yet.</p>
                  <Link
                    to={`/recipients/${recipient._id}/media`}
                    className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Assign Media
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignedMedia.map(media => (
                    <div key={media._id} className="border rounded p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{media.title}</p>
                          <p className="text-sm text-gray-500">{media.type.charAt(0).toUpperCase() + media.type.slice(1)}</p>
                        </div>
                        <Link
                          to={`/media/${media._id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-6 border-t pt-4">
              <Link
                to="/recipients"
                className="text-blue-600 hover:text-blue-800"
              >
                Back to Recipients
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientDetail;
