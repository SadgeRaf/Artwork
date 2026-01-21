"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useAuth() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)

  // Check auth on mount and listen for changes
  useEffect(() => {
    const checkAuth = () => {
      if (typeof document === 'undefined') return false
      const isAuthenticated = document.cookie.includes('auth=true')
      setIsAuth(isAuthenticated)
      return isAuthenticated
    }

    checkAuth()
    
    // Poll for cookie changes (simple approach)
    const interval = setInterval(checkAuth, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const logout = () => {
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setIsAuth(false)
  }

  return { isAuthenticated: isAuth, logout }
}

// Hook to protect pages
export function useRequireAuth() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])
}