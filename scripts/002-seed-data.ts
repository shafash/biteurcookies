import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

async function seedData() {
  console.log('Seeding database...')

  // Seed cookies
  const cookies = [
    {
      id: 'chocolate',
      name: 'Chocolate',
      description: 'Rich dark chocolate with gooey melted chunks and a fudgy center',
      price: 6000,
      image: '/images/chocolate-cookie.jpg',
      color: '#4A3728',
      bg_color: '#F5E6D3',
      is_limited_stock: true,
      is_available: true,
      display_order: 1,
    },
    {
      id: 'matcha',
      name: 'Matcha',
      description: 'Premium Japanese green tea with white chocolate and a soft center',
      price: 6000,
      image: '/images/matcha-cookie.jpg',
      color: '#4A7A3A',
      bg_color: '#E8F0E3',
      is_limited_stock: true,
      is_available: true,
      display_order: 2,
    },
    {
      id: 'tiramisu',
      name: 'Tiramisu',
      description: 'Coffee-infused cookie with rich chocolate chips and mascarpone swirl',
      price: 6000,
      image: '/images/tiramisu-cookie.jpg',
      color: '#8B6914',
      bg_color: '#FFF8E7',
      is_limited_stock: false,
      is_available: true,
      display_order: 3,
    },
    {
      id: 'red-velvet',
      name: 'Red Velvet',
      description: 'Classic red velvet with cream cheese filling and white chocolate chips',
      price: 6000,
      image: '/images/red-velvet-cookie.jpg',
      color: '#8B2942',
      bg_color: '#FFE8ED',
      is_limited_stock: true,
      is_available: true,
      display_order: 4,
    },
  ]

  for (const cookie of cookies) {
    await sql`
      INSERT INTO cookies (id, name, description, price, image, color, bg_color, is_limited_stock, is_available, display_order)
      VALUES (${cookie.id}, ${cookie.name}, ${cookie.description}, ${cookie.price}, ${cookie.image}, ${cookie.color}, ${cookie.bg_color}, ${cookie.is_limited_stock}, ${cookie.is_available}, ${cookie.display_order})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image = EXCLUDED.image,
        color = EXCLUDED.color,
        bg_color = EXCLUDED.bg_color,
        is_limited_stock = EXCLUDED.is_limited_stock,
        is_available = EXCLUDED.is_available,
        display_order = EXCLUDED.display_order,
        updated_at = NOW()
    `
    console.log(`Seeded cookie: ${cookie.name}`)
  }

  // Seed add-ons
  const addOns = [
    {
      id: 'cream-cheese',
      name: 'Cream Cheese',
      price: 2000,
      icon: '🧀',
      is_available: true,
      display_order: 1,
    },
    {
      id: 'melt-chocolate',
      name: 'Melt Milk Chocolate',
      price: 2000,
      icon: '🍫',
      is_available: true,
      display_order: 2,
    },
  ]

  for (const addon of addOns) {
    await sql`
      INSERT INTO add_ons (id, name, price, icon, is_available, display_order)
      VALUES (${addon.id}, ${addon.name}, ${addon.price}, ${addon.icon}, ${addon.is_available}, ${addon.display_order})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        icon = EXCLUDED.icon,
        is_available = EXCLUDED.is_available,
        display_order = EXCLUDED.display_order,
        updated_at = NOW()
    `
    console.log(`Seeded add-on: ${addon.name}`)
  }

  // Seed default settings
  const settings = [
    { key: 'store_name', value: 'Bite Ur Cookies' },
    { key: 'store_phone', value: '+62 812-3456-7890' },
    { key: 'store_address', value: 'Jakarta, Indonesia' },
    { key: 'store_open', value: 'true' },
    { key: 'admin_password_hash', value: '$2a$10$default' }, // Will be updated on first admin setup
  ]

  for (const setting of settings) {
    await sql`
      INSERT INTO settings (key, value)
      VALUES (${setting.key}, ${setting.value})
      ON CONFLICT (key) DO NOTHING
    `
    console.log(`Seeded setting: ${setting.key}`)
  }

  console.log('Database seeded successfully!')
}

seedData().catch(console.error)
