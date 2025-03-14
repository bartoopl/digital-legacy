import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MediaUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'audio'
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const navigate = useNavigate();

  const { title, type } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = e => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (!title.trim() || !file) {
      setError('Title and file are required');
      return;
    }
    
    // Validate file type
    if (type === 'audio' && !file.type.startsWith('audio/')) {
      setError('Please select an audio file');
      return;
    }
    
    if (type === 'video' && !file.type.startsWith('video/')) {
      setError('Please select a video file');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const data = new FormData();
    data.append('title', title);
    data.append('type', type);
    data.append('file', file);
    
    try {
      await axios.post('/api/media/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });
      
      navigate('/media');
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading file');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload Media</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <label 
              htmlFor="title" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter a title for your media"
              required
            />
          </div>
          
          <div className="mb-4">
            <label 
              htmlFor="type" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="file" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={onFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              accept={type === 'audio' ? 'audio/*' : 'video/*'}
              required
            />
            <p className="text-gray-500 text-xs mt-1">
              Maximum file size: 50MB
            </p>
          </div>
          
          {loading && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-xs mt-1">
                Uploading: {progress}%
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/media')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MediaUpload;
