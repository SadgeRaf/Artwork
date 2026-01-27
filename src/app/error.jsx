"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiAlertTriangle, FiHome, FiRefreshCw, FiArrowLeft, FiAlertCircle, FiFrown } from 'react-icons/fi';

const Error = ({ error, reset }) => {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('code');
  const artworkId = searchParams.get('id');
  
  // Log error for debugging
  useEffect(() => {
    console.error('Artwork Error:', error);
  }, [error]);

  // Define error messages based on error code or message
  const getErrorMessage = () => {
    if (errorCode === '404') {
      return {
        title: 'Artwork Not Found',
        description: `The artwork you're looking for doesn't exist or may have been removed.`,
        icon: <FiAlertCircle className="w-20 h-20" />,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
      };
    }
    
    if (error?.message?.includes('Failed to fetch') || errorCode === '500') {
      return {
        title: 'Server Error',
        description: 'There was a problem loading the artwork. Please try again later.',
        icon: <FiAlertTriangle className="w-20 h-20" />,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      };
    }
    
    if (error?.message?.includes('Invalid JSON')) {
      return {
        title: 'Invalid Data',
        description: 'There was an issue with the artwork data. Please contact support.',
        icon: <FiAlertCircle className="w-20 h-20" />,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      };
    }
    
    // Default error
    return {
      title: 'Something Went Wrong',
      description: 'We encountered an unexpected error while loading the artwork.',
      icon: <FiFrown className="w-20 h-20" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    };
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full">
        {/* Error Icon Container */}
        <div className={`${errorInfo.bgColor} ${errorInfo.borderColor} border-2 rounded-2xl p-8 mb-8 text-center`}>
          <div className={`${errorInfo.color} inline-block mb-6`}>
            {errorInfo.icon}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {errorInfo.title}
          </h1>
          
          <p className="text-gray-600 mb-6 text-lg">
            {errorInfo.description}
          </p>
          
          {/* Additional details for debugging */}
          <div className="bg-white/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Error Details:</p>
            <code className="text-sm text-gray-700 bg-gray-100 p-2 rounded block overflow-x-auto">
              {error?.message || 'Unknown error occurred'}
            </code>
            {artworkId && (
              <p className="text-sm text-gray-500 mt-2">
                Artwork ID: <span className="font-mono">{artworkId}</span>
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            <FiRefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link
            href="/artworks"
            className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-xl border border-gray-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow hover:shadow-md"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Gallery
          </Link>
        </div>

        {/* Additional Help Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <FiHome className="w-8 h-8 text-gray-600 mb-3 group-hover:text-blue-600" />
              <span className="font-medium text-gray-800">Home</span>
              <span className="text-sm text-gray-500 mt-1">Go to homepage</span>
            </Link>
            
            <Link
              href="/contact"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <FiAlertCircle className="w-8 h-8 text-gray-600 mb-3 group-hover:text-blue-600" />
              <span className="font-medium text-gray-800">Contact Support</span>
              <span className="text-sm text-gray-500 mt-1">Get help from our team</span>
            </Link>
            
            <Link
              href="/faq"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <FiAlertTriangle className="w-8 h-8 text-gray-600 mb-3 group-hover:text-blue-600" />
              <span className="font-medium text-gray-800">FAQ</span>
              <span className="text-sm text-gray-500 mt-1">Common questions</span>
            </Link>
          </div>
        </div>

        {/* Technical Info for Debugging */}
        <div className="mt-8 p-4 bg-gray-800 text-gray-300 rounded-xl font-mono text-sm overflow-x-auto">
          <p className="mb-2">// Error Debug Information</p>
          <p>Timestamp: {new Date().toISOString()}</p>
          <p>Error Code: {errorCode || 'N/A'}</p>
          <p>Artwork ID: {artworkId || 'N/A'}</p>
          {error?.stack && (
            <div className="mt-2">
              <p>Stack Trace:</p>
              <pre className="text-xs mt-1 whitespace-pre-wrap opacity-75">
                {error.stack.split('\n').slice(0, 3).join('\n')}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-x-32 -translate-y-32 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-pink-100 to-orange-100 rounded-full translate-x-32 translate-y-32 opacity-30"></div>
    </div>
  );
};

export default Error;