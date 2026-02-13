"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArtworkDetailSkeleton from '../../../components/skeleton/artworkDetailSkeleton';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '../../../lib/animations';

// Enhanced error handling component
const ArtworkError = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
      <p className="text-gray-600 mb-6">{message}</p>
      <Link
        href="/gallery"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Browse All Artworks
      </Link>
    </div>
  </div>
);

const Page = ({ params }) => {
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const descRef = useRef(null);
  const tagsRef = useRef(null);
  
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArtwork = async () => {
      const { id } = await params;
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/artwork/${id}`, {
          cache: 'no-store',
        });
        
        if (res.ok) {
          const data = await res.json();
          setArtwork(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtwork();
  }, [params]);
  
  useEffect(() => {
    if (!loading && artwork) {
      if (imageRef.current) fadeInLeft(imageRef.current);
      if (detailsRef.current) fadeInRight(detailsRef.current, 0.2);
      if (descRef.current) scaleIn(descRef.current, 0.4);
      if (tagsRef.current) fadeInUp(tagsRef.current, 0.6);
    }
  }, [loading, artwork]);
  
  if (loading) {
    return <ArtworkDetailSkeleton />;
  }

  // If no artwork found
  if (!artwork) {
    return <ArtworkError message="Artwork not found" />;
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/gallery" className="hover:text-blue-600 transition-colors">
                  Gallery
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="font-medium text-gray-900 truncate">{artwork.title || 'Untitled Artwork'}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Artwork Image */}
            <div ref={imageRef} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group">
                <div className="relative aspect-square">
                  <Image
                    src={artwork.image || '/placeholder-image.jpg'}
                    alt={artwork.title || 'Artwork Image'}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Additional Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Artwork Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID:</span>
                    <span className="font-mono text-sm text-gray-900">{artwork._id?.slice(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Slug:</span>
                    <span className="text-gray-900">{artwork.slug}</span>
                  </div>
                  {artwork.artist && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Artist:</span>
                      <span className="text-gray-900">{artwork.artist}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Artwork Details */}
            <div ref={detailsRef} className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {artwork.title || 'Untitled Artwork'}
                </h1>

                {/* Category Badge */}
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {artwork.category || 'Uncategorized'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div ref={descRef} className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Artwork</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="leading-relaxed">
                    {artwork.description || 'No description available for this artwork.'}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div ref={tagsRef} className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {artwork.tags && artwork.tags.length > 0 ? (
                    artwork.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/gallery?query=${tag}`}
                        className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium hover:from-gray-200 hover:to-gray-300 transition-all hover:text-gray-900"
                      >
                        #{tag}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500">No tags available</p>
                  )}
                </div>
              </div>

              {/* Additional Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {artwork.createdAt && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-semibold text-gray-500 mb-2">Created</h3>
                    <p className="text-lg text-gray-900">
                      {new Date(artwork.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                {artwork.updatedAt && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-semibold text-gray-500 mb-2">Last Updated</h3>
                    <p className="text-lg text-gray-900">
                      {new Date(artwork.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Social Sharing / Actions */}
              <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-semibold mb-4">Share This Artwork</h3>
                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                    Share on Twitter
                  </button>
                  <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium transition-colors">
                    Share on Instagram
                  </button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Gallery Button */}
          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-white text-gray-700 hover:text-gray-900 hover:shadow-lg px-6 py-3 rounded-lg font-medium transition-all border border-gray-200 hover:border-gray-300"
            >
              <span>←</span>
              Back to Gallery
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Page;
