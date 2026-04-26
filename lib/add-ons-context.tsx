'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { AddOn } from './db'

const AddOnsContext = createContext<AddOn[]>([])

export function AddOnsProvider({ 
  children, 
  addOns 
}: { 
  children: ReactNode
  addOns: AddOn[] 
}) {
  return (
    <AddOnsContext.Provider value={addOns}>
      {children}
    </AddOnsContext.Provider>
  )
}

export function useAddOns() {
  return useContext(AddOnsContext)
}
