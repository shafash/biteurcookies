'use client'

import { create } from 'zustand'
import type { Cookie, AddOn } from './data'

// Each cart item has a unique ID so the same cookie can be added multiple times with different add-ons
export interface CartItem {
  id: string // unique identifier for this cart item
  cookie: Cookie
  addOns: AddOn[]
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (cookie: Cookie, addOns?: AddOn[]) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  updateItemAddOns: (itemId: string, addOns: AddOn[]) => void
  toggleItemAddOn: (itemId: string, addOn: AddOn) => void
  duplicateItem: (itemId: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getItemCount: () => number
  getItemTotal: (item: CartItem) => number
}

// Generate unique ID for cart items
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (cookie, addOns = []) => {
    set((state) => ({
      items: [...state.items, { 
        id: generateId(),
        cookie, 
        addOns, 
        quantity: 1 
      }],
    }))
  },

  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }))
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId)
      return
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }))
  },

  updateItemAddOns: (itemId, addOns) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, addOns } : item
      ),
    }))
  },

  toggleItemAddOn: (itemId, addOn) => {
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id !== itemId) return item
        const hasAddOn = item.addOns.some(a => a.id === addOn.id)
        return {
          ...item,
          addOns: hasAddOn 
            ? item.addOns.filter(a => a.id !== addOn.id)
            : [...item.addOns, addOn]
        }
      }),
    }))
  },

  duplicateItem: (itemId) => {
    const { items } = get()
    const itemToDuplicate = items.find(item => item.id === itemId)
    if (itemToDuplicate) {
      set((state) => ({
        items: [...state.items, {
          ...itemToDuplicate,
          id: generateId(),
          quantity: 1
        }],
      }))
    }
  },

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getItemTotal: (item) => {
    const addOnsTotal = item.addOns.reduce((sum, addOn) => sum + addOn.price, 0)
    return (item.cookie.price + addOnsTotal) * item.quantity
  },

  getTotal: () => {
    const { items, getItemTotal } = get()
    return items.reduce((total, item) => total + getItemTotal(item), 0)
  },

  getItemCount: () => {
    const { items } = get()
    return items.reduce((count, item) => count + item.quantity, 0)
  },
}))
