"use client"

import React from 'react'

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
              {/* Image Skeleton */}
              <div className="relative h-64 w-full bg-gray-300 dark:bg-gray-700"></div>
              
              {/* Content Skeleton */}
              <div className="p-5 space-y-4">
                {/* Title and Category */}
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-1">
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}