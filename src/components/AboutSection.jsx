"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaArrowRight, 
  FaPalette, 
  FaLightbulb, 
  FaHeart,
  FaBrush,
  FaPaintRoller,
  FaUserAstronaut,
  FaHandSparkles,
  FaStar,
  FaRegGem,
  FaInfinity,
  FaRocket
} from 'react-icons/fa'
import { fadeInUp, fadeInLeft, fadeInRight, staggerChildren } from '../lib/animations'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const floatingIconsRef = useRef([]);
  const philosophyRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main animations
      if (imageRef.current) fadeInLeft(imageRef.current);
      if (contentRef.current) fadeInRight(contentRef.current, 0.2);
      if (featuresRef.current) staggerChildren(featuresRef.current, '.feature-item', 0.4);
      
      // Stats cards animation
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { y: 50, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
      
      // Floating icons animation
      floatingIconsRef.current.forEach((icon, index) => {
        if (icon) {
          gsap.to(icon, {
            y: -20,
            x: index % 2 === 0 ? 10 : -10,
            rotation: index % 2 === 0 ? 10 : -10,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });
      
      // Philosophy section animation
      if (philosophyRef.current) {
        gsap.fromTo(philosophyRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });
    
    return () => ctx.revert();
  }, []);
  
  const features = [
    {
      icon: <FaPalette className="text-2xl" />,
      title: "Versatile Style",
      description: "Expertise in multiple art forms from digital to traditional",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Creative Vision",
      description: "Transforming ideas into captivating visual stories",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Passion-Driven",
      description: "Every piece created with dedication and emotional depth",
      color: "from-red-500 to-orange-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden relative">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={el => floatingIconsRef.current[i] = el}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${3 + Math.random() * 5}s infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Image & Stats */}
          <div ref={imageRef} className="relative">
            {/* Floating decorative icons */}
            <div className="absolute -top-10 -right-10 text-4xl text-primary/20 animate-float">
              <FaBrush />
            </div>
            <div className="absolute -bottom-10 -left-10 text-4xl text-secondary/20 animate-float animation-delay-1000">
              <FaPaintRoller />
            </div>
            
            {/* Main Image */}
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl group/image">
              <Image 
                src="/pfp.png" 
                alt="Artist in Studio" 
                width={600} 
                height={500}
                className="object-cover w-full h-[500px] transition-transform duration-700 group-hover/image:scale-110"
              />
              
              {/* Animated overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover/image:border-primary/50 rounded-2xl transition-all duration-500"></div>
              
              {/* Overlay Text with animation */}
              <div className="absolute bottom-8 left-8 text-white transform translate-y-0 group-hover/image:-translate-y-2 transition-transform duration-500">
                <div className="text-3xl font-bold animate-pulse">3+ Years</div>
                <div className="text-lg">of Artistic Excellence</div>
              </div>
              
              {/* Sparkle effects on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                <FaHandSparkles className="text-2xl text-yellow-300 animate-spin-slow" />
              </div>
            </div>

            {/* Decorative Elements with animations */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl -z-10 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full -z-10 animate-blob"></div>

            {/* Quick Stats with hover effects */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-gradient-to-br from-base-200 to-base-300 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group/stat">
                <div className="text-2xl font-bold text-primary group-hover/stat:scale-110 transition-transform">50+</div>
                <div className="text-sm">Artworks</div>
                <div className="mt-2 opacity-0 group-hover/stat:opacity-100 transition-opacity">
                  <FaStar className="text-xs text-yellow-500 inline animate-spin-slow" />
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-base-200 to-base-300 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group/stat">
                <div className="text-2xl font-bold text-secondary group-hover/stat:scale-110 transition-transform">10+</div>
                <div className="text-sm">Happy Clients</div>
                <div className="mt-2 opacity-0 group-hover/stat:opacity-100 transition-opacity">
                  <FaHeart className="text-xs text-red-400 inline animate-pulse" />
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-base-200 to-base-300 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group/stat">
                <div className="text-2xl font-bold text-accent group-hover/stat:scale-110 transition-transform">2+</div>
                <div className="text-sm">Awards</div>
                <div className="mt-2 opacity-0 group-hover/stat:opacity-100 transition-opacity">
                  <FaRegGem className="text-xs text-purple-400 inline animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div ref={contentRef}>
            {/* Section Header with animations */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-semibold tracking-wider">✦ ABOUT THE ARTIST ✦</span>
                <FaUserAstronaut className="text-primary animate-float" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mt-2 relative">
                Crafting Stories Through{' '}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent animate-gradient">
                  Art
                </span>
                
                {/* Animated underline */}
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 animate-expandWidth"></div>
              </h2>
            </div>

            {/* Description with fade in */}
            <div className="space-y-4 mb-8 text-lg">
              <p className="animate-fadeInUp">
                Welcome to my creative world! I'm a passionate artist dedicated to transforming 
                visions into breathtaking visual narratives. With years of experience across 
                multiple mediums, I specialize in creating art that resonates emotionally and 
                tells compelling stories.
              </p>
              <p className="animate-fadeInUp animation-delay-200">
                My journey began with a simple sketchbook and has evolved into a lifelong 
                pursuit of artistic excellence. I believe in the power of art to connect, 
                inspire, and evoke emotion in every viewer.
              </p>
            </div>

            {/* Features with staggered animation and hover effects */}
            <div ref={featuresRef} className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 feature-item group/feature hover:translate-x-2 transition-transform duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-10 flex items-center justify-center text-primary group-hover/feature:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent transform -translate-x-full group-hover/feature:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10 group-hover/feature:animate-spin-slow">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg group-hover/feature:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-base-content/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons with hover animations */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/about" 
                className="btn btn-primary btn-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Learn More About Me
                  <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform group-hover:animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-20"></div>
              </Link>
              
              <Link 
                href="/commission" 
                className="btn btn-outline btn-primary btn-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Your Commission
                  <FaRocket className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Philosophy Banner */}
        <div ref={philosophyRef} className="mt-20 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl animate-gradient bg-[length:200%_200%]"></div>
          
          {/* Glassmorphism overlay with pulse */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] rounded-2xl animate-pulse"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${3 + i}s infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
          
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
              <div className="text-6xl text-white/30 font-serif absolute -top-4 -left-4 animate-bounce">"</div>
              
              {/* Quote with animation */}
              <div className="relative">
                <blockquote className="text-2xl md:text-3xl lg:text-4xl italic font-light leading-relaxed animate-fadeInQuote group-hover:scale-105 transition-transform duration-500">
                  "Art is not what you see, but what you make others see."
                </blockquote>
                
                {/* Decorative line */}
                <div className="w-24 h-1 bg-white/50 mx-auto my-6 rounded-full animate-expandWidth"></div>
                
                {/* Attribution with fade and slide */}
                <div className="space-y-2">
                  <div className="font-semibold text-lg md:text-xl tracking-wide animate-slideUp flex items-center justify-center gap-2">
                    — My Artistic Philosophy
                    <FaInfinity className="text-white/50 animate-spin-slow" />
                  </div>
                  
                  {/* Subtle signature effect */}
                  <div className="text-white/60 text-sm font-mono animate-fadeIn delay-500">
                    Rafs Artworks
                  </div>
                </div>
              </div>
              
              {/* Closing quote mark */}
              <div className="text-6xl text-white/30 font-serif absolute -bottom-4 -right-4 animate-bounce animation-delay-1000">"</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to { width: 96px; opacity: 1; }
        }
        
        @keyframes fadeInQuote {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-expandWidth {
          animation: expandWidth 0.8s ease-out 0.3s both;
        }
        
        .animate-fadeInQuote {
          animation: fadeInQuote 1.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out 0.6s both;
        }
        
        .animate-fadeIn {
          animation: fadeInUp 0.8s ease-out 0.9s both;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
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