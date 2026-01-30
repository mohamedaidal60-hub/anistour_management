import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

async function isAdmin() {
  const token = (await cookies()).get('token')?.value
  if (!token) return false
  try {
    const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-change-me')
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return (payload as any).role === 'ADMIN'
  } catch {
    return false
  }
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({})
    if (error) return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    const users = (data?.users || []).map(u => ({
      id: u.id,
      email: u.email,
      role: (u.user_metadata as any)?.role || 'AGENT',
      createdAt: u.created_at,
    }))
    return NextResponse.json(users)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { email, password, fullName, role } = await req.json()
    if (!email || !password || !role) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role, fullName }
    })

    if (error) return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 })

    return NextResponse.json({ id: data.user.id, email: data.user.email, role: (data.user.user_metadata as any)?.role })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

