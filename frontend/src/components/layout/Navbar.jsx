import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold">Digital Legacy</h1>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Home
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/media"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                    >
                      My Media
                    </Link>
                    <Link
                      to="/recipients"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                    >
                      Recipients
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/about"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                    >
                      About
                    </Link>
                    <Link
                      to="/pricing"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                    >
                      Pricing
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
