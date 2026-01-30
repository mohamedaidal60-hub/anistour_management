import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-change-me')

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password })

    if (error || !data?.session) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const user = data.user
    const role = (user?.user_metadata as any)?.role || 'AGENT'

    const token: string = await new SignJWT({ userId: user?.id, role, email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(SECRET_KEY)

    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400,
      path: '/',
    })

    return NextResponse.json({ success: true, role })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


