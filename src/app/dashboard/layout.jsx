"use client"

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const DashboardLayout = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [userRole, setUserRole] = useState('user');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        
        // Fetch user role when session is available
        if (session?.user?.email) {
            fetchUserRole(session.user.email);
        } else {
            setLoading(false);
        }
    }, [session, status, router]);

    const fetchUserRole = async (email) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/user/role?email=${encodeURIComponent(email)}`);
            const data = await response.json();
            setUserRole(data.role || 'user');
        } catch (error) {
            console.error('Error fetching user role:', error);
            setUserRole('user');
        } finally {
            setLoading(false);
        }
    };

    // Navigation items based on role
    const navItems = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M9 4v16"></path>
                    <path d="M14 10l2 2l-2 2"></path>
                </svg>
            ),
            allowedRoles: ['admin', 'user']
        },
        {
            name: 'My Commissions',
            href: '/dashboard/commissions',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                    <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                </svg>
            ),
            allowedRoles: ['user']
        },
        {
            name: 'All Commissions',
            href: '/dashboard/admin/commissions',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                    <path d="M8 9l3 3l-3 3"></path>
                    <path d="M13 15h3"></path>
                    <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                </svg>
            ),
            allowedRoles: ['admin']
        },
        {
            name: 'Add Artwork',
            href: '/dashboard/admin/artworks',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                    <path d="M12 5l0 14"></path>
                    <path d="M5 12l14 0"></path>
                </svg>
            ),
            allowedRoles: ['admin']
        },
        {
            name: 'Profile Settings',
            href: '/dashboard/profile',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                </svg>
            ),
            allowedRoles: ['admin', 'user']
        }
    ];

    // Filter navigation items based on user role
    const filteredNavItems = navItems.filter(item => 
        item.allowedRoles.includes(userRole)
    );

    const isActive = (href) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname.startsWith(href);
    };

    // Get page title based on current path
    const getPageTitle = () => {
        if (pathname === '/dashboard') return 'Dashboard Overview';
        if (pathname.includes('commissions')) return 'Commissions';
        if (pathname.includes('artworks')) return 'Artwork Management';
        if (pathname.includes('profile')) return 'Profile Settings';
        return 'Dashboard';
    };

    // Loading state
    if (status === 'loading' || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // No session - redirecting
    if (!session) {
        return null;
    }

    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            
            {/* Main Content Area */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-200 shadow-sm">
                    <div className="flex-none lg:hidden">
                        <label 
                            htmlFor="my-drawer-4" 
                            aria-label="open sidebar" 
                            className="btn btn-square btn-ghost drawer-button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                <path d="M9 4v16"></path>
                                <path d="M14 10l2 2l-2 2"></path>
                            </svg>
                        </label>
                    </div>
                    
                    <div className="flex-1 px-4">
                        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
                    </div>
                    
                    {/* User dropdown for larger screens */}
                    <div className="flex-none hidden lg:block">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost flex items-center gap-2">
                                <div className="avatar placeholder">
                                    <div className="bg-purple-600 text-white rounded-full w-8">
                                        <span className="text-xs">
                                            {session.user.email?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium">
                                        {session.user.email?.split('@')[0] || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                                </div>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li>
                                    <Link href="/dashboard/profile">Profile Settings</Link>
                                </li>
                                <li>
                                    <button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-6 bg-base-100">
                    {children}
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                
                <div className="flex min-h-full flex-col bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar header */}
                    <div className="p-4 border-b border-base-300">
                        <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                                <div className="bg-purple-600 text-white rounded-full w-10">
                                    <span className="text-sm">
                                        {session.user.email?.charAt(0).toUpperCase() || 'A'}
                                    </span>
                                </div>
                            </div>
                            <div className="is-drawer-close:hidden">
                                <h2 className="font-bold text-lg">ArtPortfolio</h2>
                                <p className="text-xs text-gray-500 capitalize">{userRole} Panel</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <ul className="menu p-4 w-full flex-1">
                        {filteredNavItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`
                                        is-drawer-close:tooltip is-drawer-close:tooltip-right
                                        ${isActive(item.href) ? 'active bg-purple-600 text-white' : ''}
                                    `}
                                    data-tip={item.name}
                                >
                                    {item.icon}
                                    <span className="is-drawer-close:hidden">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Sidebar footer */}
                    <div className="p-4 border-t border-base-300">
                        <div className="is-drawer-close:hidden space-y-3">
                            <div className="text-sm">
                                <p className="font-medium truncate">{session.user.email}</p>
                                <p className="text-xs text-gray-500 capitalize">Signed in as {userRole}</p>
                            </div>
                            <button 
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="btn btn-error btn-sm w-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                        <div className="is-drawer-open:hidden flex justify-center">
                            <button 
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="btn btn-circle btn-error btn-sm"
                                data-tip="Logout"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;