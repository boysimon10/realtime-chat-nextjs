import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/' || path === '/register'
  const token = request.cookies.get('token')?.value || ''
  
  if(isPublicPath && token) {
    return NextResponse.redirect( new URL('/chats', request.nextUrl))
  }
  if(!isPublicPath && !token) {
    return NextResponse.redirect( new URL('/', request.nextUrl))
 }
}

export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/register',
    '/chats'
  ]
}