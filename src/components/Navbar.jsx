"use client"

import Link from 'next/link'
import React from 'react'
import { useAuth } from '../app/hooks/useAuth'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/about'>About</Link></li>
            <li><Link href='/gallery'>Gallery</Link></li>
            <li><Link href='/commission'>Commission</Link></li>
          </ul>
        </div>
        <Link href='/' className="btn btn-ghost text-xl">ArtGallery</Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/about'>About</Link></li>
          <li><Link href='/gallery'>Gallery</Link></li>
          <li><Link href='/commission'>Commission</Link></li>
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={logout}
              className="btn btn-error btn-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            href="/login"
            className="btn btn-primary"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}