"use client"

import React, { useEffect, useRef } from 'react'
import ArtworkCard from './cards/ArtworkCard'
import Link from 'next/link'
import { fadeInUp, scaleIn, staggerChildren } from '../lib/animations'

export default function FeaturedClient({ artworks }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!artworks?.length) return
    
    const timer = setTimeout(() => {
      // Animate title
      if (titleRef.current) fadeInUp(titleRef.current, 0.1)
      
      // Animate subtitle
      if (subtitleRef.current) fadeInUp(subtitleRef.current, 0.2)
      
      // Animate cards with stagger
      if (cardsContainerRef.current) {
        staggerChildren(cardsContainerRef.current, '.artwork-card', 0.3)
      }
      
      // Animate button
      if (buttonRef.current) scaleIn(buttonRef.current, 0.5)
    }, 100)

    return () => clearTimeout(timer)
  }, [artworks])

  if (!artworks?.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Featured Works Yet</h2>
          <p className="text-gray-600">Check back soon for new artwork!</p>
        </div>
      </div>
    )
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Works
            </span>
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
          </div>
          <p 
            ref={subtitleRef}
            className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto"
          >
            A selection of my favorite pieces — each one crafted with passion and attention to detail.
          </p>
        </div>

        {/* Artworks Grid */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {artworks.map((artwork) => (
            <div
              key={artwork._id}
              className="artwork-card transform transition-all duration-300 hover:scale-[1.02]"
            >
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div ref={buttonRef} className="text-center mt-12">
          <Link href="/gallery">
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
              <span className="relative z-10">View Full Gallery</span>
              <svg 
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}