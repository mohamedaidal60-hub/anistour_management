import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-change-me');

export async function proxy(req: NextRequest) {
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