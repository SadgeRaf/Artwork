// hooks/useAuth.js
"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const logout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  return { 
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    user: session?.user,
    logout
  }
}

// Hook to protect pages
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])
}