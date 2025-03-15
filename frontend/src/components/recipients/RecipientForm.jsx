import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RecipientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    personalMessage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      // Jeśli edytujemy, pobierz dane odbiorcy
      const fetchRecipient = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`/api/recipients/${id}`);
          const recipientData = res.data;
          
          setFormData({
            name: recipientData.name || '',
            email: recipientData.email || '',
            phone: recipientData.phone || '',
            relationship: recipientData.relationship || '',
            personalMessage: recipientData.personalMessage || ''
          });
          
          setLoading(false);
        } catch (err) {
          console.error('Error fetching recipient:', err);
          setError('Failed to load recipient data. Please try again.');
          setLoading(false);
        }
      };
      
      fetchRecipient();
    }
  }, [id, isEditing]);

  const { name, email, phone, relationship, personalMessage } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError('Name is required');
      return false;
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      if (isEditing) {
        // Aktualizacja istniejącego odbiorcy
        await axios.put(`/api/recipients/${id}`, formData);
      } else {
        // Dodanie nowego odbiorcy
        await axios.post('/api/recipients', formData);
      }
      
      navigate('/recipients');
    } catch (err) {
      console.error('Error saving recipient:', err);
      setError(err.response?.data?.message || 'Error saving recipient');
      setLoading(false);
    }
  };

  if (isEditing && loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Recipient' : 'Add New Recipient'}
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <label 
              htmlFor="name" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter recipient's name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter recipient's email"
              required
            />
          </div>
          
          <div className="mb-4">
            <label 
              htmlFor="phone" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter recipient's phone number"
            />
          </div>
          
          <div className="mb-4">
            <label 
              htmlFor="relationship" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Relationship (optional)
            </label>
            <input
              type="text"
              id="relationship"
              name="relationship"
              value={relationship}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="E.g., Family, Friend, Colleague"
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="personalMessage" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Personal Message (optional)
            </label>
            <textarea
              id="personalMessage"
              name="personalMessage"
              value={personalMessage}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Add a personal message to be sent alongside your media"
              rows="4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/recipients')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Recipient' : 'Add Recipient')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipientForm;
