import React from 'react';

const ArtworkDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="h-4 w-4 bg-gray-300 rounded"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-4 bg-gray-300 rounded"></div>
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image & Info Skeleton */}
          <div className="space-y-6">
            {/* Main Image Skeleton */}
            <div className="bg-gray-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse"></div>
              </div>
            </div>

            {/* Additional Views Skeleton */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-square bg-gray-200 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Info Card Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details Skeleton */}
          <div className="space-y-8">
            {/* Title & Category Skeleton */}
            <div>
              <div className="h-12 w-3/4 bg-gray-300 rounded mb-4 animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-200 rounded-full mb-6 animate-pulse"></div>
              
              {/* Price Section Skeleton (Optional) */}
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-6 mb-6 animate-pulse">
                <div>
                  <div className="h-4 w-16 bg-gray-300 rounded mb-2"></div>
                  <div className="h-10 w-32 bg-gray-300 rounded"></div>
                </div>
                <div className="h-12 w-40 bg-gray-300 rounded-lg"></div>
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
              <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Tags Skeleton */}
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
              <div className="h-7 w-24 bg-gray-300 rounded mb-4"></div>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-20 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Metadata Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="h-5 w-20 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 w-36 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 w-36 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Social Actions Skeleton */}
            <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl shadow-xl p-8 animate-pulse">
              <div className="h-7 w-40 bg-gray-400 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="flex-1 h-12 bg-gray-400 rounded-lg"></div>
                <div className="flex-1 h-12 bg-gray-400 rounded-lg"></div>
                <div className="flex-1 h-12 bg-gray-400 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Artworks Skeleton */}
        <div className="mt-16 animate-pulse">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-gray-300 rounded"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300"></div>
                <div className="p-4">
                  <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button Skeleton */}
        <div className="mt-12 text-center animate-pulse">
          <div className="inline-flex items-center gap-2 bg-gray-200 px-6 py-3 rounded-lg w-40 h-12"></div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailSkeleton;