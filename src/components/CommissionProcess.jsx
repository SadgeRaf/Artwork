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
  FaArrowRight,
  FaCrown,
  FaHandSparkles, // Changed from FaSparkles
  FaGem,
  FaMagic,
  FaRocket,
  FaInfinity
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
  const floatingIconsRef = useRef([]);
  const statsRef = useRef(null);
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
      
      // Floating icons animation
      floatingIconsRef.current.forEach((icon, index) => {
        if (icon) {
          gsap.to(icon, {
            y: -20,
            rotation: index % 2 === 0 ? 10 : -10,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });
      
      // Package cards stagger with enhanced animation
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
      
      // Process steps stagger with pulse effect
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
      
      // Stats cards animation
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
      
      // CTA button animation with pulse
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
        
        // Continuous pulse on CTA
        gsap.to(ctaRef.current.querySelector('button'), {
          scale: 1.05,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
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
      icon: <FaUser className="text-2xl" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Character Design",
      price: "$100 - $200",
      description: "Original character design for games, books, or personal projects",
      features: ["Front/back view", "Expression sheet", "Color palette", "Delivery in 2-3 weeks"],
      popular: true,
      icon: <FaPalette className="text-2xl" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Custom Illustration",
      price: "$200 - $300",
      description: "Detailed scene illustration for book covers, album art, or special occasions",
      features: ["Complex scenes", "Multiple characters", "4 revisions", "Delivery in 3-5 weeks"],
      popular: false,
      icon: <FaHeart className="text-2xl" />,
      gradient: "from-orange-500 to-red-500"
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
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        <div ref={el => floatingIconsRef.current[0] = el} className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div ref={el => floatingIconsRef.current[1] = el} className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header with animated badge */}
        <div ref={titleRef} className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-pulse">
            <FaHandSparkles className="text-sm animate-spin-slow" />
            <span className="text-sm font-semibold">COMMISSIONS OPEN</span>
            <FaMagic className="text-sm animate-bounce" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent animate-gradient">
              Commission Process
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 animate-width"></div>
          
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto animate-fade-in">
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
                className={`group relative bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  type.popular ? 'lg:scale-105' : ''
                }`}
              >
                {type.popular ? (
                  <>
                    {/* Animated border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur opacity-75 group-hover:opacity-100 animate-gradient-xy"></div>
                    
                    {/* Floating crown */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                      <div className="badge badge-primary gap-2 px-6 py-3 text-sm font-bold shadow-lg">
                        <FaCrown className="animate-pulse" />
                        MOST POPULAR
                        <FaStar className="animate-spin-slow" />
                      </div>
                    </div>
                    
                    {/* Floating orbs around popular card */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full filter blur-xl animate-ping"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary/20 rounded-full filter blur-xl animate-ping animation-delay-1000"></div>
                  </>
                ) : (
                  // Non-popular cards also get subtle animation
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-base-300 to-transparent rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                )}
                
                <div className={`relative p-8 rounded-2xl bg-base-100 ${type.popular ? 'bg-opacity-100' : ''}`}>
                  {/* Animated icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.gradient} bg-opacity-10 flex items-center justify-center text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-300 animate-float`}>
                      <div className="absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-10 rounded-2xl animate-pulse"></div>
                      <span className="relative z-10 text-2xl text-primary">
                        {type.icon}
                      </span>
                    </div>
                    
                    {/* Animated delivery badge */}
                    <div className="badge badge-outline badge-lg animate-pulse">
                      <FaClock className="mr-1 animate-spin-slow" />
                      {type.features[3] || "Flexible"}
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-2">{type.name}</h4>
                  
                  {/* Animated price */}
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text my-4 animate-gradient-x">
                    {type.price}
                  </div>
                  
                  <p className="text-base-content/70 mb-6">{type.description}</p>
                  
                  <div className="divider"></div>
                  
                  {/* Features with staggered animation */}
                  <ul className="space-y-4 mb-8">
                    {type.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 group/item">
                        <div className="text-success animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                          <FaCheckCircle className="group-hover/item:scale-110 transition-transform" />
                        </div>
                        <span className="text-base-content/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Animated button */}
                  <Link href="/commission" className="block">
                    <button className={`btn w-full bg-gradient-to-r ${type.gradient} text-white border-0 hover:opacity-90 transition-all group/btn relative overflow-hidden`}>
                      <span className="relative z-10 flex items-center justify-center">
                        Select Package
                        <FaArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-transform group-hover/btn:animate-pulse" />
                      </span>
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left opacity-20"></div>
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
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary/30 rounded-full animate-gradient-y"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary/30 rounded-full animate-ping opacity-20"></div>
            </div>
            
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-start mb-12 group/step ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 ml-16 md:ml-0 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      {/* Mobile Timeline Circle */}
                      <div className="absolute left-0 top-6 md:hidden">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                          {step.number}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`hidden md:flex w-12 h-12 rounded-full bg-gradient-to-r ${step.color} items-center justify-center text-white font-bold group-hover:scale-110 transition-transform animate-float`}>
                            {step.number}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold flex items-center gap-2">
                              {step.title}
                              <FaRocket className="text-primary opacity-0 group-hover:opacity-100 transition-opacity animate-bounce" />
                            </h4>
                            <div className="badge badge-primary badge-sm animate-pulse">
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
                    <div className="text-sm animate-spin-slow">
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Cards with animations */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="stat bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group/stat">
            <div className="stat-figure text-primary">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/stat:scale-110 transition-transform">
                <FaClock className="animate-bounce" />
              </div>
            </div>
            <div className="stat-title">Average Delivery</div>
            <div className="stat-value text-3xl text-primary ">2 Weeks</div>
            <div className="stat-desc">From sketch to final</div>
          </div>
          
          <div className="stat bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group/stat">
            <div className="stat-figure text-secondary">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover/stat:scale-110 transition-transform">
                <FaCheckCircle className="animate-bounce" />
              </div>
            </div>
            <div className="stat-title">Satisfaction Rate</div>
            <div className="stat-value text-3xl text-secondary ">100%</div>
            <div className="stat-desc">From 50+ commissions</div>
          </div>
          
          <div className="stat bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group/stat">
            <div className="stat-figure text-accent">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover/stat:scale-110 transition-transform">
                <FaStar className="animate-bounce" />
              </div>
            </div>
            <div className="stat-title">Client Rating</div>
            <div className="stat-value text-3xl text-accent">5.0</div>
            <div className="stat-desc">★★★★★ (25+ reviews)</div>
          </div>
        </div>

        {/* FAQ Section with animated collapses */}
        <div className="bg-base-100 rounded-2xl p-8 mb-12 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map((item) => (
              <div key={item} className="collapse collapse-plus bg-base-200 hover:bg-base-300 transition-colors group/faq">
                <input type="checkbox" /> 
                <div className="collapse-title font-semibold group-hover/faq:translate-x-2 transition-transform">
                  Question {item}
                </div>
                <div className="collapse-content text-sm text-base-content/70"> 
                  Answer text here...
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section with multiple animations */}
        <div ref={ctaRef} className="relative bg-gradient-to-r from-primary via-purple-600 to-secondary rounded-3xl p-12 text-center text-white overflow-hidden group/cta">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse animation-delay-1000"></div>
          
          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none">
            <FaStar className="absolute top-10 left-10 text-white/20 animate-spin-slow" />
            <FaGem className="absolute bottom-10 right-10 text-white/20 animate-bounce" />
            <FaInfinity className="absolute top-1/2 left-20 text-white/10 animate-pulse" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-4">Ready to Bring Your Vision to Life?</h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto animate-float">
              Limited slots available for this month. Secure your commission today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href='/commission'>
                <button className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0 px-12 hover:scale-105 transition-transform animate-pulse">
                  Start Your Commission
                  <FaRocket className="ml-2 animate-bounce" />
                </button>
              </Link>
              <Link href='/gallery'>
                <button className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white/10 hover:border-white group/btn">
                  View Portfolio
                  <FaArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
            <p className="mt-6 text-white/80 flex items-center justify-center gap-2">
              <FaCheckCircle className="text-green-300 animate-spin-slow" />
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}