require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

async function run() {
  const email = 'anisbelhadjamara@gmail.com'
  const password = 'admin123'
  console.log('Creating admin user', email)
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: 'ADMIN' }
    })
    if (error) {
      console.error('Error creating user:', error)
      process.exit(1)
    }
    console.log('Admin created:', data)
  } catch (err) {
    console.error('Unexpected error:', err)
    process.exit(1)
  }
}

run()
