'use client'

import { X, Plus, Minus, ShoppingBag, Trash2, Cookie, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore, type CartItem } from '@/lib/cart-store'
import { formatPrice, addOns as allAddOns } from '@/lib/data'
import { Checkout } from './checkout'

function CartItemCard({ item, index }: { item: CartItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { removeItem, updateQuantity, toggleItemAddOn, duplicateItem, getItemTotal } = useCartStore()
  
  const itemTotal = getItemTotal(item)
  
  return (
    <div
      className="rounded-2xl border-2 border-bakery-pink/20 bg-white shadow-bakery transition-all duration-300 hover:border-bakery-pink/40 hover:shadow-bakery-lg animate-slide-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Main item row */}
      <div className="flex gap-3 p-4">
        {/* Cookie image */}
        <div 
          className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl p-1.5 shadow-inner"
          style={{ backgroundColor: item.cookie.bgColor }}
        >
          <Image
            src={item.cookie.image}
            alt={item.cookie.name}
            fill
            className="rounded-lg object-cover"
            sizes="80px"
          />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-bakery-chocolate">
                {item.cookie.name}
              </h3>
              <p className="text-sm font-semibold text-bakery-green">
                {formatPrice(item.cookie.price)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-bakery-red-velvet/10 hover:text-bakery-red-velvet"
              onClick={() => removeItem(item.id)}
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Quantity controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-bakery-pink/50 hover:bg-bakery-pink/20"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-bold text-bakery-chocolate">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-bakery-green/50 hover:bg-bakery-green/10"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Duplicate button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-bakery-green"
              onClick={() => duplicateItem(item.id)}
            >
              <Copy className="h-3.5 w-3.5" />
              Duplicate
            </Button>
          </div>
        </div>
      </div>

      {/* Add-ons section */}
      <div className="border-t border-dashed border-bakery-pink/30">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-bakery-cream/30"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-bakery-chocolate">
              {item.addOns.length > 0 
                ? `${item.addOns.length} add-on${item.addOns.length > 1 ? 's' : ''} selected`
                : 'Add extras to this cookie'
              }
            </span>
            {item.addOns.length > 0 && (
              <span className="text-xs font-bold text-bakery-green">
                +{formatPrice(item.addOns.reduce((sum, a) => sum + a.price, 0))}
              </span>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        
        {/* Expanded add-ons panel */}
        {isExpanded && (
          <div className="animate-slide-up border-t border-bakery-pink/20 bg-bakery-cream/20 p-4">
            <div className="space-y-2">
              {allAddOns.map((addOn) => {
                const isSelected = item.addOns.some(a => a.id === addOn.id)
                return (
                  <button
                    key={addOn.id}
                    onClick={() => toggleItemAddOn(item.id, addOn)}
                    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 ${
                      isSelected 
                        ? 'bg-bakery-green/15 ring-2 ring-bakery-green/50 shadow-sm' 
                        : 'bg-white hover:bg-bakery-pink/10'
                    }`}
                  >
                    <span className="text-lg">{addOn.icon}</span>
                    <span className="flex-1 text-sm font-medium text-bakery-chocolate">
                      {addOn.name}
                    </span>
                    <span className={`text-sm font-bold ${isSelected ? 'text-bakery-green' : 'text-muted-foreground'}`}>
                      +{formatPrice(addOn.price)}
                    </span>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${
                      isSelected ? 'bg-bakery-green' : 'border-2 border-muted-foreground/30'
                    }`}>
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Item subtotal */}
      <div className="flex items-center justify-between border-t border-bakery-pink/20 bg-bakery-cream/30 px-4 py-2.5 rounded-b-2xl">
        <span className="text-xs font-medium text-muted-foreground">Subtotal</span>
        <span className="font-bold text-bakery-chocolate">{formatPrice(itemTotal)}</span>
      </div>
    </div>
  )
}

export function Cart() {
  const {
    items,
    isOpen,
    closeCart,
    getTotal,
    clearCart,
    getItemCount,
  } = useCartStore()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-bakery-chocolate/70 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart panel */}
      <div className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md animate-slide-in-right shadow-2xl">
        <div className="flex h-full flex-col bg-bakery-cream">
          {/* Header */}
          <div className="relative overflow-hidden border-b border-bakery-pink/30 px-6 py-5">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-bakery-pink/30 via-bakery-cream to-bakery-green/20" />
            <div className="absolute inset-0 texture-dots" />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bakery-green shadow-lg shadow-bakery-green/30 inner-glow">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-bakery-chocolate">
                    Your Cart
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {getItemCount()} item{getItemCount() !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                className="h-10 w-10 rounded-full bg-white/80 text-bakery-chocolate shadow-sm hover:bg-white"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-bakery-pink/20 shadow-inner">
                  <Cookie className="h-14 w-14 text-bakery-chocolate/40" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold text-bakery-chocolate">
                  Your cart is empty
                </h3>
                <p className="mb-6 max-w-xs text-sm text-muted-foreground">
                  Add some delicious cookies to get started! Each cookie can be customized with your favorite toppings.
                </p>
                <Button 
                  onClick={closeCart}
                  className="gap-2 bg-bakery-green font-bold text-white shadow-lg shadow-bakery-green/30 hover:bg-bakery-green/90 btn-press"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Info banner */}
                <div className="rounded-xl bg-bakery-green/10 p-3 text-center">
                  <p className="text-xs text-bakery-green">
                    <span className="font-bold">Tip:</span> Expand each item to add or modify toppings individually
                  </p>
                </div>
                
                {items.map((item, index) => (
                  <CartItemCard key={item.id} item={item} index={index} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-bakery-pink/30 bg-white p-5 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)]">
              {/* Total */}
              <div className="mb-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-bakery-cream to-bakery-pink/20 p-4 shadow-inner">
                <span className="font-medium text-bakery-chocolate">Total</span>
                <span className="text-2xl font-bold text-bakery-green">
                  {formatPrice(getTotal())}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button 
                  className="w-full gap-2 bg-bakery-green py-6 font-bold text-white shadow-xl shadow-bakery-green/30 transition-all hover:bg-bakery-green/90 hover:shadow-2xl hover:scale-[1.02] btn-press" 
                  size="lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Checkout Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-bakery-pink/50 font-medium text-bakery-chocolate hover:bg-bakery-pink/10 btn-press"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
