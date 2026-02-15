import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;
    
    // Handle API routes with CORS
    if (pathname.startsWith('/api')) {
        return handleApiCORS(request);
    }
    
    // Handle dashboard routes with auth
    if (pathname.startsWith('/dashboard')) {
        return handleDashboardAuth(request, token, pathname);
    }
    
    return NextResponse.next();
}

function handleApiCORS(request) {
    const origin = request.headers.get('origin') || '';
    
    const allowedOrigins = [
        'http://localhost:3000',
        'https://artwork-two-virid.vercel.app',
    ];

    const isAllowedOrigin = allowedOrigins.includes(origin);

    // Handle preflight
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400',
            },
        });
    }

    const response = NextResponse.next();
    
    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
}

function handleDashboardAuth(request, token, pathname) {
    // Protected routes
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }
    
    // Admin routes
    if (pathname.startsWith('/dashboard/admin') && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/api/:path*',
    ],
};