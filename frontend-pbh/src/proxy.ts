import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default async function proxy(request: NextRequest) {
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	})

	const { pathname } = request.nextUrl

	if (token?.error === 'REQUIRE_REAUTH') {
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}

	if (!token) {
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}

	if (pathname.startsWith('/admin')) {
		if (token.role !== 'Admin') {
			return NextResponse.redirect(new URL('/profile', request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*', '/profile/:path*'],
}
