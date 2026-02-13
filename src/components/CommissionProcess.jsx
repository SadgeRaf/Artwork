"use client"

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { 
  FaComments, 
  FaSketch, 
  FaPaintBrush, 
  FaShippingFast, 
  FaCheckCircle,
  FaStar,
  FaClock,
  FaPalette,
  FaUser,
  FaHeart,
  FaArrowRight
} from 'react-icons/fa'
import { fadeInUp, staggerChildren, scaleIn } from '../lib/animations'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CommissionProcess() {
  const titleRef = useRef(null);
  const packagesRef = useRef(null);
  const stepsRef = useRef(null);
  const ctaRef = useRef(null);
  const [activeTab, setActiveTab] = useState('standard');
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with ScrollTrigger
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Package cards stagger
      if (packagesRef.current) {
        gsap.fromTo(packagesRef.current.children,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: packagesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
      
      // Process steps stagger
      if (stepsRef.current) {
        gsap.fromTo(stepsRef.current.children,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
      
      // CTA button animation
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });
    
    return () => ctx.revert();
  }, []);
  
  const commissionTypes = [
    {
      name: "Digital Portrait",
      price: "$50 - $100",
      description: "High-resolution digital portrait perfect for prints, social media, or digital displays",
      features: ["Single subject", "2 revisions", "Delivery in 1-2 weeks"],
      popular: false,
      icon: <FaUser className="text-2xl" />
    },
    {
      name: "Character Design",
      price: "$100 - $200",
      description: "Original character design for games, books, or personal projects",
      features: ["Front/back view", "Expression sheet", "Color palette", "Delivery in 2-3 weeks"],
      popular: true,
      icon: <FaPalette className="text-2xl" />
    },
    {
      name: "Custom Illustration",
      price: "$200 - $300",
      description: "Detailed scene illustration for book covers, album art, or special occasions",
      features: ["Complex scenes", "Multiple characters", "4 revisions", "Delivery in 3-5 weeks"],
      popular: false,
      icon: <FaHeart className="text-2xl" />
    }
  ]

  const processSteps = [
    {
      number: 1,
      icon: <FaComments />,
      title: "Initial Consultation",
      description: "We discuss your vision, preferences, and requirements. This includes size, style, color scheme, and any specific elements you want included.",
      duration: "1-2 days",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      icon: <FaSketch />,
      title: "Sketch & Approval",
      description: "I create initial sketches based on our discussion. You review and provide feedback until the composition is perfect.",
      duration: "3-5 days",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 3,
      icon: <FaPaintBrush />,
      title: "Art Creation",
      description: "I bring the approved sketch to life with colors, textures, and details. Regular progress updates are provided.",
      duration: "1-3 weeks",
      color: "from-green-500 to-emerald-500"
    },
    {
      number: 4,
      icon: <FaCheckCircle />,
      title: "Final Review",
      description: "You review the completed artwork. Minor adjustments can be made to ensure complete satisfaction.",
      duration: "2-3 days",
      color: "from-orange-500 to-red-500"
    },
    {
      number: 5,
      icon: <FaShippingFast />,
      title: "Delivery",
      description: "Digital files are delivered immediately. Physical artworks are carefully packaged and shipped worldwide.",
      duration: "1-2 weeks",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <FaStar className="text-sm" />
            <span className="text-sm font-semibold">COMMISSIONS OPEN</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              Commission Process
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            From concept to completion, I guide you through every step to create a personalized masterpiece
          </p>
        </div>

        {/* Pricing Section */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-center mb-4">Choose Your Package</h3>
          <p className="text-center text-base-content/60 mb-12 max-w-2xl mx-auto">
            All packages include commercial rights, high-resolution files, and personal support throughout the process
          </p>
          
          <div ref={packagesRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {commissionTypes.map((type, index) => (
              <div 
                key={index} 
                className={`group relative bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  type.popular ? 'lg:scale-105 border-2 border-primary' : ''
                }`}
              >
                {type.popular && (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="badge badge-primary gap-2 px-6 py-3 text-sm font-bold">
                        <FaStar />
                        MOST POPULAR
                      </div>
                    </div>
                  </>
                )}
                
                <div className="p-8">
                  {/* Package Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      {type.icon}
                    </div>
                    <div className="badge badge-outline badge-lg">
                      <FaClock className="mr-1" />
                      {type.features[3]}
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-2">{type.name}</h4>
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text my-4">
                    {type.price}
                  </div>
                  <p className="text-base-content/70 mb-6">{type.description}</p>
                  
                  <div className="divider"></div>
                  
                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {type.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="text-success">
                          <FaCheckCircle />
                        </div>
                        <span className="text-base-content/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Commission Button */}
                  <Link href="/commission" className="block">
                    <button className="btn w-full bg-gradient-to-r from-primary to-secondary text-white border-0 hover:opacity-90 transition-opacity">
                      Select Package
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-4">How It Works</h3>
          <p className="text-center text-base-content/60 mb-12 max-w-2xl mx-auto">
            A transparent, collaborative process designed to bring your vision to life
          </p>
          
          <div ref={stepsRef} className="relative max-w-5xl mx-auto">
            {/* Animated Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1">
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary/30 rounded-full"></div>
            </div>
            
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-start mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 ml-16 md:ml-0">
                    <div className="flex items-start gap-4">
                      {/* Mobile Timeline Circle */}
                      <div className="absolute left-0 top-6 md:hidden">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                          {step.number}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="hidden md:flex w-12 h-12 rounded-full bg-gradient-to-r ${step.color} items-center justify-center text-white font-bold">
                            {step.number}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold flex items-center gap-2">
                              {step.title}
                            </h4>
                            <div className="badge badge-primary badge-sm">
                              {step.duration}
                            </div>
                          </div>
                        </div>
                        <p className="text-base-content/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Dot (Desktop) */}
                <div className="absolute left-8 md:left-1/2 top-6 transform -translate-x-1/2 hidden md:block">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} border-4 border-base-100 flex items-center justify-center text-white shadow-xl`}>
                    <div className="text-sm">
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="stat bg-base-100 rounded-2xl shadow-lg">
            <div className="stat-figure text-primary">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FaClock />
              </div>
            </div>
            <div className="stat-title">Average Delivery</div>
            <div className="stat-value text-3xl text-primary">2 Weeks</div>
            <div className="stat-desc">From sketch to final</div>
          </div>
          
          <div className="stat bg-base-100 rounded-2xl shadow-lg">
            <div className="stat-figure text-secondary">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <FaCheckCircle />
              </div>
            </div>
            <div className="stat-title">Satisfaction Rate</div>
            <div className="stat-value text-3xl text-secondary">100%</div>
            <div className="stat-desc">From 50+ commissions</div>
          </div>
          
          <div className="stat bg-base-100 rounded-2xl shadow-lg">
            <div className="stat-figure text-accent">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <FaStar />
              </div>
            </div>
            <div className="stat-title">Client Rating</div>
            <div className="stat-value text-3xl text-accent">5.0</div>
            <div className="stat-desc">★★★★★ (25+ reviews)</div>
          </div>
        </div>

        {/* FAQ Section - Collapsible */}
        <div className="bg-base-100 rounded-2xl p-8 mb-12 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="collapse collapse-plus bg-base-200">
              <input type="checkbox" /> 
              <div className="collapse-title font-semibold">
                How do I start a commission?
              </div>
              <div className="collapse-content text-sm text-base-content/70"> 
                Simply click "Start Your Commission" and fill out the brief form. I'll get back to you within 24 hours to discuss your project.
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="checkbox" /> 
              <div className="collapse-title font-semibold">
                What payment methods do you accept?
              </div>
              <div className="collapse-content text-sm text-base-content/70"> 
                I accept PayPal, Stripe, and Bank transfers. A 50% deposit is required to secure your slot.
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="checkbox" /> 
              <div className="collapse-title font-semibold">
                Can I get commercial rights?
              </div>
              <div className="collapse-content text-sm text-base-content/70"> 
                Yes! Commercial licenses are available for an additional fee. This includes rights for merchandise, branding, and other commercial uses.
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="checkbox" /> 
              <div className="collapse-title font-semibold">
                Do you offer refunds?
              </div>
              <div className="collapse-content text-sm text-base-content/70"> 
                The deposit is non-refundable once work begins. However, I guarantee satisfaction with unlimited revisions during the sketch phase.
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="relative bg-gradient-to-r from-primary via-purple-600 to-secondary rounded-3xl p-12 text-center text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-4">Ready to Bring Your Vision to Life?</h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Limited slots available for this month. Secure your commission today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href='/commission'>
                <button className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0 px-12 animate-pulse hover:scale-105 transition-transform">
                  Start Your Commission
                </button>
              </Link>
              <Link href='/gallery'>
                <button className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white/10 hover:border-white">
                  View Portfolio
                </button>
              </Link>
            </div>
            <p className="mt-6 text-white/80 flex items-center justify-center gap-2">
              <FaCheckCircle className="text-green-300" />
              Free consultation included • 50+ happy clients
            </p>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}