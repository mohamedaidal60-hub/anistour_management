import { NextResponse, NextRequest } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

async function getUser() {
  const token = (await cookies()).get('token')?.value
  if (!token) return null
  try {
    const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-change-me')
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload
  } catch {
    return null
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .select('*')
      .eq('vehicleId', resolvedParams.id)
      .eq('isActive', true)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()

    const { data: notification, error } = await supabaseAdmin
      .from('notifications')
      .insert([{
        vehicleId: resolvedParams.id,
        type: data.type,
        targetKm: parseInt(data.targetKm),
        isActive: true,
      }])
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(notification?.[0])
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const notificationId = data.notificationId

    const { data: updated, error } = await supabaseAdmin
      .from('notifications')
      .update({ isActive: false })
      .eq('id', notificationId)
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(updated?.[0])
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}