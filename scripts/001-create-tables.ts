import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

async function createTables() {
  console.log('Creating database tables...')

  // Create cookies table
  await sql`
    CREATE TABLE IF NOT EXISTS cookies (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      image TEXT NOT NULL,
      color TEXT NOT NULL,
      bg_color TEXT NOT NULL,
      is_limited_stock BOOLEAN DEFAULT false,
      is_available BOOLEAN DEFAULT true,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('Created cookies table')

  // Create add_ons table
  await sql`
    CREATE TABLE IF NOT EXISTS add_ons (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      icon TEXT NOT NULL,
      is_available BOOLEAN DEFAULT true,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('Created add_ons table')

  // Create orders table
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_address TEXT,
      notes TEXT,
      payment_method TEXT NOT NULL,
      subtotal INTEGER NOT NULL,
      total INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('Created orders table')

  // Create order_items table
  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      cookie_id TEXT NOT NULL,
      cookie_name TEXT NOT NULL,
      cookie_price INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('Created order_items table')

  // Create order_item_addons table
  await sql`
    CREATE TABLE IF NOT EXISTS order_item_addons (
      id SERIAL PRIMARY KEY,
      order_item_id INTEGER REFERENCES order_items(id) ON DELETE CASCADE,
      addon_id TEXT NOT NULL,
      addon_name TEXT NOT NULL,
      addon_price INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('Created order_item_addons table')

  // Create settings table
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('Created settings table')

  // Create indexes for better query performance
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC)`
  await sql`CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)`
  await sql`CREATE INDEX IF NOT EXISTS idx_cookies_display_order ON cookies(display_order)`
  await sql`CREATE INDEX IF NOT EXISTS idx_addons_display_order ON add_ons(display_order)`
  console.log('Created indexes')

  console.log('All tables created successfully!')
}

createTables().catch(console.error)
