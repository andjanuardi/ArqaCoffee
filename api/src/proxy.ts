import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_PATHS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
]

const PUBLIC_PREFIXES = [
  '/api/auth/register/', // covers /api/auth/register/mitra
]

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

function isPublicPath(pathname: string): boolean {
  for (const prefix of PUBLIC_PREFIXES) {
    if (pathname.startsWith(prefix)) return true
  }
  return PUBLIC_PATHS.includes(pathname)
}

function corsResponse(status: number, body?: unknown) {
  if (body !== undefined) {
    return NextResponse.json(body, { status, headers: CORS_HEADERS })
  }
  return new NextResponse(null, { status, headers: CORS_HEADERS })
}

async function getSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return corsResponse(204)
  }

  // Only protect API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Skip auth for public paths
  if (isPublicPath(pathname)) {
    const response = NextResponse.next()
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      response.headers.set(key, value)
    }
    return response
  }

  // Verify JWT for protected routes
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return corsResponse(401, { error: 'Unauthorized — missing token' })
  }

  const token = authHeader.slice(7)

  try {
    const secret = await getSecret()
    const { payload } = await jwtVerify(token, secret)
    const { userId, role } = payload as { userId: string; role: string }

    // Inject user info into headers for route handlers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', userId)
    requestHeaders.set('x-user-role', role)

    const response = NextResponse.next({ request: { headers: requestHeaders } })
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      response.headers.set(key, value)
    }
    return response
  } catch {
    return corsResponse(401, { error: 'Unauthorized — invalid or expired token' })
  }
}

export const config = {
  matcher: '/api/:path*',
}
