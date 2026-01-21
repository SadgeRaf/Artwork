import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaPalette, FaAward, FaHeart, FaInstagram, FaTwitter, FaArtstation } from 'react-icons/fa'

export default function About() {
  const artistBio = [
    {
      year: "2015",
      title: "Artistic Journey Begins",
      description: "Started formal art training and discovered my passion for digital illustration."
    },
    {
      year: "2017",
      title: "First Commission",
      description: "Completed my first professional commission - a portrait that sparked my freelance career."
    },
    {
      year: "2019",
      title: "Art School Graduation",
      description: "Graduated with honors in Fine Arts, specializing in digital media and traditional painting."
    },
    {
      year: "2021",
      title: "Full-time Artist",
      description: "Transitioned to being a full-time independent artist, building my online presence."
    },
    {
      year: "2023",
      title: "International Recognition",
      description: "Featured in Digital Arts Magazine and exhibited in three international galleries."
    }
  ]

  const skills = [
    { name: "Digital Painting", level: 95, color: "bg-primary" },
    { name: "Traditional Oil", level: 85, color: "bg-secondary" },
    { name: "Character Design", level: 90, color: "bg-accent" },
    { name: "Concept Art", level: 88, color: "bg-info" },
    { name: "Watercolor", level: 75, color: "bg-success" },
    { name: "3D Modeling", level: 70, color: "bg-warning" }
  ]

  const achievements = [
    { icon: <FaAward />, count: "25+", label: "Awards Won" },
    { icon: <FaPalette />, count: "300+", label: "Commissions" },
    { icon: <FaHeart />, count: "150+", label: "Happy Clients" },
    { icon: <FaPalette />, count: "500+", label: "Artworks Created" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-[60vh] bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">About the Artist</h1>
            <p className="text-xl md:text-2xl mb-8">
              Passionate creator transforming visions into timeless art pieces
            </p>
            <div className="flex gap-4 justify-center">
              <button className="btn btn-accent btn-lg">View Portfolio</button>
              <button className="btn btn-outline btn-accent btn-lg">Contact Me</button>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Artist Image */}
            <div className="relative">
              <div className="relative z-10">
                <Image 
                  src="/artist-about.jpg" 
                  alt="Artist at Work" 
                  width={600} 
                  height={800}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-accent rounded-2xl -z-10"></div>
            </div>

            {/* Artist Story */}
            <div>
              <h2 className="text-4xl font-bold mb-6">My Story</h2>
              <div className="space-y-4 text-lg">
                <p>
                  Hello! I'm <span className="font-bold text-primary">Alex Morgan</span>, a passionate artist with over 8 years of experience in creating captivating visual stories. My journey began with a simple sketchbook and has evolved into a lifelong pursuit of artistic excellence.
                </p>
                <p>
                  I believe that every piece of art should tell a story, evoke emotion, and connect with the viewer on a personal level. My work spans across various mediums - from traditional oil paintings to cutting-edge digital illustrations.
                </p>
                <p>
                  What drives me is the joy of bringing someone's vision to life. Whether it's a cherished memory, a dream landscape, or a beloved character, I pour my heart into every brushstroke and pixel.
                </p>
              </div>
              
              {/* Signature */}
              <div className="mt-8">
                <Image 
                  src="/signature.png" 
                  alt="Artist Signature" 
                  width={200} 
                  height={100}
                  className="opacity-70"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">My Journey</h2>
          <div className="max-w-4xl mx-auto">
            {artistBio.map((item, index) => (
              <div key={index} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 w-24">
                  <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="ml-8 flex-grow">
                  <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                      <h3 className="card-title text-2xl">{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">My Expertise</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Skills Progress */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-base-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${skill.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Artistic Philosophy */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Artistic Philosophy</h3>
              <div className="space-y-6">
                <div className="card bg-primary text-primary-content">
                  <div className="card-body">
                    <h4 className="card-title">Emotion First</h4>
                    <p>Every artwork should evoke genuine emotion and create a lasting connection with the viewer.</p>
                  </div>
                </div>
                <div className="card bg-secondary text-secondary-content">
                  <div className="card-body">
                    <h4 className="card-title">Quality Over Quantity</h4>
                    <p>I believe in pouring time and dedication into fewer pieces to ensure each one is exceptional.</p>
                  </div>
                </div>
                <div className="card bg-accent text-accent-content">
                  <div className="card-body">
                    <h4 className="card-title">Client Collaboration</h4>
                    <p>The best art comes from collaboration - your vision combined with my expertise.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Milestones & Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4 flex justify-center">
                  {achievement.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{achievement.count}</div>
                <div className="text-lg">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social & Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Let's Create Together</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Whether you're looking for a custom commission or just want to connect about art, I'd love to hear from you!
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-12">
              <a href="https://instagram.com" className="btn btn-circle btn-lg">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://twitter.com" className="btn btn-circle btn-lg">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="https://artstation.com" className="btn btn-circle btn-lg">
                <FaArtstation className="text-2xl" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/commission" className="btn btn-primary btn-lg px-12">
                Start a Commission
              </Link>
              <Link href="/contact" className="btn btn-outline btn-primary btn-lg px-12">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}