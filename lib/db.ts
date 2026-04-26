import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Types
export interface Cookie {
  id: string
  name: string
  description: string
  price: number
  image: string
  color: string
  bgColor: string
  isLimitedStock: boolean
  isAvailable: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface AddOn {
  id: string
  name: string
  price: number
  icon: string
  isAvailable: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: number
  orderNumber: string
  customerName: string
  customerPhone: string
  customerAddress: string | null
  notes: string | null
  paymentMethod: string
  subtotal: number
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
  items?: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId: number
  cookieId: string
  cookieName: string
  cookiePrice: number
  quantity: number
  createdAt: Date
  addons?: OrderItemAddon[]
}

export interface OrderItemAddon {
  id: number
  orderItemId: number
  addonId: string
  addonName: string
  addonPrice: number
  createdAt: Date
}

export interface Setting {
  key: string
  value: string
  updatedAt: Date
}

// Helper to convert snake_case DB results to camelCase
function toCamelCase<T>(row: Record<string, unknown>): T {
  const result: Record<string, unknown> = {}
  for (const key in row) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    result[camelKey] = row[key]
  }
  return result as T
}

// Cookie Operations
export async function getCookies(): Promise<Cookie[]> {
  const rows = await sql`
    SELECT * FROM cookies 
    WHERE is_available = true 
    ORDER BY display_order ASC
  `
  return rows.map(row => toCamelCase<Cookie>(row))
}

export async function getAllCookies(): Promise<Cookie[]> {
  const rows = await sql`
    SELECT * FROM cookies 
    ORDER BY display_order ASC
  `
  return rows.map(row => toCamelCase<Cookie>(row))
}

export async function getCookieById(id: string): Promise<Cookie | null> {
  const rows = await sql`SELECT * FROM cookies WHERE id = ${id}`
  return rows.length > 0 ? toCamelCase<Cookie>(rows[0]) : null
}

export async function createCookie(cookie: Omit<Cookie, 'createdAt' | 'updatedAt'>): Promise<Cookie> {
  const rows = await sql`
    INSERT INTO cookies (id, name, description, price, image, color, bg_color, is_limited_stock, is_available, display_order)
    VALUES (${cookie.id}, ${cookie.name}, ${cookie.description}, ${cookie.price}, ${cookie.image}, ${cookie.color}, ${cookie.bgColor}, ${cookie.isLimitedStock}, ${cookie.isAvailable}, ${cookie.displayOrder})
    RETURNING *
  `
  return toCamelCase<Cookie>(rows[0])
}

