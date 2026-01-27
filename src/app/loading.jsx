"use client"

import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Loading */}
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-12 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-3 w-20 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-3 w-32 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="space-y-6">
            {/* Main Image Loading */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-300 to-gray-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="absolute inset-0 animate-pulse">
                <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:400%_100%] animate-shimmer"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400">
                  <svg className="w-16 h-16 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Thumbnails Loading */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-square bg-gray-200 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:400%_100%] animate-shimmer"></div>
                </div>
              ))}
            </div>

            {/* Stats Loading */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="h-8 w-16 bg-gray-300 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Title Loading */}
            <div>
              <div className="h-12 w-3/4 bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
              <div className="h-6 w-1/2 bg-gray-300 rounded-lg mb-6 animate-pulse"></div>
              
              {/* Price Loading */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-16 bg-gray-300 rounded mb-2 animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="h-12 w-40 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Details Grid Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="h-4 w-20 bg-gray-300 rounded mb-2 animate-pulse"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Description Loading */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="h-8 w-48 bg-gray-300 rounded mb-6 animate-pulse"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                ))}
              </div>
            </div>

            {/* Tags Loading */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="h-7 w-24 bg-gray-300 rounded mb-4 animate-pulse"></div>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Additional Info Loading */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-xl p-8">
              <div className="h-7 w-40 bg-gray-700 rounded mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-48 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Artworks Loading */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:400%_100%] animate-shimmer"></div>
                </div>
                <div className="p-4">
                  <div className="h-5 w-3/4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button Loading */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-200 px-6 py-3 rounded-lg w-40 h-12 animate-pulse mx-auto"></div>
        </div>
      </div>

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Loading;