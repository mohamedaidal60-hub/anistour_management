import { NextResponse } from 'next/server'
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

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    
    const transactionData = {
      type: 'EXPENSE',
      amount: parseFloat(data.amount),
      date: new Date().toISOString(),
      description: data.description || '',
      expenseType: data.expenseType,
      enteredBy: (user as any).email,
      vehicleId: data.vehicleId || null,
    }

    const { data: transaction, error } = await supabaseAdmin
      .from('transactions')
      .insert([transactionData])
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // If Maintenance, update Vehicle and create Maintenance record
    if (data.expenseType === 'MAINTENANCE') {
      if (!data.vehicleId || !data.kmAtMaintenance) {
        return NextResponse.json({ error: 'Vehicle and Km required for maintenance' }, { status: 400 })
      }

      const newKm = parseInt(data.kmAtMaintenance)

      // Update Vehicle currentKm
      const { error: updateError } = await supabaseAdmin
        .from('vehicles')
        .update({ currentKm: newKm })
        .eq('id', data.vehicleId)

      if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })

      // Create Maintenance Record
      const { error: mainError } = await supabaseAdmin
        .from('maintenances')
        .insert([{
          vehicleId: data.vehicleId,
          type: data.maintenanceType,
          kmAtMaintenance: newKm,
          cost: parseFloat(data.amount),
          date: new Date().toISOString(),
        }])

      if (mainError) return NextResponse.json({ error: mainError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}


