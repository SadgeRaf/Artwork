"use client"

import React from 'react';
import Link from 'next/link';

const Error404 = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      {/* Animated 404 */}
      <div className="relative mb-12">
        <div className="text-9xl font-black text-gray-900 mb-4 relative">
          <span className="relative z-10">4</span>
          <span className="relative z-10 animate-bounce inline-block mx-2">0</span>
          <span className="relative z-10">4</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-xl opacity-30 -z-10"></div>
        </div>
        
        {/* Palette decoration */}
        <div className="absolute -top-4 -right-4 w-20 h-20">
          <div className="w-full h-full relative">
            <div className="absolute top-0 left-0 w-8 h-8 bg-red-400 rounded-full"></div>
            <div className="absolute top-0 right-0 w-8 h-8 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-400 rounded-full"></div>
            <div className="absolute inset-0 m-auto w-10 h-10 bg-gray-800 rounded-full border-4 border-white"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Missing Masterpiece
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          The artwork you&apos;re looking for seems to have wandered off the canvas. 
          Perhaps it&apos;s on exhibition elsewhere, or maybe it&apos;s just shy.
        </p>

        {/* Illustration */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl rotate-45 relative">
              <div className="absolute inset-2 bg-white/50 rounded-lg"></div>
            </div>
            <div className="text-4xl animate-pulse">→</div>
            <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-200 rounded-2xl relative">
              <div className="absolute inset-2 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg"></div>
              <div className="absolute inset-3 bg-white/30 rounded-md"></div>
            </div>
            <div className="text-4xl animate-pulse animation-delay-1000">→</div>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl relative">
              <div className="absolute inset-2 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg"></div>
              <div className="absolute inset-3 bg-white/30 rounded-md"></div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">The trail goes cold here...</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/artworks"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore Artworks
          </Link>
          
          <Link
            href="/"
            className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all transform hover:scale-105"
          >
            Return Home
          </Link>
        </div>

        {/* Help Text */}
        <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
          <h3 className="font-semibold text-gray-900 mb-2">Need help finding something?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Try searching for similar artworks or browse by category
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/artworks?category=illustration" className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Illustration
            </Link>
            <Link href="/artworks?category=digital" className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              Digital Art
            </Link>
            <Link href="/artworks?category=painting" className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
              Painting
            </Link>
            <Link href="/artworks?category=abstract" className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              Abstract
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            Still lost?{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our gallery team
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Error404;