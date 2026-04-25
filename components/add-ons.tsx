'use client'

import { Star, Sparkles, Info } from 'lucide-react'
import { addOns, formatPrice } from '@/lib/data'

export function AddOns() {
  return (
    <section id="add-ons" className="relative overflow-hidden py-16 md:py-24">
      {/* Rich background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-bakery-pink/10 to-bakery-cream/30" />
        <div className="absolute inset-0 texture-dots opacity-30" />
        <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-bakery-green/20 blur-[100px]" />
        <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-bakery-pink/30 blur-[100px]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bakery-green/20 to-bakery-matcha/20 px-5 py-2.5 shadow-lg inner-glow">
            <Sparkles className="h-4 w-4 text-bakery-green" />
            <span className="text-sm font-bold text-bakery-green tracking-wide">MAKE IT SPECIAL</span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold text-bakery-chocolate md:text-4xl lg:text-5xl">
            Delicious Add-Ons
          </h2>
          <p className="mx-auto max-w-xl text-bakery-chocolate-light">
            Elevate your cookies with our premium toppings
          </p>
        </div>

        {/* Add-ons display */}
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {addOns.map((addOn, index) => (
              <div
                key={addOn.id}
                className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-bakery-lg transition-all duration-500 hover:shadow-bakery-xl card-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative gradient */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-bakery-pink/20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-bakery-green/20" />
                
                <div className="relative flex items-center gap-5">
                  {/* Icon container with depth */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-bakery-pink/30 blur-lg" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-cream to-bakery-pink/30 text-4xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 inner-glow">
                      {addOn.icon}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-bold text-bakery-chocolate">
                      {addOn.name}
                    </h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Add to any cookie
                    </p>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-bakery-green/10 px-3 py-1.5 shadow-sm">
                      <Star className="h-3.5 w-3.5 fill-bakery-gold text-bakery-gold" />
                      <span className="text-sm font-bold text-bakery-green">
                        +{formatPrice(addOn.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Info card */}
          <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-bakery-green/10 via-bakery-cream to-bakery-pink/10 p-5 shadow-inner">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bakery-green/20">
              <Info className="h-5 w-5 text-bakery-green" />
            </div>
            <p className="text-sm text-bakery-chocolate">
              <span className="font-bold">Tip:</span> Add extras to each cookie individually when adding to cart. You can also modify add-ons in your cart!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
