"use client"

import React, { useEffect, useRef } from 'react'
import NextJsCarousel from './NextJsCarousel'
import Link from 'next/link'
import { testFont } from '../lib/fonts'
import { fadeInUp, scaleIn } from '../lib/animations'

export default function Banner() {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    if (contentRef.current) fadeInUp(contentRef.current, 0.3);
    if (buttonRef.current) scaleIn(buttonRef.current, 0.6);
  }, []);
  
  return (
    <div className="hero min-h-screen">
      <NextJsCarousel />
      
      <div className="hero-overlay bg-black/30"></div>
      <div className="hero-content text-neutral-content text-center">
        <div ref={contentRef} className="max-w-md">
          <h1 className={`${testFont.className} mb-5 text-5xl font-bold text-white drop-shadow-lg`}>
            Rafs Artworks
          </h1>
          <p className="mb-5 text-lg text-white/90 drop-shadow-md">
            Digital artist specializing in portraits, anime, and character design. 
            Every stroke tells a story.
          </p>
          <div ref={buttonRef}>
            <Link href='/gallery'>
              <button className="btn btn-primary btn-lg px-8">
                View Gallery
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}