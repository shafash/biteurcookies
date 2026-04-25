'use client'

import { useEffect, useState } from 'react'
import { cookies } from '@/lib/data'
import { ProductCard } from './product-card'
import { Sparkles, Clock, Leaf } from 'lucide-react'

export function ProductGrid() {
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

    const section = document.getElementById('products')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="products" className="relative overflow-hidden py-16 md:py-24">
      {/* Rich background with depth */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bakery-cream/50 via-background to-bakery-pink/10" />
        <div className="absolute inset-0 texture-dots opacity-30" />
        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-bakery-pink/20 blur-[120px]" />
        <div className="absolute right-0 bottom-20 h-96 w-96 rounded-full bg-bakery-green/15 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bakery-gold/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header with premium styling */}
        <div className={`mb-14 text-center transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bakery-pink to-bakery-pink-deep px-5 py-2.5 shadow-xl shadow-bakery-pink/30 inner-glow">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-bold text-white tracking-wide">FRESH BAKED DAILY</span>
          </div>
          <h2 className="mb-5 font-serif text-4xl font-bold text-bakery-chocolate md:text-5xl lg:text-6xl">
            Our Cookie Collection
          </h2>
          <p className="mx-auto max-w-xl text-lg text-bakery-chocolate-light">
            Choose from our selection of premium artisan cookies, each one crafted with love and the finest ingredients
          </p>
        </div>

        {/* Feature badges */}
        <div className={`mb-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-100 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-bakery">
            <Leaf className="h-4 w-4 text-bakery-green" />
            <span className="text-sm font-medium text-bakery-chocolate">Premium Ingredients</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-bakery">
            <Clock className="h-4 w-4 text-bakery-green" />
            <span className="text-sm font-medium text-bakery-chocolate">Baked Fresh</span>
          </div>
        </div>

        {/* Product grid with proper spacing */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cookies.map((cookie, index) => (
            <ProductCard key={cookie.id} cookie={cookie} index={index} />
          ))}
        </div>

        {/* Storage info banner */}
        <div className={`mt-14 transition-all duration-700 delay-300 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-bakery-cream via-white to-bakery-pink/20 p-6 shadow-bakery-lg">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bakery-green/10 shadow-inner">
                <span className="text-2xl">*</span>
              </div>
              <div>
                <p className="font-bold text-bakery-chocolate">Storage Instructions</p>
                <p className="text-sm text-muted-foreground">
                  Best enjoyed fresh! Can be stored for up to 2 days at room temperature in an airtight container.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
