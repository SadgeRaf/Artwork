"use client"

import React, { useEffect, useRef } from 'react'
import { signIn } from "next-auth/react"
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { fadeInUp, scaleIn } from '../../lib/animations'

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const cardRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) scaleIn(cardRef.current)
    if (titleRef.current) fadeInUp(titleRef.current, 0.2)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error && result.error !== "undefined") {
        toast.error('Invalid email or password')
        setError('Invalid email or password')
      } else if (result?.ok) {
        toast.success('Login successful!')
        router.push(callbackUrl)
        router.refresh()
      } else {
        toast.error('Something went wrong. Please try again.')
        setError('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl })
    } catch (error) {
      setError('Google sign in failed')
      console.error('Google sign in error:', error)
    }
  }

  const handleToggle = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div ref={cardRef} className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 ref={titleRef} className="card-title text-2xl mb-6 justify-center">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password Input with Toggle Button */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="input input-bordered w-full pr-12"
                  required
                />
                <button 
                  type="button"
                  onClick={handleToggle} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary ${isLoading ? 'loading' : ''} w-full`}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              
              {/* Google Sign In Button */}
              <button 
                type="button" 
                onClick={handleGoogleSignIn}
                className="btn btn-outline btn-primary w-full mt-4"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>
              
              <Link href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="w-full">
                <button className="btn btn-outline w-full mt-4">
                  Create New Account
                </button>
              </Link>
            </div>
          </form>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <button 
              onClick={() => router.push('/')}
              className="link link-primary"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}