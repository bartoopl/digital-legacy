import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Context Providers
import AuthContextProvider from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import NotFound from './components/layout/NotFound';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';

// Dashboard Components
import Dashboard from './components/dashboard/Dashboard';

// Media Components
import MediaList from './components/media/MediaList';
import MediaDetail from './components/media/MediaDetail';
import NoteForm from './components/media/NoteForm';
import MediaUpload from './components/media/MediaUpload';

// Set base URL for axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Setup axios interceptor for authentication
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Private Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              
              {/* Media Routes */}
              <Route 
                path="/media" 
                element={
                  <PrivateRoute>
                    <MediaList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/media/:id" 
                element={
                  <PrivateRoute>
                    <MediaDetail />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/media/note/new" 
                element={
                  <PrivateRoute>
                    <NoteForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/media/edit/:id" 
                element={
                  <PrivateRoute>
                    <NoteForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/media/upload" 
                element={
                  <PrivateRoute>
                    <MediaUpload />
                  </PrivateRoute>
                } 
              />
              
              {/* Recipients placeholder routes */}
              <Route 
                path="/recipients/*" 
                element={
                  <PrivateRoute>
                    <div className="container mx-auto px-4 py-8">
                      <h1 className="text-2xl font-bold mb-4">Recipients Management</h1>
                      <p className="mb-4">This feature is coming soon!</p>
                      <p>The recipients management will allow you to:</p>
                      <ul className="list-disc pl-8 mt-2">
                        <li>Add people who will receive your messages</li>
                        <li>Assign specific media to specific recipients</li>
                        <li>Add personalized messages for each recipient</li>
                      </ul>
                    </div>
                  </PrivateRoute>
                } 
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} Digital Legacy. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
