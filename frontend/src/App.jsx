import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Context Providers
import AuthContextProvider from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import About from './components/layout/About';
import Pricing from './components/layout/Pricing';
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

// Recipient Components
import RecipientList from './components/recipients/RecipientList.jsx';
import RecipientForm from './components/recipients/RecipientForm.jsx';
import RecipientDetail from './components/recipients/RecipientDetail.jsx';
import RecipientMediaAssign from './components/recipients/RecipientMediaAssign.jsx';

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
                            <Route path="/about" element={<About />} />
                            <Route path="/pricing" element={<Pricing />} />
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

                            {/* Recipients Routes */}
                            <Route
                                path="/recipients"
                                element={
                                    <PrivateRoute>
                                        <RecipientList />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/recipients/new"
                                element={
                                    <PrivateRoute>
                                        <RecipientForm />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/recipients/edit/:id"
                                element={
                                    <PrivateRoute>
                                        <RecipientForm />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/recipients/:id"
                                element={
                                    <PrivateRoute>
                                        <RecipientDetail />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/recipients/:id/media"
                                element={
                                    <PrivateRoute>
                                        <RecipientMediaAssign />
                                    </PrivateRoute>
                                }
                            />

                            {/* 404 Route */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <footer className="bg-gray-800 text-white py-6">
                        <div className="container mx-auto px-4 text-center">
                            <p>&copy; {new Date().getFullYear()} Digital Legacy. Wszelkie prawa zastrzeżone.</p>
                            <div className="mt-2 flex justify-center space-x-6">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Polityka prywatności
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Warunki użytkowania
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Kontakt
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </Router>
        </AuthContextProvider>
    );
}

export default App;