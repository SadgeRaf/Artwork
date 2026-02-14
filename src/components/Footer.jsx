import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaTwitter, FaArtstation, FaGithub } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer footer-horizontal footer-center bg-gradient-to-b from-base-200 to-base-300 text-base-content rounded-t-2xl p-10">
      
      {/* Main Navigation */}
      <nav className="grid grid-flow-col gap-8 text-sm font-medium">
        <Link href="/about" className="link link-hover hover:text-primary transition-colors duration-300">
          About
        </Link>
        <Link href="/gallery" className="link link-hover hover:text-primary transition-colors duration-300">
          Gallery
        </Link>
        <Link href="/commission" className="link link-hover hover:text-primary transition-colors duration-300">
          Commission
        </Link>
        <Link href="/contact" className="link link-hover hover:text-primary transition-colors duration-300">
          Contact Us
        </Link>
      </nav>

      {/* Social Links */}
      <nav>
        <div className="grid grid-flow-col gap-6">
          <a 
            href="https://instagram.com/rafsartworks" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-pink-600 transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://twitter.com/rafsartworks" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-blue-500 transition-all duration-300 hover:scale-110"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a 
            href="https://artstation.com/rafsartworks" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-110"
            aria-label="ArtStation"
          >
            <FaArtstation />
          </a>
          <a 
            href="https://github.com/rafsartworks" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </nav>

      {/* Copyright & Attribution */}
      <aside className="space-y-2">
        <p className="text-sm text-gray-600">
          © {currentYear} Rafs Artworks. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          Digital art & illustrations by Raf
        </p>
      </aside>

      {/* Optional: Simple Newsletter/Contact Line */}
      <div className="mt-4 pt-4 border-t border-base-300 w-full max-w-md mx-auto">
        <p className="text-xs text-gray-500">
          For commissions and inquiries:{' '}
          <a 
            href="mailto:art@rafsartworks.com" 
            className="link link-hover text-primary hover:text-secondary transition-colors"
          >
            art@rafsartworks.com
          </a>
        </p>
      </div>

    </footer>
  )
}