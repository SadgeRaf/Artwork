"use client"

import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header/Nav Loading */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="h-10 w-32 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hero Section Loading */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Main Heading */}
            <div className="h-12 w-3/4 max-w-2xl bg-gray-300 rounded-lg animate-pulse mx-auto mb-6"></div>
            
            {/* Subheading */}
            <div className="h-6 w-2/3 max-w-xl bg-gray-200 rounded-lg animate-pulse mx-auto mb-8"></div>
            
            {/* CTA Buttons */}
            <div className="flex justify-center gap-4 mb-12">
              <div className="h-12 w-40 bg-purple-600 rounded-lg animate-pulse"></div>
              <div className="h-12 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Hero Image/Art Preview */}
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-2xl animate-pulse overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-300 rounded-lg animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          
          {/* Featured Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
                <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section Loading */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About Image */}
            <div className="order-2 lg:order-1">
              <div className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 rounded-full animate-pulse overflow-hidden mx-auto lg:mx-0 max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
            
            {/* About Content */}
            <div className="order-1 lg:order-2">
              <div className="h-10 w-48 bg-gray-300 rounded-lg animate-pulse mb-6"></div>
              <div className="space-y-4 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="h-4 bg-gray-200 rounded animate-pulse"
                    style={{ width: `${Math.random() * 30 + 70}%` }}
                  ></div>
                ))}
              </div>
              <div className="h-12 w-40 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services/Skills Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-56 bg-gray-300 rounded-lg animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-72 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="h-12 w-12 bg-gray-300 rounded-lg animate-pulse mb-4 mx-auto"></div>
                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mx-auto mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Loading */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div className="col-span-1 md:col-span-2">
              <div className="h-8 w-40 bg-gray-700 rounded-lg animate-pulse mb-4"></div>
              <div className="space-y-3 mb-6">
                <div className="h-4 w-64 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-56 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 bg-gray-700 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
            
            {/* Columns 2-4 */}
            {[1, 2, 3].map((col) => (
              <div key={col}>
                <div className="h-6 w-32 bg-gray-700 rounded animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="h-4 w-48 bg-gray-700 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;