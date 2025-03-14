import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const MediaDetail = () => {
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`/api/media/${id}`);
        setMedia(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching media');
        setLoading(false);
      }
    };

    fetchMedia();
  }, [id]);

  const deleteMedia = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/media/${id}`);
        navigate('/media');
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting media');
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
          to="/media"
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Media
        </Link>
      </div>
    );
  }

  if (!media) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Media not found
        </div>
        <Link
          to="/media"
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Media
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{media.title}</h1>
            <span className={`px-2 py-1 text-xs rounded-full ${
              media.type === 'note' 
                ? 'bg-blue-100 text-blue-800' 
                : media.type === 'audio' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-pink-100 text-pink-800'
            }`}>
              {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
            </span>
          </div>
          
          <div className="text-gray-500 text-sm mb-4">
            Created: {new Date(media.createdAt).toLocaleDateString()}{' '}
            {new Date(media.createdAt).toLocaleTimeString()}
            {media.updatedAt !== media.createdAt && (
              <span>
                {' '} (Updated: {new Date(media.updatedAt).toLocaleDateString()}{' '}
                {new Date(media.updatedAt).toLocaleTimeString()})
              </span>
            )}
          </div>
          
          {media.type === 'note' && (
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="whitespace-pre-wrap">{media.content}</p>
            </div>
          )}
          
          {media.type === 'audio' && (
            <div className="bg-gray-50 p-4 rounded mb-4">
              <audio 
                controls 
                className="w-full"
                src={media.fileUrl}
              />
            </div>
          )}
          
          {media.type === 'video' && (
            <div className="bg-gray-50 p-4 rounded mb-4">
              <video 
                controls 
                className="w-full"
                src={media.fileUrl}
              />
            </div>
          )}
          
          <div className="flex justify-between items-center mt-6">
            <Link
              to="/media"
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Media
            </Link>
            
            <div className="space-x-2">
              <Link
                to={`/media/edit/${media._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={deleteMedia}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;
