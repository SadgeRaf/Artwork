"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Book Author",
      image: "/client-1.jpg",
      rating: 5,
      comment: "Absolutely stunning work! The custom book cover exceeded all expectations. Alex captured the essence of my story perfectly.",
      project: "Fantasy Book Cover",
      date: "March 2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Game Developer",
      image: "/client-2.jpg",
      rating: 5,
      comment: "The character designs brought our game world to life. Professional, creative, and delivered ahead of schedule!",
      project: "Game Character Series",
      date: "January 2024"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Gallery Owner",
      image: "/client-3.jpg",
      rating: 5,
      comment: "Commissioned a series of three paintings for our gallery opening. Each piece was more beautiful than the last.",
      project: "Gallery Exhibition Series",
      date: "December 2023"
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Wedding Photographer",
      image: "/client-4.jpg",
      rating: 5,
      comment: "The wedding portrait was the perfect gift for my clients. The emotional depth captured was incredible.",
      project: "Wedding Portrait",
      date: "November 2023"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Interior Designer",
      image: "/client-5.jpg",
      rating: 5,
      comment: "Working with Alex transformed our luxury apartment project. The custom art became the centerpiece of every room.",
      project: "Interior Design Collection",
      date: "October 2023"
    },
    {
      id: 6,
      name: "Robert Kim",
      role: "Music Producer",
      image: "/client-6.jpg",
      rating: 5,
      comment: "The album artwork perfectly captured the mood of our music. It's been getting as much praise as the music itself!",
      project: "Album Cover Art",
      date: "September 2023"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.project.toLowerCase().includes(activeFilter))

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    )
  }

  const projectTypes = [
    { key: 'all', label: 'All Projects' },
    { key: 'book', label: 'Book Covers' },
    { key: 'character', label: 'Character Design' },
    { key: 'portrait', label: 'Portraits' },
    { key: 'album', label: 'Album Art' }
  ]

  const renderStars = (rating, number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? "text-yellow-400" : "text-gray-300"} 
      />
    ))
  }

  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-lg">CLIENT LOVE</span>
          <h2 className="text-5xl font-bold mt-2 mb-4">What Clients Say</h2>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from artists, collectors, and clients who've experienced our work firsthand.
          </p>
        </div>

        {/* Project Type Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projectTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => {
                setActiveFilter(type.key)
                setCurrentIndex(0)
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeFilter === type.key 
                  ? 'bg-primary text-primary-content shadow-lg' 
                  : 'bg-base-300 hover:bg-base-300/80'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-lg font-semibold">Client Satisfaction</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl font-bold text-secondary">150+</div>
              <div className="text-lg font-semibold">Happy Clients</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl font-bold text-accent">5.0</div>
              <div className="text-lg font-semibold">Average Rating</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl font-bold text-info">24/7</div>
              <div className="text-lg font-semibold">Support Available</div>
            </div>
          </div>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative mb-16">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 btn btn-circle btn-primary shadow-lg"
          >
            <FaArrowLeft />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 btn btn-circle btn-primary shadow-lg"
          >
            <FaArrowRight />
          </button>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredTestimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  index === 1 ? 'md:scale-105 z-10' : ''
                }`}
              >
                <div className="card-body">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-primary/20">
                    <FaQuoteLeft className="text-6xl" />
                  </div>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg italic mb-6">
                    "{testimonial.comment}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="avatar">
                      <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-base-content/70">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="mt-6 pt-6 border-t border-base-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold">Project:</span>
                        <span className="ml-2 text-primary">{testimonial.project}</span>
                      </div>
                      <div className="badge badge-outline">{testimonial.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 gap-2">
            {[...Array(Math.ceil(filteredTestimonials.length / 3))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex >= index * 3 && currentIndex < (index + 1) * 3
                    ? 'bg-primary w-8'
                    : 'bg-base-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Before & After Gallery */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Transformation Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card bg-base-100 shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image 
                    src={`/project-${item}-before.jpg`}
                    alt={`Project ${item} Before`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold">Before</span>
                  </div>
                </div>
                <div className="relative h-48">
                  <Image 
                    src={`/project-${item}-after.jpg`}
                    alt={`Project ${item} After`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
                    <span className="text-white font-bold">After</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-primary-content">
            <h3 className="text-3xl font-bold mb-6">Ready to Experience Art That Speaks?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who've transformed their visions into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-accent btn-lg px-8">
                Start Your Commission
              </button>
              <button className="btn btn-outline btn-accent btn-lg px-8">
                View More Testimonials
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}