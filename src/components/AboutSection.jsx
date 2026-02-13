"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaPalette, FaLightbulb, FaHeart } from 'react-icons/fa'
import { fadeInUp, fadeInLeft, fadeInRight, staggerChildren } from '../lib/animations'

export default function AboutSection() {
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef(null);
  
  useEffect(() => {
    if (imageRef.current) fadeInLeft(imageRef.current);
    if (contentRef.current) fadeInRight(contentRef.current, 0.2);
    if (featuresRef.current) staggerChildren(featuresRef.current, '.feature-item', 0.4);
  }, []);
  
  const features = [
    {
      icon: <FaPalette className="text-2xl" />,
      title: "Versatile Style",
      description: "Expertise in multiple art forms from digital to traditional"
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Creative Vision",
      description: "Transforming ideas into captivating visual stories"
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Passion-Driven",
      description: "Every piece created with dedication and emotional depth"
    }
  ]

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Image & Stats */}
          <div ref={imageRef} className="relative">
            {/* Main Image */}
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
              <Image 
                src="/pfp.png" 
                alt="Artist in Studio" 
                width={600} 
                height={500}
                className="object-cover w-full h-[500px] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-3xl font-bold">3+ Years</div>
                <div className="text-lg">of Artistic Excellence</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm">Artworks</div>
              </div>
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="text-2xl font-bold text-secondary">10+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="text-2xl font-bold text-accent">2+</div>
                <div className="text-sm">Awards</div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div ref={contentRef}>
            {/* Section Header */}
            <div className="mb-6">
              <span className="text-primary font-semibold">ABOUT THE ARTIST</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">
                Crafting Stories Through <span className="text-primary">Art</span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-4 mb-8 text-lg">
              <p>
                Welcome to my creative world! I'm a passionate artist dedicated to transforming 
                visions into breathtaking visual narratives. With years of experience across 
                multiple mediums, I specialize in creating art that resonates emotionally and 
                tells compelling stories.
              </p>
              <p>
                My journey began with a simple sketchbook and has evolved into a lifelong 
                pursuit of artistic excellence. I believe in the power of art to connect, 
                inspire, and evoke emotion in every viewer.
              </p>
            </div>

            {/* Features */}
            <div ref={featuresRef} className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 feature-item">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{feature.title}</h4>
                    <p className="text-base-content/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/about" 
                className="btn btn-primary btn-lg group"
              >
                <span>Learn More About Me</span>
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/commission" 
                className="btn btn-outline btn-primary btn-lg"
              >
                Start Your Commission
              </Link>
            </div>

           
          </div>
        </div>

        {/* Philosophy Banner */}
        <div className="mt-20 relative overflow-hidden">
  {/* Animated gradient background */}
  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl animate-gradient bg-[length:200%_200%]"></div>
  
  {/* Glassmorphism overlay */}
  <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] rounded-2xl"></div>
  
  {/* Content */}
  <div className="relative bg-gradient-to-r from-primary/90 to-secondary/90 rounded-2xl p-8 md:p-12 text-primary-content transform transition-all duration-700 hover:scale-[1.02] group">
    
    {/* Animated floating particles */}
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full animate-blob"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/5 rounded-full animate-blob animation-delay-4000"></div>
    </div>
    
    {/* Quote container with staggered animation */}
    <div className="text-center max-w-3xl mx-auto relative z-10">
      {/* Opening quote mark */}
      <div className="text-6xl text-white/30 font-serif absolute -top-4 -left-4 animate-pulse">"</div>
      
      {/* Quote with typing effect */}
      <div className="relative">
        <blockquote className="text-2xl md:text-3xl lg:text-4xl italic font-light leading-relaxed animate-fadeInQuote">
          "Art is not what you see, but what you make others see."
        </blockquote>
        
        {/* Decorative line */}
        <div className="w-24 h-1 bg-white/50 mx-auto my-6 rounded-full animate-expandWidth"></div>
        
        {/* Attribution with fade and slide */}
        <div className="space-y-2">
          <div className="font-semibold text-lg md:text-xl tracking-wide animate-slideUp">
            — My Artistic Philosophy
          </div>
          
          {/* Subtle signature effect */}
          <div className="text-white/60 text-sm font-mono animate-fadeIn delay-500">
            Rafs Artworks
          </div>
        </div>
      </div>
      
      {/* Closing quote mark */}
      <div className="text-6xl text-white/30 font-serif absolute -bottom-4 -right-4 animate-pulse">"</div>
    </div>
  </div>

  <style jsx>{`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .animate-gradient {
      animation: gradient 8s ease infinite;
    }
    
    @keyframes blob {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -30px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
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
    
    @keyframes fadeInQuote {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fadeInQuote {
      animation: fadeInQuote 1.2s ease-out;
    }
    
    @keyframes expandWidth {
      0% { width: 0; opacity: 0; }
      100% { width: 96px; opacity: 1; }
    }
    
    .animate-expandWidth {
      animation: expandWidth 0.8s ease-out 0.3s both;
    }
    
    @keyframes slideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .animate-slideUp {
      animation: slideUp 0.6s ease-out 0.6s both;
    }
    
    .animate-fadeIn {
      animation: fadeInQuote 0.8s ease-out 0.9s both;
    }
    
    .delay-500 {
      animation-delay: 0.9s;
    }
  `}</style>
</div>
      </div>
    </section>
  )
}