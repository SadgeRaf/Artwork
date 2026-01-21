"use client"

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)


    if (email === 'admin@gmail.com' && password === 'monsterwhite') {
      document.cookie = `auth=true; path=/`
      
      // Redirect to home
      router.push('/')
    } else {
      setError('Invalid email or password')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6 justify-center">Login</h2>
          
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

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input input-bordered w-full"
                required
              />
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

            {/* Credentials Hint */}
            <div className="bg-base-200 rounded-lg p-3 text-sm">
              <p className="font-bold">Credentials:</p>
              <p>Email: <span className="font-mono">admin@gmail.com</span></p>
              <p>Password: <span className="font-mono">monsterwhite</span></p>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
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