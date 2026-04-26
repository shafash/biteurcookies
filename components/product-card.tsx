'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Plus, Check, ShoppingBag, Star, Sparkles, X } from 'lucide-react'
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const { addItem, openCart } = useCartStore()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / 20,
        y: (e.clientY - rect.top - rect.height / 2) / 20,
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    if (!showAddOns) setSelectedAddOns([])
  }

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
      ref={cardRef}
      className="group relative overflow-hidden border-0 bg-card shadow-bakery-lg transition-all duration-500 animate-scale-in hover:shadow-bakery-xl"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        background: `linear-gradient(135deg, white 0%, ${cookie.bgColor}50 100%)`,
        transform: isHovered ? `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg) translateZ(10px)` : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient border on hover */}
      <div 
        className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${cookie.color}40 0%, transparent 50%, ${cookie.color}20 100%)`,
          padding: '2px',
        }}
      />
      
      {/* Decorative corner accent with animation */}
      <div 
        className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-30 blur-3xl transition-all duration-700 group-hover:opacity-60 group-hover:scale-[2] group-hover:-right-8 group-hover:-top-8"
        style={{ backgroundColor: cookie.color }}
      />
      <div 
        className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-30"
        style={{ backgroundColor: cookie.color }}
      />
      
      {/* Limited stock badge - premium style with animation */}
      {cookie.isLimitedStock && (
        <div className="absolute left-3 top-3 z-10">
          <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-bakery-red-velvet to-bakery-pink-deep px-3.5 py-2 shadow-lg shadow-bakery-red-velvet/30 inner-glow animate-pulse-ring">
            <Sparkles className="h-3.5 w-3.5 text-white animate-pulse-soft" />
            <span className="text-xs font-black text-white tracking-wider uppercase">
              Limited
            </span>
          </div>
        </div>
      )}

      <CardContent className="relative p-0">
        {/* Image container with layered depth */}
        <div className="relative aspect-square overflow-hidden">
          {/* Multiple background layers for rich depth */}
          <div 
            className="absolute inset-4 rounded-[50%] transition-all duration-700 group-hover:scale-[1.15] group-hover:inset-2"
            style={{ backgroundColor: `${cookie.bgColor}` }}
          />
          <div 
            className="absolute inset-6 rounded-[50%] bg-white/60 backdrop-blur-sm transition-all duration-700 group-hover:scale-110 group-hover:inset-4"
          />
          <div 
            className="absolute inset-8 rounded-[50%] transition-all duration-500 group-hover:inset-6"
            style={{ backgroundColor: `${cookie.bgColor}80` }}
          />
          
          {/* Cookie image with enhanced hover */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div 
              className={`relative h-full w-full transition-all duration-700 ease-out ${
                isHovered ? 'scale-[1.2] rotate-[8deg]' : 'scale-100 rotate-0'
              }`}
            >
              {/* Image glow */}
              <div 
                className="absolute inset-2 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                style={{ backgroundColor: cookie.color }}
              />
              <Image
                src={cookie.image}
                alt={cookie.name}
                fill
                className="rounded-full object-cover drop-shadow-2xl"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Shine effect overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {/* Moving shine sweep */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 transition-all duration-700 group-hover:left-[200%]" />
              </div>
            </div>
          </div>
          
          {/* Quick add overlay with gradient */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ 
              background: `linear-gradient(to top, ${cookie.color}f0 0%, ${cookie.color}cc 40%, ${cookie.color}66 70%, transparent 100%)` 
            }}
          >
            <Button
              onClick={() => setShowAddOns(true)}
              size="lg"
              className="gap-2 bg-white font-bold text-bakery-chocolate shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-bakery-cream hover:shadow-white/50 btn-press animate-scale-bounce"
              style={{ animationDelay: '0.1s' }}
            >
              <Plus className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product info with enhanced styling */}
        <div className="relative p-5 pt-0">
          {/* Wavy divider with animation */}
          <div className="absolute -top-4 left-0 right-0 h-8 overflow-hidden">
            <svg viewBox="0 0 1200 120" className="absolute w-full transition-transform duration-500 group-hover:scale-x-105" preserveAspectRatio="none" style={{ fill: 'white' }}>
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
            </svg>
          </div>
          
          {/* Name and price row */}
          <div className="mb-3 flex items-center justify-between pt-3">
            <div 
              className="group/badge inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-md inner-glow transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: cookie.bgColor }}
            >
              <span 
                className="text-sm font-black tracking-wider"
                style={{ color: cookie.color }}
              >
                {cookie.name.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-bakery-green/10 to-bakery-matcha/10 px-4 py-2 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
              <Star className="h-4 w-4 fill-bakery-gold text-bakery-gold" />
              <span className="text-lg font-black text-bakery-green">
                {formatPrice(cookie.price)}
              </span>
            </div>
          </div>
          
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2 transition-colors duration-300 group-hover:text-bakery-chocolate-light">
            {cookie.description}
          </p>

          {/* Add button for mobile with enhanced style */}
          <Button
            onClick={() => setShowAddOns(true)}
            className="w-full gap-2 bg-gradient-to-r from-bakery-green to-bakery-matcha font-bold text-white shadow-lg shadow-bakery-green/30 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] md:hidden btn-press shine-sweep overflow-hidden"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>

      {/* Add-on selection modal overlay with improved UX */}
      {showAddOns && (
        <div className="absolute inset-0 z-20 flex flex-col bg-white/98 backdrop-blur-md animate-scale-in rounded-[inherit]">
          <div className="flex flex-1 flex-col p-5">
            {/* Header with close button */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg"
                  style={{ backgroundColor: cookie.bgColor }}
                >
                  <Image
                    src={cookie.image}
                    alt={cookie.name}
                    fill
                    className="rounded-xl object-cover p-1"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-bakery-chocolate text-lg">{cookie.name}</h3>
                  <p className="text-sm text-muted-foreground">Customize your cookie</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowAddOns(false)
                  setSelectedAddOns([])
                }}
                className="h-9 w-9 rounded-full bg-muted/50 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Add-ons with improved styling */}
            <div className="mb-4 flex-1 space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Add extras
              </p>
              {addOns.map((addOn, i) => {
                const isSelected = selectedAddOns.some(a => a.id === addOn.id)
                return (
                  <button
                    key={addOn.id}
                    onClick={() => toggleAddOn(addOn)}
                    className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 btn-press animate-slide-up-stagger ${
                      isSelected 
                        ? 'bg-gradient-to-r from-bakery-green/15 to-bakery-matcha/10 ring-2 ring-bakery-green shadow-lg shadow-bakery-green/10' 
                        : 'bg-muted/40 hover:bg-muted/70 hover:shadow-md'
                    }`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">{addOn.icon}</span>
                    <span className="flex-1 font-semibold text-bakery-chocolate">
                      {addOn.name}
                    </span>
                    <span className={`text-sm font-bold transition-colors duration-300 ${isSelected ? 'text-bakery-green' : 'text-muted-foreground'}`}>
                      +{formatPrice(addOn.price)}
                    </span>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                      isSelected ? 'bg-bakery-green scale-110' : 'border-2 border-muted-foreground/30 scale-100'
                    }`}>
                      {isSelected && <Check className="h-3.5 w-3.5 text-white animate-scale-bounce" />}
                    </div>
                  </button>
                )
              })}
            </div>
            
            {/* Footer with total and actions */}
            <div className="space-y-3 border-t-2 border-dashed border-bakery-pink/30 pt-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-medium text-muted-foreground">Total</span>
                <div className="flex items-center gap-2">
                  {selectedAddOns.length > 0 && (
                    <span className="text-xs text-muted-foreground line-through">{formatPrice(cookie.price)}</span>
                  )}
                  <span className="text-2xl font-black text-bakery-green">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddOns(false)
                    setSelectedAddOns([])
                  }}
                  className="flex-1 border-2 border-muted-foreground/20 font-semibold btn-press hover:bg-muted/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-1 gap-2 bg-gradient-to-r from-bakery-green to-bakery-matcha font-bold text-white shadow-lg shadow-bakery-green/30 btn-press transition-all duration-300 hover:shadow-xl disabled:opacity-70"
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4 animate-scale-bounce" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
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
