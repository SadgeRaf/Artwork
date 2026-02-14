"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FaUser, FaPalette, FaClock, FaCheckCircle, FaRegClock } from 'react-icons/fa'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    commissions: 0,
    pending: 0,
    completed: 0
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user/profile')
        const data = await res.json()
        
        if (data.success) {
          setUserData(data.user)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setLoading(false)
      }
    }

    

    fetchUserData()
    
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-primary">{userData?.name || session?.user?.name || 'Artist'}</span>
        </h1>
        <p className="text-gray-600 mt-2">
          {userData?.role === 'admin' ? 'Manage your gallery and commissions' : 'Track your commissions and profile'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="stat-figure text-primary">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FaRegClock className="text-xl" />
            </div>
          </div>
          <div className="stat-title text-gray-500">Active Commissions</div>
          <div className="stat-value text-3xl text-primary">{stats.pending}</div>
          <div className="stat-desc text-sm mt-1">
            {stats.pending === 0 ? 'No active commissions' : `${stats.pending} in progress`}
          </div>
        </div>

        <div className="stat bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="stat-figure text-success">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <FaCheckCircle className="text-xl" />
            </div>
          </div>
          <div className="stat-title text-gray-500">Completed</div>
          <div className="stat-value text-3xl text-success">{stats.completed}</div>
          <div className="stat-desc text-sm mt-1">
            {stats.completed === 0 ? 'No completed commissions yet' : 'Great job!'}
          </div>
        </div>

        <div className="stat bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="stat-figure text-info">
            <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
              <FaPalette className="text-xl" />
            </div>
          </div>
          <div className="stat-title text-gray-500">Total Commissions</div>
          <div className="stat-value text-3xl text-info">{stats.commissions}</div>
          <div className="stat-desc text-sm mt-1">
            Lifetime total
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FaUser />
            </div>
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{userData?.name || session?.user?.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{session?.user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500">Account type</span>
              <span className="badge badge-primary badge-sm capitalize">{userData?.role || 'user'}</span>
            </div>
          </div>

          <Link href="/dashboard/profile" className="btn btn-outline btn-primary w-full">
            Edit Profile
          </Link>
        </div>

        {/* Commissions Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <FaClock />
            </div>
            <h2 className="text-xl font-semibold">Recent Commissions</h2>
          </div>

          {stats.commissions > 0 ? (
            <>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Status</span>
                  <div className="flex gap-4">
                    <span className="badge badge-ghost badge-sm">Pending: {stats.pending}</span>
                    <span className="badge badge-success badge-sm">Completed: {stats.completed}</span>
                  </div>
                </div>
                <div className="py-2 text-center text-gray-500 text-sm">
                  View all your commissions and track their progress
                </div>
              </div>

              <Link href="/dashboard/commissions" className="btn btn-outline btn-secondary w-full">
                View All Commissions
              </Link>
            </>
          ) : (
            <>
              <div className="py-8 text-center">
                <p className="text-gray-500 mb-2">No commissions yet</p>
                <p className="text-sm text-gray-400">Ready to start your first commission?</p>
              </div>
              
              <Link href="/commission" className="btn btn-primary w-full">
                Start a Commission
              </Link>
            </>
          )}
        </div>

        {/* Admin Section - Only visible to admins */}
        {userData?.role === 'admin' && (
          <div className="md:col-span-2 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div>
                <h2 className="text-xl font-semibold">Admin Panel</h2>
                <p className="text-sm text-gray-600">Manage artworks and commissions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Link href="/dashboard/admin/artworks" className="btn btn-outline">
                <FaPalette className="mr-2" />
                Artwork Management
              </Link>
              <Link href="/dashboard/admin/artworks/add" className="btn btn-outline">
                <span className="text-lg mr-2">+</span>
                Add New Artwork
              </Link>
              <Link href="/dashboard/admin/commissions" className="btn btn-outline">
                <FaClock className="mr-2" />
                All Commissions
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}