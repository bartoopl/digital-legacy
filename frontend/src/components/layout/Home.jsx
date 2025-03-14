import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero section */}
            <div className="relative bg-gray-900">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                        alt="People writing letters"
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-70" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Your Digital Legacy
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                        Preserve your memories and messages for your loved ones. Create personalized audio, video, and written content to be shared when you're no longer here.
                    </p>
                    <div className="mt-10 flex space-x-4">
                        <Link
                            to="/register"
                            className="inline-block bg-blue-600 py-3 px-6 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="inline-block bg-white py-3 px-6 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-gray-50"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features section */}
            <div className="py-16 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
                        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                            How It Works
                        </p>
                        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                            Create, store, and share your legacy on your terms.
                        </p>
                    </div>

                    <div className="mt-12">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="pt-6">
                                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Record Your Messages</h3>
                                        <p className="mt-5 text-base text-gray-500">
                                            Create audio, video, or written messages for your loved ones that capture your personality and memories.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Securely Stored</h3>
                                        <p className="mt-5 text-base text-gray-500">
                                            Your content is encrypted and securely stored until it's time to be delivered to your chosen recipients.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Automated Delivery</h3>
                                        <p className="mt-5 text-base text-gray-500">
                                            Your messages will only be delivered if you stop paying the subscription or manually trigger the process.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;