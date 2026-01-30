import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-change-me');

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { pathname } = req.nextUrl;

    // Paths protecting
    if (pathname.startsWith('/admin') || pathname.startsWith('/agent')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        try {
            const { payload } = await jwtVerify(token, SECRET_KEY);
            const role = payload.role as string;

            if (pathname.startsWith('/admin') && role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/agent/dashboard', req.url));
            }

            if (pathname.startsWith('/agent') && role !== 'AGENT' && role !== 'ADMIN') {
                // Admin can access agent routes? Maybe not, strict separation is better, or admin has full access.
                // Spec says specific roles. Let's keep strict for now, or start with Admin having only Admin access.
                // Admin sees EVERYTHING, so probably should access admin dashboard which shows everything.
                return NextResponse.redirect(new URL('/', req.url));
            }

            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/agent/:path*'],
};
