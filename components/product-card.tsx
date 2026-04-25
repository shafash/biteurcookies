'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Check, ShoppingBag, Star, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, type Cookie, addOns, type AddOn } from '@/lib/data'

interface ProductCardProps {
  cookie: Cookie
  index: number
}

export function ProductCard({ cookie, index }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([])
  const [showAddOns, setShowAddOns] = useState(false)
  const { addItem, openCart } = useCartStore()

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns(prev => 
      prev.some(a => a.id === addOn.id)
        ? prev.filter(a => a.id !== addOn.id)
        : [...prev, addOn]
    )
  }

  const handleAddToCart = () => {
    addItem(cookie, selectedAddOns)
    setIsAdded(true)
    setShowAddOns(false)
    setSelectedAddOns([])
    setTimeout(() => setIsAdded(false), 2000)
  }

  const totalPrice = cookie.price + selectedAddOns.reduce((sum, a) => sum + a.price, 0)

  return (
    <Card
      className="group relative overflow-hidden border-0 bg-card shadow-bakery-lg transition-all duration-500 animate-scale-in card-lift"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        background: `linear-gradient(135deg, white 0%, ${cookie.bgColor}40 100%)`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        if (!showAddOns) setSelectedAddOns([])
      }}
    >
      {/* Decorative corner accent */}
      <div 
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-2xl transition-all duration-500 group-hover:opacity-50 group-hover:scale-150"
        style={{ backgroundColor: cookie.color }}
      />
      
      {/* Limited stock badge - premium style */}
      {cookie.isLimitedStock && (
        <div className="absolute left-3 top-3 z-10">
          <div className="flex items-center gap-1.5 rounded-full bg-bakery-red-velvet px-3 py-1.5 shadow-lg inner-glow">
            <Sparkles className="h-3 w-3 text-white" />
            <span className="text-xs font-bold text-white tracking-wide">
              LIMITED
            </span>
          </div>
        </div>
      )}

      <CardContent className="p-0">
        {/* Image container with layered depth */}
        <div className="relative aspect-square overflow-hidden">
          {/* Background layers for depth */}
          <div 
            className="absolute inset-6 rounded-[50%] transition-all duration-500 group-hover:scale-110"
            style={{ backgroundColor: `${cookie.bgColor}` }}
          />
          <div 
            className="absolute inset-8 rounded-[50%] bg-white/50 backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
          />
          
          {/* Cookie image */}
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className={`relative h-full w-full transition-all duration-500 ${isHovered ? 'scale-115 rotate-6' : 'scale-100'}`}>
              <Image
                src={cookie.image}
                alt={cookie.name}
                fill
                className="rounded-full object-cover drop-shadow-2xl"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
          
          {/* Quick add overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ background: `linear-gradient(to top, ${cookie.color}ee 0%, ${cookie.color}99 50%, transparent 100%)` }}
          >
            <Button
              onClick={() => setShowAddOns(true)}
              size="lg"
              className="gap-2 bg-white font-bold text-bakery-chocolate shadow-xl transition-all duration-300 hover:scale-110 hover:bg-bakery-cream btn-press"
            >
              <Plus className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product info */}
        <div className="relative p-5">
          {/* Wavy divider */}
          <div className="absolute -top-3 left-0 right-0 h-6 overflow-hidden">
            <svg viewBox="0 0 1200 120" className="absolute w-full" style={{ fill: 'white' }}>
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
            </svg>
          </div>
          
          {/* Name and price row */}
          <div className="mb-3 flex items-center justify-between">
            <div 
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 shadow-sm inner-glow"
              style={{ backgroundColor: cookie.bgColor }}
            >
              <span 
                className="text-sm font-bold tracking-wide"
                style={{ color: cookie.color }}
              >
                {cookie.name.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-bakery-green/10 px-3 py-1.5">
              <Star className="h-3.5 w-3.5 fill-bakery-gold text-bakery-gold" />
              <span className="text-lg font-bold text-bakery-green">
                {formatPrice(cookie.price)}
              </span>
            </div>
          </div>
          
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {cookie.description}
          </p>

          {/* Add button for mobile */}
          <Button
            onClick={() => setShowAddOns(true)}
            className="w-full gap-2 bg-bakery-green font-bold text-white shadow-lg shadow-bakery-green/30 transition-all hover:bg-bakery-green/90 hover:shadow-xl md:hidden btn-press"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>

      {/* Add-on selection modal overlay */}
      {showAddOns && (
        <div className="absolute inset-0 z-20 flex flex-col bg-white/98 backdrop-blur-sm animate-scale-in">
          <div className="flex flex-1 flex-col p-5">
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-14 w-14 flex-shrink-0">
                <Image
                  src={cookie.image}
                  alt={cookie.name}
                  fill
                  className="rounded-full object-cover shadow-lg"
                />
              </div>
              <div>
                <h3 className="font-bold text-bakery-chocolate">{cookie.name}</h3>
                <p className="text-sm text-muted-foreground">Customize your cookie</p>
              </div>
            </div>
            
            {/* Add-ons */}
            <div className="mb-4 flex-1 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Add extras
              </p>
              {addOns.map((addOn) => {
                const isSelected = selectedAddOns.some(a => a.id === addOn.id)
                return (
                  <button
                    key={addOn.id}
                    onClick={() => toggleAddOn(addOn)}
                    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 btn-press ${
                      isSelected 
                        ? 'bg-bakery-green/15 ring-2 ring-bakery-green shadow-md' 
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <span className="text-xl">{addOn.icon}</span>
                    <span className="flex-1 font-medium text-bakery-chocolate text-sm">
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
            
            {/* Footer with total and actions */}
            <div className="space-y-3 border-t border-bakery-pink/20 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-xl font-bold text-bakery-green">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddOns(false)
                    setSelectedAddOns([])
                  }}
                  className="flex-1 border-2 border-muted-foreground/20 btn-press"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-1 gap-2 bg-bakery-green font-bold text-white shadow-lg shadow-bakery-green/30 btn-press"
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
