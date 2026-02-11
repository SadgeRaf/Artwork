import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;
    
    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    // Admin-only routes
    const adminRoutes = ['/dashboard/admin'];
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    
    // Check if user is trying to access protected route
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }
    
    // Check if user is trying to access admin route
    if (isAdminRoute && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        // Add other protected routes here
    ],
};
