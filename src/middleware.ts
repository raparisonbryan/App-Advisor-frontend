import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    if (pathname.startsWith('/admin')) {
        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = '/connexion';
            return NextResponse.redirect(url);
        }

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const url = request.nextUrl.clone();
                url.pathname = '/connexion';
                return NextResponse.redirect(url);
            }

            const userData = await response.json();

            if (!userData.Admin) {
                const url = request.nextUrl.clone();
                url.pathname = '/connexion';
                return NextResponse.redirect(url);
            }
        } catch (error) {
            console.error(error);
            const url = request.nextUrl.clone();
            url.pathname = '/connexion';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};