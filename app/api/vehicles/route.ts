import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

async function verifyToken() {
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

export async function GET() {
  const user = await verifyToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    let query = supabaseAdmin.from('vehicles').select('*').order('createdAt', { ascending: false })
    if ((user as any).role === 'AGENT') {
      query = query.eq('isSold', false)
    }
    const { data, error } = await query
    if (error) return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    return NextResponse.json(data || [])
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const user = await verifyToken()
  if (!user || (user as any).role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    if (!data.name || !data.purchaseDate || !data.purchasePrice || data.currentKm === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data: vehicle, error } = await supabaseAdmin.from('vehicles').insert([{
      name: data.name,
      purchaseDate: data.purchaseDate,
      purchasePrice: parseFloat(data.purchasePrice),
      currentKm: parseInt(data.currentKm),
      licensePlate: data.licensePlate || null,
      photoUrl: data.photoUrl || null,
      isSold: false,
    }]).select()

    if (error) return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 })
    return NextResponse.json(vehicle?.[0])
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

