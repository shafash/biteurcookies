'use client'

import { useEffect, useState } from 'react'
import { Star, Sparkles, Info, Plus, Heart } from 'lucide-react'
import { addOns, formatPrice } from '@/lib/data'

export function AddOns() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('add-ons')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="add-ons" className="relative overflow-hidden py-20 md:py-28">
      {/* Rich background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-bakery-pink/10 to-bakery-cream/30" />
        <div className="absolute inset-0 texture-dots opacity-30" />
        <div className="absolute inset-0 cookie-crumbs opacity-30" />
        <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-bakery-green/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-bakery-pink/30 blur-[120px]" />
        
        {/* Decorative stars */}
        <div className="absolute left-1/4 top-20 hidden lg:block">
          <Star className="h-5 w-5 text-bakery-gold fill-current animate-pulse-soft opacity-50" />
        </div>
        <div className="absolute right-1/3 bottom-20 hidden lg:block">
          <Heart className="h-4 w-4 text-bakery-pink-deep fill-current animate-pulse-soft opacity-40" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`mb-14 text-center transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bakery-green/20 via-bakery-matcha/20 to-bakery-green/20 px-6 py-3 shadow-xl shadow-bakery-green/20 inner-glow border border-bakery-green/20">
            <Sparkles className="h-4 w-4 text-bakery-green animate-pulse-soft" />
            <span className="text-sm font-black text-bakery-green tracking-widest uppercase">Make It Special</span>
            <Sparkles className="h-4 w-4 text-bakery-green animate-pulse-soft" style={{ animationDelay: '0.3s' }} />
          </div>
          <h2 className="mb-5 font-serif text-4xl font-bold text-bakery-chocolate md:text-5xl lg:text-6xl">
            Delicious Add-Ons
          </h2>
          <p className="mx-auto max-w-xl text-lg text-bakery-chocolate-light md:text-xl">
            Elevate your cookies with our premium toppings
          </p>
        </div>

        {/* Add-ons display with enhanced cards */}
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {addOns.map((addOn, index) => (
              <div
                key={addOn.id}
                className={`group relative overflow-hidden rounded-3xl bg-white p-8 shadow-bakery-lg transition-all duration-500 hover:shadow-bakery-xl border border-bakery-pink/10 hover:border-bakery-pink/30 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  transform: 'perspective(1000px)'
                }}
              >
                {/* Decorative gradient blob */}
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-bakery-pink/30 to-bakery-cream blur-3xl transition-all duration-700 group-hover:scale-[2] group-hover:opacity-60" />
                <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-bakery-green/10 blur-2xl opacity-0 transition-all duration-700 group-hover:opacity-100" />
                
                <div className="relative flex items-center gap-6">
                  {/* Icon container with depth and animation */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-3xl bg-bakery-pink/40 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-bakery-cream via-bakery-pink/30 to-bakery-pink/50 text-5xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl inner-glow border border-white/50">
                      {addOn.icon}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-bakery-chocolate group-hover:text-bakery-chocolate transition-colors duration-300">
                      {addOn.name}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Add to any cookie for extra deliciousness
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bakery-green/10 to-bakery-matcha/10 px-4 py-2 shadow-md border border-bakery-green/20 group-hover:shadow-lg transition-all duration-300">
                      <Plus className="h-4 w-4 text-bakery-green" />
                      <span className="text-base font-black text-bakery-green">
                        {formatPrice(addOn.price)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>
            ))}
          </div>
          
          {/* Info card with enhanced styling */}
          <div className={`mt-10 flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-bakery-green/10 via-bakery-cream to-bakery-pink/10 p-6 shadow-inner border border-bakery-green/10 transition-all duration-700 delay-300 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-bakery-green/20 to-bakery-matcha/20 shadow-md">
              <Info className="h-6 w-6 text-bakery-green" />
            </div>
            <p className="text-sm text-bakery-chocolate leading-relaxed">
              <span className="font-bold">Pro tip:</span> Add extras to each cookie individually when adding to cart. You can also modify add-ons in your cart anytime!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
