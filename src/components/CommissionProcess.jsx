"use client"

import Link from 'next/link'
import React from 'react'
import { FaComments, FaSketch, FaPaintBrush, FaShippingFast, FaCheckCircle } from 'react-icons/fa'

export default function CommissionProcess() {
  const commissionTypes = [
    {
      name: "Digital Portrait",
      price: "$150 - $300",
      description: "High-resolution digital portrait perfect for prints, social media, or digital displays",
      features: ["Single subject", "Background included", "2 revisions", "Delivery in 1-2 weeks"],
      popular: true
    },
    {
      name: "Character Design",
      price: "$200 - $500",
      description: "Original character design for games, books, or personal projects",
      features: ["Front/back view", "Expression sheet", "Color palette", "Delivery in 2-3 weeks"],
      popular: false
    },
    {
      name: "Custom Illustration",
      price: "$250 - $600",
      description: "Detailed scene illustration for book covers, album art, or special occasions",
      features: ["Complex scenes", "Multiple characters", "4 revisions", "Delivery in 3-5 weeks"],
      popular: false
    }
  ]

  const processSteps = [
    {
      number: 1,
      icon: <FaComments className="text-3xl" />,
      title: "Initial Consultation",
      description: "We discuss your vision, preferences, and requirements. This includes size, style, color scheme, and any specific elements you want included.",
      duration: "1-2 days"
    },
    {
      number: 2,
      icon: <FaSketch className="text-3xl" />,
      title: "Sketch & Approval",
      description: "I create initial sketches based on our discussion. You review and provide feedback until the composition is perfect.",
      duration: "3-5 days"
    },
    {
      number: 3,
      icon: <FaPaintBrush className="text-3xl" />,
      title: "Art Creation",
      description: "I bring the approved sketch to life with colors, textures, and details. Regular progress updates are provided.",
      duration: "1-3 weeks"
    },
    {
      number: 4,
      icon: <FaCheckCircle className="text-3xl" />,
      title: "Final Review",
      description: "You review the completed artwork. Minor adjustments can be made to ensure complete satisfaction.",
      duration: "2-3 days"
    },
    {
      number: 5,
      icon: <FaShippingFast className="text-3xl" />,
      title: "Delivery",
      description: "Digital files are delivered immediately. Physical artworks are carefully packaged and shipped worldwide.",
      duration: "1-2 weeks"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-primary">Commission Process</h2>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            From concept to completion, I guide you through every step to create a personalized masterpiece
          </p>
        </div>

        {/* Pricing Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Commission Packages</h3>
          <div className="grid grid-cols-1 md:flex md:justify-around gap-8">
            {commissionTypes.map((type, index) => (
              <div 
                key={index} 
                className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  type.popular ? 'border-2 border-primary relative' : ''
                }`}
              >
                {type.popular && (
                  <div className="badge badge-primary absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-2">
                    Most Popular
                  </div>
                )}
                <div className="card-body">
                  <h4 className="card-title text-2xl">{type.name}</h4>
                  <div className="text-3xl font-bold text-primary my-4">{type.price}</div>
                  <p className="text-base-content/70 mb-6">{type.description}</p>
                  <div className="divider"></div>
                  <ul className="space-y-3 mb-6">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FaCheckCircle className="text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-actions justify-center">
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform md:-translate-x-1/2"></div>
            
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Step Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold">
                          {step.number}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">{step.title}</h4>
                          <div className="badge badge-outline">{step.duration}</div>
                        </div>
                      </div>
                      <p className="text-base-content/70">{step.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Circle */}
                <div className="relative z-10 my-4 md:my-0">
                  <div className="w-10 h-10 rounded-full bg-primary border-4 border-base-100 flex items-center justify-center">
                    <div className="text-primary-content">
                      {step.icon}
                    </div>
                  </div>
                </div>
                
                {/* Empty spacer for alignment */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Pricing Info */}
        <div className="bg-base-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50%</div>
              <p className="font-semibold">Deposit Required</p>
              <p className="text-sm text-base-content/70">Non-refundable deposit to begin work</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <p className="font-semibold">Revisions Included</p>
              <p className="text-sm text-base-content/70">Additional revisions at $25 each</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1 Year</div>
              <p className="font-semibold">Commercial License</p>
              <p className="text-sm text-base-content/70">Add $100 for commercial use</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href='/commission'><button className="btn btn-primary btn-lg px-12 animate-pulse">
            Start Your Commission Today
          </button></Link>
          <p className="mt-4 text-base-content/60">
            Limited slots available • Free consultation included
          </p>
        </div>

      </div>
    </section>
  )
}