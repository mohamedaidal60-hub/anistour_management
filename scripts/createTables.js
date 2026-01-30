require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const sql = `
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  photoUrl text,
  licensePlate text,
  purchaseDate timestamp with time zone NOT NULL,
  purchasePrice double precision NOT NULL,
  sellingPrice double precision,
  isSold boolean NOT NULL DEFAULT false,
  currentKm integer NOT NULL,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  amount double precision NOT NULL,
  date timestamp with time zone DEFAULT now(),
  description text,
  clientName text,
  expenseType text,
  imageUrl text,
  enteredBy text NOT NULL,
  vehicleId uuid,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  FOREIGN KEY (vehicleId) REFERENCES vehicles(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS maintenances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  date timestamp with time zone DEFAULT now(),
  kmAtMaintenance integer NOT NULL,
  cost double precision NOT NULL,
  provider text,
  imageUrl text,
  vehicleId uuid NOT NULL,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  FOREIGN KEY (vehicleId) REFERENCES vehicles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  targetKm integer NOT NULL,
  isActive boolean NOT NULL DEFAULT true,
  vehicleId uuid NOT NULL,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  FOREIGN KEY (vehicleId) REFERENCES vehicles(id) ON DELETE CASCADE
);
`

async function run() {
  console.log('Creating tables in Supabase...')
  try {
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).catch(() => ({
      error: 'exec_sql RPC not available, trying raw query'
    }))

    if (error && error.message.includes('exec_sql RPC not available')) {
      console.log('Using Supabase REST API approach...')
      const statements = sql.split(';').filter(s => s.trim())
      for (const stmt of statements) {
        if (stmt.trim()) {
          const { error: err } = await supabase.rpc('sql', { query: stmt.trim() }).catch(() => ({ error: null }))
          if (err) console.warn('Warning:', err)
        }
      }
      console.log('Tables creation script completed (verify in Supabase dashboard)')
      return
    }

    if (error) {
      console.error('Error creating tables:', error)
      process.exit(1)
    }

    console.log('Tables created successfully!')
  } catch (err) {
    console.error('Unexpected error:', err)
    console.log('\nAlternative: Please run this SQL manually in Supabase SQL Editor:')
    console.log(sql)
    process.exit(1)
  }
}

run()
