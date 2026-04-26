'use client'

import { useEffect, useState } from 'react'
import { cookies } from '@/lib/data'
import { ProductCard } from './product-card'
import { Sparkles, Clock, Leaf, Star, Heart } from 'lucide-react'

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
    <section id="products" className="relative overflow-hidden py-20 md:py-28">
      {/* Rich background with depth */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bakery-cream/50 via-background to-bakery-pink/10" />
        <div className="absolute inset-0 texture-dots opacity-30" />
        <div className="absolute inset-0 cookie-crumbs opacity-40" />
        <div className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-bakery-pink/25 blur-[150px]" />
        <div className="absolute right-0 bottom-20 h-[500px] w-[500px] rounded-full bg-bakery-green/20 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bakery-gold/15 blur-[120px]" />
        
        {/* Decorative floating elements */}
        <div className="absolute left-10 top-40 hidden lg:block">
          <Star className="h-6 w-6 text-bakery-gold fill-current animate-pulse-soft opacity-60" />
        </div>
        <div className="absolute right-20 top-60 hidden lg:block">
          <Star className="h-4 w-4 text-bakery-pink fill-current animate-pulse-soft opacity-50" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="absolute left-1/4 bottom-40 hidden lg:block">
          <Heart className="h-5 w-5 text-bakery-pink-deep fill-current animate-pulse-soft opacity-40" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header with premium styling */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bakery-pink via-bakery-pink-deep to-bakery-pink px-6 py-3 shadow-xl shadow-bakery-pink/40 inner-glow animate-pulse-ring">
            <Sparkles className="h-4 w-4 text-white animate-pulse-soft" />
            <span className="text-sm font-black text-white tracking-widest uppercase">Fresh Baked Daily</span>
            <Sparkles className="h-4 w-4 text-white animate-pulse-soft" style={{ animationDelay: '0.3s' }} />
          </div>
          <h2 className="mb-6 font-serif text-4xl font-bold text-bakery-chocolate md:text-5xl lg:text-6xl xl:text-7xl">
            Our Cookie Collection
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-bakery-chocolate-light md:text-xl leading-relaxed">
            Choose from our selection of premium artisan cookies, each one crafted with love and the finest ingredients
          </p>
        </div>

        {/* Feature badges with enhanced styling */}
        <div className={`mb-12 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-100 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-bakery-lg hover:shadow-bakery-xl transition-all duration-300 hover:-translate-y-1 border border-bakery-green/10">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bakery-green/10">
              <Leaf className="h-4 w-4 text-bakery-green" />
            </div>
            <span className="text-sm font-semibold text-bakery-chocolate">Premium Ingredients</span>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-bakery-lg hover:shadow-bakery-xl transition-all duration-300 hover:-translate-y-1 border border-bakery-pink/10">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bakery-pink/10">
              <Clock className="h-4 w-4 text-bakery-pink-deep" />
            </div>
            <span className="text-sm font-semibold text-bakery-chocolate">Baked Fresh</span>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-bakery-lg hover:shadow-bakery-xl transition-all duration-300 hover:-translate-y-1 border border-bakery-gold/10">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bakery-gold/10">
              <Heart className="h-4 w-4 text-bakery-red-velvet" />
            </div>
            <span className="text-sm font-semibold text-bakery-chocolate">Made with Love</span>
          </div>
        </div>

        {/* Product grid with proper spacing */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8">
          {cookies.map((cookie, index) => (
            <ProductCard key={cookie.id} cookie={cookie} index={index} />
          ))}
        </div>

        {/* Storage info banner with enhanced styling */}
        <div className={`mt-16 transition-all duration-700 delay-300 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-r from-bakery-cream via-white to-bakery-pink/20 p-6 md:p-8 shadow-bakery-xl border border-bakery-pink/20 hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-bakery-green/20 blur-xl" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-green/20 to-bakery-matcha/20 shadow-inner border border-bakery-green/20">
                  <Sparkles className="h-7 w-7 text-bakery-green" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-bakery-chocolate text-lg mb-1">Storage Instructions</p>
                <p className="text-muted-foreground leading-relaxed">
                  Best enjoyed fresh! Can be stored for up to 2 days at room temperature in an airtight container. For best results, warm in microwave for 10 seconds before serving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