export async function updateCookie(id: string, updates: Partial<Omit<Cookie, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Cookie | null> {
  const existing = await getCookieById(id)
  if (!existing) return null
  
  const rows = await sql`
    UPDATE cookies SET
      name = ${updates.name ?? existing.name},
      description = ${updates.description ?? existing.description},
      price = ${updates.price ?? existing.price},
      image = ${updates.image ?? existing.image},
      color = ${updates.color ?? existing.color},
      bg_color = ${updates.bgColor ?? existing.bgColor},
      is_limited_stock = ${updates.isLimitedStock ?? existing.isLimitedStock},
      is_available = ${updates.isAvailable ?? existing.isAvailable},
      display_order = ${updates.displayOrder ?? existing.displayOrder},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return toCamelCase<Cookie>(rows[0])
}

export async function deleteCookie(id: string): Promise<boolean> {
  const result = await sql`DELETE FROM cookies WHERE id = ${id}`
  return result.length > 0 || true // neon returns empty array on delete
}

// Add-On Operations
export async function getAddOns(): Promise<AddOn[]> {
  const rows = await sql`
    SELECT * FROM add_ons 
    WHERE is_available = true 
    ORDER BY display_order ASC
  `
  return rows.map(row => toCamelCase<AddOn>(row))
}

export async function getAllAddOns(): Promise<AddOn[]> {
  const rows = await sql`
    SELECT * FROM add_ons 
    ORDER BY display_order ASC
  `
  return rows.map(row => toCamelCase<AddOn>(row))
}

export async function getAddOnById(id: string): Promise<AddOn | null> {
  const rows = await sql`SELECT * FROM add_ons WHERE id = ${id}`
  return rows.length > 0 ? toCamelCase<AddOn>(rows[0]) : null
}

export async function createAddOn(addon: Omit<AddOn, 'createdAt' | 'updatedAt'>): Promise<AddOn> {
  const rows = await sql`
    INSERT INTO add_ons (id, name, price, icon, is_available, display_order)
    VALUES (${addon.id}, ${addon.name}, ${addon.price}, ${addon.icon}, ${addon.isAvailable}, ${addon.displayOrder})
    RETURNING *
  `
  return toCamelCase<AddOn>(rows[0])
}

export async function updateAddOn(id: string, updates: Partial<Omit<AddOn, 'id' | 'createdAt' | 'updatedAt'>>): Promise<AddOn | null> {
  const existing = await getAddOnById(id)
  if (!existing) return null
  
  const rows = await sql`
    UPDATE add_ons SET
      name = ${updates.name ?? existing.name},
      price = ${updates.price ?? existing.price},
      icon = ${updates.icon ?? existing.icon},
      is_available = ${updates.isAvailable ?? existing.isAvailable},
      display_order = ${updates.displayOrder ?? existing.displayOrder},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return toCamelCase<AddOn>(rows[0])
}

export async function deleteAddOn(id: string): Promise<boolean> {
  await sql`DELETE FROM add_ons WHERE id = ${id}`
  return true
}

// Order Operations
function generateOrderNumber(): string {
  const date = new Date()
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, '')
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${datePart}-${randomPart}`
}

export interface CreateOrderInput {
  customerName: string
  customerPhone: string
  customerAddress?: string
  notes?: string
  paymentMethod: string
  items: {
    cookieId: string
    cookieName: string
    cookiePrice: number
    quantity: number
    addons: {
      addonId: string
      addonName: string
      addonPrice: number
    }[]
  }[]
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const orderNumber = generateOrderNumber()
  
  // Calculate totals
  let subtotal = 0
  for (const item of input.items) {
    const itemTotal = item.cookiePrice * item.quantity
    const addonsTotal = item.addons.reduce((sum, a) => sum + a.addonPrice, 0) * item.quantity
    subtotal += itemTotal + addonsTotal
  }
  const total = subtotal // Can add delivery fee logic here
  
  // Create order
  const orderRows = await sql`
    INSERT INTO orders (order_number, customer_name, customer_phone, customer_address, notes, payment_method, subtotal, total, status)
    VALUES (${orderNumber}, ${input.customerName}, ${input.customerPhone}, ${input.customerAddress || null}, ${input.notes || null}, ${input.paymentMethod}, ${subtotal}, ${total}, 'pending')
    RETURNING *
  `
  const order = toCamelCase<Order>(orderRows[0])
  
  // Create order items and their addons
  for (const item of input.items) {
    const itemRows = await sql`
      INSERT INTO order_items (order_id, cookie_id, cookie_name, cookie_price, quantity)
      VALUES (${order.id}, ${item.cookieId}, ${item.cookieName}, ${item.cookiePrice}, ${item.quantity})
      RETURNING *
    `
    const orderItem = toCamelCase<OrderItem>(itemRows[0])
    
    for (const addon of item.addons) {
      await sql`
        INSERT INTO order_item_addons (order_item_id, addon_id, addon_name, addon_price)
        VALUES (${orderItem.id}, ${addon.addonId}, ${addon.addonName}, ${addon.addonPrice})
      `
    }
  }
  
  return order
}

export async function getOrders(status?: string): Promise<Order[]> {
  let rows
  if (status) {
    rows = await sql`
      SELECT * FROM orders 
      WHERE status = ${status}
      ORDER BY created_at DESC
    `
  } else {
    rows = await sql`
      SELECT * FROM orders 
      ORDER BY created_at DESC
    `
  }
  return rows.map(row => toCamelCase<Order>(row))
}

export async function getOrderById(id: number): Promise<Order | null> {
  const orderRows = await sql`SELECT * FROM orders WHERE id = ${id}`
  if (orderRows.length === 0) return null
  
  const order = toCamelCase<Order>(orderRows[0])
  
  // Get order items
  const itemRows = await sql`SELECT * FROM order_items WHERE order_id = ${id}`
  const items: OrderItem[] = []
  
  for (const itemRow of itemRows) {
    const item = toCamelCase<OrderItem>(itemRow)
    
    // Get addons for this item
    const addonRows = await sql`SELECT * FROM order_item_addons WHERE order_item_id = ${item.id}`
    item.addons = addonRows.map(row => toCamelCase<OrderItemAddon>(row))
    
    items.push(item)
  }
  
  order.items = items
  return order
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const orderRows = await sql`SELECT * FROM orders WHERE order_number = ${orderNumber}`
  if (orderRows.length === 0) return null
  
  const order = toCamelCase<Order>(orderRows[0])
  
  // Get order items
  const itemRows = await sql`SELECT * FROM order_items WHERE order_id = ${order.id}`
  const items: OrderItem[] = []
  
  for (const itemRow of itemRows) {
    const item = toCamelCase<OrderItem>(itemRow)
    const addonRows = await sql`SELECT * FROM order_item_addons WHERE order_item_id = ${item.id}`
    item.addons = addonRows.map(row => toCamelCase<OrderItemAddon>(row))
    items.push(item)
  }
  
  order.items = items
  return order
}

export async function updateOrderStatus(id: number, status: Order['status']): Promise<Order | null> {
  const rows = await sql`
    UPDATE orders SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows.length > 0 ? toCamelCase<Order>(rows[0]) : null
}

