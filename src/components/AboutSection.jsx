"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaPalette, FaLightbulb, FaHeart } from 'react-icons/fa'

export default function AboutSection() {
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
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
              <Image 
                src="/artist-studio.jpg" 
                alt="Artist in Studio" 
                width={600} 
                height={500}
                className="object-cover w-full h-[500px] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-3xl font-bold">8+ Years</div>
                <div className="text-lg">of Artistic Excellence</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="text-2xl font-bold text-primary">300+</div>
                <div className="text-sm">Artworks</div>
              </div>
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="text-2xl font-bold text-secondary">150+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="text-2xl font-bold text-accent">25+</div>
                <div className="text-sm">Awards</div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
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
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
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

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-base-300">
              <p className="text-base-content/60 mb-4">Also check out:</p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/gallery" 
                  className="link link-primary hover:underline"
                >
                  View Full Gallery
                </Link>
                <Link 
                  href="/process" 
                  className="link link-primary hover:underline"
                >
                  See My Process
                </Link>
                <Link 
                  href="/testimonials" 
                  className="link link-primary hover:underline"
                >
                  Client Testimonials
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Banner */}
        <div className="mt-20 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-primary-content">
          <div className="text-center max-w-3xl mx-auto">
            <blockquote className="text-2xl italic mb-6">
              "Art is not what you see, but what you make others see."
            </blockquote>
            <div className="font-semibold">— My Artistic Philosophy</div>
          </div>
        </div>
      </div>
    </section>
  )
}