import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MediaList = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get('/api/media');
        setMedia(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching media');
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const deleteMedia = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/media/${id}`);
        setMedia(media.filter(item => item._id !== id));
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Media</h1>
        <div className="space-x-2">
          <Link
            to="/media/note/new"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Note
          </Link>
          <Link
            to="/media/upload"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Upload Media
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {media.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-600">You haven't added any media yet.</p>
          <p className="mt-2 text-gray-500">
            Start by adding a note or uploading audio/video content.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.type === 'note' 
                      ? 'bg-blue-100 text-blue-800' 
                      : item.type === 'audio' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-pink-100 text-pink-800'
                  }`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
                
                {item.type === 'note' && (
                  <div className="mt-3">
                    <p className="text-gray-600 line-clamp-3">{item.content}</p>
                  </div>
                )}
                
                {(item.type === 'audio' || item.type === 'video') && (
                  <div className="mt-3">
                    <p className="text-gray-500 text-sm">
                      Added on {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-4">
                  <Link 
                    to={`/media/${item._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                  <div className="space-x-2">
                    <Link 
                      to={`/media/edit/${item._id}`}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteMedia(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaList;