// Settings Operations
export async function getSetting(key: string): Promise<string | null> {
  const rows = await sql`SELECT value FROM settings WHERE key = ${key}`
  return rows.length > 0 ? rows[0].value as string : null
}

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await sql`SELECT key, value FROM settings`
  const settings: Record<string, string> = {}
  for (const row of rows) {
    settings[row.key as string] = row.value as string
  }
  return settings
}

export async function updateSetting(key: string, value: string): Promise<void> {
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES (${key}, ${value}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = ${value}, updated_at = NOW()
  `
}

// Dashboard Stats
export async function getDashboardStats(): Promise<{
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalRevenue: number
  todayOrders: number
  todayRevenue: number
}> {
  const totalResult = await sql`SELECT COUNT(*) as count FROM orders`
  const pendingResult = await sql`SELECT COUNT(*) as count FROM orders WHERE status IN ('pending', 'confirmed', 'preparing', 'ready')`
  const completedResult = await sql`SELECT COUNT(*) as count FROM orders WHERE status = 'completed'`
  const revenueResult = await sql`SELECT COALESCE(SUM(total), 0) as sum FROM orders WHERE status = 'completed'`
  const todayOrdersResult = await sql`SELECT COUNT(*) as count FROM orders WHERE DATE(created_at) = CURRENT_DATE`
  const todayRevenueResult = await sql`SELECT COALESCE(SUM(total), 0) as sum FROM orders WHERE DATE(created_at) = CURRENT_DATE AND status = 'completed'`
  
  return {
    totalOrders: Number(totalResult[0].count),
    pendingOrders: Number(pendingResult[0].count),
    completedOrders: Number(completedResult[0].count),
    totalRevenue: Number(revenueResult[0].sum),
    todayOrders: Number(todayOrdersResult[0].count),
    todayRevenue: Number(todayRevenueResult[0].sum),
  }
}

// Utility
export function formatPrice(price: number): string {
  return `${(price / 1000).toFixed(0)}K`
}
