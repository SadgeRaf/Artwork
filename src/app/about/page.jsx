"use client"

import { useEffect, useRef } from 'react';
import { fadeInUp, scaleIn } from '../../lib/animations';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaTwitter, FaArtstation } from 'react-icons/fa'

export default function About() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const philosophyRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroRef.current) fadeInUp(heroRef.current, 0.1);
      if (storyRef.current) fadeInUp(storyRef.current, 0.2);
      if (philosophyRef.current) fadeInUp(philosophyRef.current, 0.3);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Simple Hero */}
      <section 
        ref={heroRef} 
        className="hero min-h-[50vh] bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white"
      >
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              About Me
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Digital artist & illustrator
            </p>
          </div>
        </div>
      </section>

      {/* Artist Introduction - Clean & Simple */}
      <section ref={storyRef} className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">My Story</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-600 space-y-6">
            <p>
              Hello! I'm an artist passionate about creating digital illustrations and character art. 
              I've been drawing since I could hold a pencil, and turned my passion into a profession 
              through years of practice and dedication.
            </p>
            <p>
              My style blends anime aesthetics with Western illustration techniques, creating pieces 
              that are both expressive and detailed. I specialize in character design, portraits, 
              and custom illustrations.
            </p>
            <p>
              Every commission is a collaboration—I work closely with clients to bring their 
              visions to life, whether it's a character for their story, a gift for someone special, 
              or a personal artwork.
            </p>
          </div>
        </div>
      </section>

      {/* Simple Philosophy Cards */}
      <section ref={philosophyRef} className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-600">How I Work</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-600">Passion First</h3>
              <p className="text-gray-600 leading-relaxed">
                I only take projects I'm genuinely excited about. This ensures the best results for both of us.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-600">Clear Communication</h3>
              <p className="text-gray-600 leading-relaxed">
                Regular updates and honest feedback. No surprises, just transparency throughout the process.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-600">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Multiple revisions included until you're completely satisfied with the result.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Connect Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Have an idea in mind? I'd love to hear about it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/commission" className="btn btn-primary btn-lg px-12">
              Start a Commission
            </Link>
            <Link href="/gallery" className="btn btn-outline btn-lg px-12">
              View Gallery
            </Link>
          </div>

          {/* Simple Social Links */}
          <div className="mt-16 pt-8 border-t">
            <p className="text-gray-500 mb-6">Find me on</p>
            <div className="flex justify-center gap-6">
              <a href="https://instagram.com" className="text-gray-600 hover:text-pink-600 transition-colors">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://twitter.com" className="text-gray-600 hover:text-blue-500 transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="https://artstation.com" className="text-gray-600 hover:text-purple-600 transition-colors">
                <FaArtstation className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}