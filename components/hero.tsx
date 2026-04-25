'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, Sparkles, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden pt-16 md:pt-20">
      {/* Rich layered background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-bakery-green/15 via-bakery-pink/10 to-bakery-cream" />
        
        {/* Texture overlay */}
        <div className="absolute inset-0 texture-dots opacity-50" />
        
        {/* Large decorative blobs with depth */}
        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-bakery-pink opacity-40 blur-[100px]" />
        <div className="absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-bakery-green opacity-30 blur-[100px]" />
        <div className="absolute bottom-10 left-1/3 h-[400px] w-[400px] rounded-full bg-bakery-gold opacity-20 blur-[100px]" />
        
        {/* Decorative hanging elements - like the reference */}
        <div className="absolute left-8 top-24 hidden lg:block">
          <div className="relative">
            <div className="h-32 w-0.5 rounded-full bg-gradient-to-b from-bakery-pink to-bakery-pink/0" />
            <div className="absolute -left-2 top-0 h-5 w-5 rounded-full bg-bakery-pink shadow-lg shadow-bakery-pink/50" />
            <div className="absolute -left-1.5 top-12 h-4 w-4 rounded-full bg-bakery-green/80 shadow-lg" />
            <div className="absolute -left-1 top-20 h-3 w-3 rounded-full bg-bakery-gold shadow-lg" />
          </div>
        </div>
        <div className="absolute right-12 top-28 hidden lg:block">
          <div className="relative">
            <div className="h-28 w-0.5 rounded-full bg-gradient-to-b from-bakery-green to-bakery-green/0" />
            <div className="absolute -right-2 top-0 h-5 w-5 rounded-full bg-bakery-green shadow-lg shadow-bakery-green/50" />
            <div className="absolute -right-1.5 top-10 h-4 w-4 rounded-full bg-bakery-pink shadow-lg" />
          </div>
        </div>
        <div className="absolute left-1/4 top-20 hidden lg:block">
          <div className="relative">
            <div className="h-20 w-0.5 rounded-full bg-gradient-to-b from-bakery-gold to-bakery-gold/0" />
            <div className="absolute -left-1.5 top-0 h-4 w-4 rounded-full bg-bakery-gold shadow-lg shadow-bakery-gold/50" />
          </div>
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 md:min-h-[calc(100vh-5rem)] lg:px-8">
        {/* Pre-order badge */}
        <div 
          className={`mb-6 transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bakery-pink to-bakery-pink-deep px-6 py-3 font-semibold text-white shadow-xl shadow-bakery-pink/40 inner-glow">
            <Sparkles className="h-4 w-4 animate-pulse-soft" />
            <span className="text-sm tracking-wide">PRE-ORDER NOW OPEN</span>
            <Sparkles className="h-4 w-4 animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Main heading */}
        <h1 
          className={`mb-4 text-balance font-serif text-4xl font-bold tracking-tight sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <span className="block text-bakery-chocolate drop-shadow-sm">Artisan Soft Cookies</span>
          <span className="mt-2 block bg-gradient-to-r from-bakery-green via-bakery-matcha to-bakery-green-light bg-clip-text text-transparent drop-shadow-sm">
            Made with Love
          </span>
        </h1>

        {/* Subheading */}
        <p 
          className={`mb-8 max-w-2xl text-pretty text-lg text-bakery-chocolate-light md:mb-10 md:text-xl transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          Handcrafted premium cookies with the finest ingredients. Limited stock available — order now before they&apos;re gone!
        </p>

        {/* Price highlight section */}
        <div 
          className={`mb-8 flex flex-wrap items-center justify-center gap-6 md:mb-10 transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          {/* Price starburst */}
          <div className="relative animate-float-slow">
            <div className="starburst flex h-32 w-32 items-center justify-center bg-gradient-to-br from-bakery-pink to-bakery-pink-deep shadow-2xl shadow-bakery-pink/40 md:h-36 md:w-36">
              <div className="text-center">
                <span className="block text-4xl font-black text-white drop-shadow-md md:text-5xl">6K</span>
                <span className="block text-xs font-bold text-white/90">only!</span>
              </div>
            </div>
            {/* Sparkle accents */}
            <Star className="absolute -right-2 -top-2 h-5 w-5 fill-bakery-gold text-bakery-gold animate-pulse-soft" />
            <Star className="absolute -bottom-1 -left-3 h-4 w-4 fill-bakery-gold text-bakery-gold animate-pulse-soft" style={{ animationDelay: '0.3s' }} />
          </div>
          
          {/* Limited stock badges */}
          <div className="flex flex-col items-start gap-2">
            <span className="rounded-lg bg-bakery-cream-dark px-4 py-2 text-sm font-bold text-bakery-red-velvet shadow-lg shadow-bakery-cream-dark/50 inner-glow">
              limited
            </span>
            <span className="ml-4 rounded-lg bg-bakery-cream-dark px-4 py-2 text-sm font-bold text-bakery-red-velvet shadow-lg shadow-bakery-cream-dark/50 inner-glow">
              stock !
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div 
          className={`flex flex-col gap-4 sm:flex-row transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        >
          <Button
            size="lg"
            className="group gap-2 bg-bakery-green px-10 py-7 text-base font-bold shadow-2xl shadow-bakery-green/40 transition-all duration-300 hover:scale-105 hover:bg-bakery-green/90 hover:shadow-2xl btn-press animate-glow"
            asChild
          >
            <a href="#products">
              <span>Order Now</span>
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-3 border-bakery-pink bg-white/80 px-10 py-7 text-base font-bold text-bakery-chocolate shadow-xl transition-all duration-300 hover:scale-105 hover:bg-bakery-pink/20 btn-press"
            asChild
          >
            <a href="#about">
              <Heart className="mr-2 h-4 w-4" />
              Learn More
            </a>
          </Button>
        </div>

        {/* Floating cookie images */}
        <div className="pointer-events-none absolute bottom-32 left-12 hidden lg:block">
          <div className="animate-float-slow" style={{ animationDelay: '0s' }}>
            <div className="relative">
              <Image 
                src="/images/chocolate-cookie.jpg" 
                alt="" 
                width={90}
                height={90}
                className="rounded-full object-cover shadow-2xl shadow-bakery-chocolate/30 ring-4 ring-white/50"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-16 top-1/3 hidden lg:block">
          <div className="animate-float" style={{ animationDelay: '1s' }}>
            <div className="relative">
              <Image 
                src="/images/matcha-cookie.jpg" 
                alt="" 
                width={70}
                height={70}
                className="rounded-full object-cover shadow-2xl shadow-bakery-matcha/30 ring-4 ring-white/50"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-48 right-1/4 hidden lg:block">
          <div className="animate-float-slow" style={{ animationDelay: '2s' }}>
            <div className="relative">
              <Image 
                src="/images/red-velvet-cookie.jpg" 
                alt="" 
                width={60}
                height={60}
                className="rounded-full object-cover shadow-2xl shadow-bakery-red-velvet/30 ring-4 ring-white/50"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
            </div>
          </div>
        </div>
        
        {/* Star decorations */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 hidden text-bakery-pink lg:block">
          <Star className="h-8 w-8 animate-pulse-soft fill-current drop-shadow-lg" />
        </div>
        <div className="pointer-events-none absolute right-1/3 top-1/3 hidden text-bakery-green lg:block">
          <Star className="h-5 w-5 animate-pulse-soft fill-current drop-shadow-lg" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="pointer-events-none absolute bottom-1/3 left-1/3 hidden text-bakery-gold lg:block">
          <Star className="h-6 w-6 animate-pulse-soft fill-current drop-shadow-lg" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex animate-bounce-subtle flex-col items-center gap-2 text-bakery-chocolate/60">
          <span className="text-xs font-semibold tracking-wider">SCROLL TO EXPLORE</span>
          <ArrowDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  )
}
