'use client'

import { X, Plus, Minus, ShoppingBag, Trash2, Cookie, Copy, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore, type CartItem } from '@/lib/cart-store'
import { formatPrice, addOns as allAddOns } from '@/lib/data'
import { Checkout } from './checkout'

function CartItemCard({ item, index }: { item: CartItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [justDuplicated, setJustDuplicated] = useState(false)
  const { removeItem, updateQuantity, toggleItemAddOn, duplicateItem, getItemTotal } = useCartStore()
  
  const itemTotal = getItemTotal(item)

  const handleDuplicate = () => {
    duplicateItem(item.id)
    setJustDuplicated(true)
    setTimeout(() => setJustDuplicated(false), 1500)
  }
  
  return (
    <div
      className="group overflow-hidden rounded-2xl border-2 border-bakery-pink/20 bg-white shadow-bakery transition-all duration-300 hover:border-bakery-pink/40 hover:shadow-bakery-lg animate-slide-up-stagger"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Main item row */}
      <div className="flex gap-4 p-4">
        {/* Cookie image with hover effect */}
        <div 
          className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl p-1.5 shadow-inner transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: item.cookie.bgColor }}
        >
          <Image
            src={item.cookie.image}
            alt={item.cookie.name}
            fill
            className="rounded-lg object-cover"
            sizes="80px"
          />
          {/* Shine overlay */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-bakery-chocolate text-lg">
                {item.cookie.name}
              </h3>
              <p className="text-sm font-semibold text-bakery-green">
                {formatPrice(item.cookie.price)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground transition-all duration-300 hover:bg-bakery-red-velvet/10 hover:text-bakery-red-velvet hover:scale-110"
              onClick={() => removeItem(item.id)}
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Quantity controls with enhanced styling */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border-2 border-bakery-pink/50 transition-all duration-300 hover:bg-bakery-pink/20 hover:border-bakery-pink hover:scale-110 btn-press"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="w-10 text-center text-lg font-bold text-bakery-chocolate">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border-2 border-bakery-green/50 transition-all duration-300 hover:bg-bakery-green/10 hover:border-bakery-green hover:scale-110 btn-press"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            {/* Duplicate button with feedback */}
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 gap-1.5 text-xs transition-all duration-300 btn-press ${
                justDuplicated 
                  ? 'text-bakery-green bg-bakery-green/10' 
                  : 'text-muted-foreground hover:text-bakery-green hover:bg-bakery-green/10'
              }`}
              onClick={handleDuplicate}
              disabled={justDuplicated}
            >
              {justDuplicated ? (
                <>
                  <Check className="h-3.5 w-3.5 animate-scale-bounce" />
                  Duplicated!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Duplicate
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Add-ons section with improved UX */}
      <div className="border-t border-dashed border-bakery-pink/30">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between px-4 py-3 text-left transition-all duration-300 hover:bg-bakery-cream/30"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-bakery-chocolate">
              {item.addOns.length > 0 
                ? `${item.addOns.length} add-on${item.addOns.length > 1 ? 's' : ''} selected`
                : 'Add extras to this cookie'
              }
            </span>
            {item.addOns.length > 0 && (
              <span className="text-xs font-bold text-bakery-green px-2 py-0.5 rounded-full bg-bakery-green/10">
                +{formatPrice(item.addOns.reduce((sum, a) => sum + a.price, 0))}
              </span>
            )}
          </div>
          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </button>
        
        {/* Expanded add-ons panel */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
          <div className="border-t border-bakery-pink/20 bg-gradient-to-b from-bakery-cream/30 to-bakery-cream/10 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Customize add-ons
            </p>
            <div className="space-y-2">
              {allAddOns.map((addOn, i) => {
                const isSelected = item.addOns.some(a => a.id === addOn.id)
                return (
                  <button
                    key={addOn.id}
                    onClick={() => toggleItemAddOn(item.id, addOn)}
                    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-300 btn-press ${
                      isSelected 
                        ? 'bg-gradient-to-r from-bakery-green/15 to-bakery-matcha/10 ring-2 ring-bakery-green/50 shadow-sm' 
                        : 'bg-white hover:bg-bakery-pink/10 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-xl transition-transform duration-300 hover:scale-125">{addOn.icon}</span>
                    <span className="flex-1 text-sm font-semibold text-bakery-chocolate">
                      {addOn.name}
                    </span>
                    <span className={`text-sm font-bold transition-colors duration-300 ${isSelected ? 'text-bakery-green' : 'text-muted-foreground'}`}>
                      +{formatPrice(addOn.price)}
                    </span>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 ${
                      isSelected ? 'bg-bakery-green scale-110' : 'border-2 border-muted-foreground/30'
                    }`}>
                      {isSelected && <Check className="h-3 w-3 text-white animate-scale-bounce" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Item subtotal with enhanced styling */}
      <div className="flex items-center justify-between border-t border-bakery-pink/20 bg-gradient-to-r from-bakery-cream/40 to-bakery-pink/10 px-4 py-3 rounded-b-2xl">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subtotal</span>
        <span className="text-lg font-bold text-bakery-chocolate">{formatPrice(itemTotal)}</span>
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
  const [showCheckout, setShowCheckout] = useState(false)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 z-50 bg-bakery-chocolate/70 backdrop-blur-md animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart panel with enhanced styling */}
      <div className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md animate-slide-in-right shadow-2xl">
        <div className="flex h-full flex-col bg-gradient-to-b from-bakery-cream to-bakery-cream/95">
          {/* Header with rich styling */}
          <div className="relative overflow-hidden border-b border-bakery-pink/30 px-6 py-5">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-bakery-pink/30 via-bakery-cream to-bakery-green/20" />
            <div className="absolute inset-0 texture-dots opacity-30" />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-bakery-green/30 blur-lg" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-green to-bakery-matcha shadow-lg shadow-bakery-green/40 inner-glow">
                    <ShoppingBag className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-bakery-chocolate">
                    Your Cart
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {getItemCount()} item{getItemCount() !== 1 ? 's' : ''} in cart
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                className="h-11 w-11 rounded-full bg-white/80 text-bakery-chocolate shadow-md transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-lg"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Cart items with scroll */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center px-4">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-bakery-pink/20 blur-2xl scale-150" />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-bakery-pink/30 to-bakery-cream shadow-inner">
                    <Cookie className="h-16 w-16 text-bakery-chocolate/30" />
                  </div>
                </div>
                <h3 className="mb-3 font-serif text-2xl font-bold text-bakery-chocolate">
                  Your cart is empty
                </h3>
                <p className="mb-8 max-w-xs text-muted-foreground leading-relaxed">
                  Add some delicious cookies to get started! Each cookie can be customized with your favorite toppings.
                </p>
                <Button 
                  onClick={closeCart}
                  className="gap-2 bg-gradient-to-r from-bakery-green to-bakery-matcha px-8 py-6 font-bold text-white shadow-xl shadow-bakery-green/30 transition-all duration-300 hover:shadow-2xl hover:scale-105 btn-press"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Info banner */}
                <div className="rounded-xl bg-gradient-to-r from-bakery-green/10 to-bakery-matcha/10 p-4 text-center shadow-inner border border-bakery-green/20">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-bakery-green" />
                    <p className="text-sm text-bakery-green font-medium">
                      <span className="font-bold">Tip:</span> Expand each item to customize toppings
                    </p>
                  </div>
                </div>
                
                {items.map((item, index) => (
                  <CartItemCard key={item.id} item={item} index={index} />
                ))}
              </div>
            )}
          </div>

          {/* Footer with checkout */}
          {items.length > 0 && (
            <div className="border-t border-bakery-pink/30 bg-white p-5 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)]">
              {/* Total with enhanced styling */}
              <div className="mb-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-bakery-cream via-white to-bakery-pink/20 p-5 shadow-inner border border-bakery-pink/20">
                <div>
                  <span className="text-sm text-muted-foreground">Total</span>
                  <p className="text-xs text-muted-foreground">{getItemCount()} items</p>
                </div>
                <span className="text-3xl font-black text-bakery-green">
                  {formatPrice(getTotal())}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Checkout />
                <Button
                  variant="outline"
                  className="w-full border-2 border-bakery-pink/50 font-semibold text-bakery-chocolate transition-all duration-300 hover:bg-bakery-pink/10 hover:border-bakery-pink btn-press"
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
