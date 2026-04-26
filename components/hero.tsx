'use client'

import { useEffect, useState, useRef } from 'react'
import { ArrowDown, Sparkles, Star, Heart, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-16 md:pt-20">
      {/* Rich layered background with parallax effect */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-bakery-green/15 via-bakery-pink/10 to-bakery-cream" />
        
        {/* Animated texture overlay */}
        <div className="absolute inset-0 texture-dots opacity-40" />
        <div className="absolute inset-0 cookie-crumbs opacity-50" />
        
        {/* Large decorative blobs with depth and subtle movement */}
        <div 
          className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-bakery-pink opacity-40 blur-[100px] transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        />
        <div 
          className="absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-bakery-green opacity-30 blur-[100px] transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)` }}
        />
        <div 
          className="absolute bottom-10 left-1/3 h-[400px] w-[400px] rounded-full bg-bakery-gold opacity-20 blur-[100px] transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        
        {/* Floating particles */}
        <div className="absolute left-[15%] top-[20%] h-3 w-3 rounded-full bg-bakery-pink particle opacity-60" style={{ animationDelay: '0s' }} />
        <div className="absolute left-[80%] top-[30%] h-2 w-2 rounded-full bg-bakery-green particle opacity-50" style={{ animationDelay: '1s' }} />
        <div className="absolute left-[25%] top-[70%] h-4 w-4 rounded-full bg-bakery-gold particle opacity-40" style={{ animationDelay: '2s' }} />
        <div className="absolute left-[70%] top-[60%] h-2.5 w-2.5 rounded-full bg-bakery-pink-deep particle opacity-50" style={{ animationDelay: '3s' }} />
        <div className="absolute left-[50%] top-[15%] h-2 w-2 rounded-full bg-bakery-matcha particle opacity-40" style={{ animationDelay: '4s' }} />
        
        {/* Decorative hanging elements - premium style */}
        <div className="absolute left-8 top-24 hidden lg:block">
          <div className="relative">
            <div className="h-36 w-0.5 rounded-full bg-gradient-to-b from-bakery-pink via-bakery-pink/50 to-transparent" />
            <div className="absolute -left-2.5 top-0 h-6 w-6 rounded-full bg-gradient-to-br from-bakery-pink to-bakery-pink-deep shadow-lg shadow-bakery-pink/50 animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute -left-2 top-14 h-5 w-5 rounded-full bg-gradient-to-br from-bakery-green to-bakery-matcha shadow-lg animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -left-1.5 top-24 h-4 w-4 rounded-full bg-gradient-to-br from-bakery-gold to-bakery-cream-dark shadow-lg animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
        <div className="absolute right-12 top-28 hidden lg:block">
          <div className="relative">
            <div className="h-32 w-0.5 rounded-full bg-gradient-to-b from-bakery-green via-bakery-green/50 to-transparent" />
            <div className="absolute -right-2.5 top-0 h-6 w-6 rounded-full bg-gradient-to-br from-bakery-green to-bakery-matcha shadow-lg shadow-bakery-green/50 animate-float-slow" style={{ animationDelay: '0.3s' }} />
            <div className="absolute -right-2 top-12 h-5 w-5 rounded-full bg-gradient-to-br from-bakery-pink to-bakery-pink-deep shadow-lg animate-float-slow" style={{ animationDelay: '0.8s' }} />
          </div>
        </div>
        <div className="absolute left-1/4 top-20 hidden lg:block">
          <div className="relative">
            <div className="h-24 w-0.5 rounded-full bg-gradient-to-b from-bakery-gold via-bakery-gold/50 to-transparent" />
            <div className="absolute -left-2 top-0 h-5 w-5 rounded-full bg-gradient-to-br from-bakery-gold to-bakery-cream-dark shadow-lg shadow-bakery-gold/50 animate-float" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 md:min-h-[calc(100vh-5rem)] lg:px-8">
        {/* Pre-order badge with enhanced styling */}
        <div 
          className={`mb-6 transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bakery-pink via-bakery-pink-deep to-bakery-pink px-7 py-3.5 font-semibold text-white shadow-2xl shadow-bakery-pink/50 inner-glow animate-pulse-ring shine-sweep">
            <Sparkles className="h-4 w-4 animate-pulse-soft" />
            <span className="text-sm tracking-widest font-bold">PRE-ORDER NOW OPEN</span>
            <Sparkles className="h-4 w-4 animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Main heading with enhanced typography */}
        <h1 
          className={`mb-4 text-balance font-serif text-4xl font-bold tracking-tight sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl xl:text-8xl transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <span className="block text-bakery-chocolate drop-shadow-sm">
            Artisan Soft Cookies
          </span>
          <span className="mt-2 block bg-gradient-to-r from-bakery-green via-bakery-matcha to-bakery-green-light bg-clip-text text-transparent drop-shadow-sm">
            Made with Love
          </span>
        </h1>

        {/* Subheading with better styling */}
        <p 
          className={`mb-8 max-w-2xl text-pretty text-lg text-bakery-chocolate-light md:mb-10 md:text-xl lg:text-2xl transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          Handcrafted premium cookies with the finest ingredients. Limited stock available — order now before they&apos;re gone!
        </p>

        {/* Price highlight section with enhanced visuals */}
        <div 
          className={`mb-8 flex flex-wrap items-center justify-center gap-8 md:mb-10 transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          {/* Price starburst - premium with glow */}
          <div className="relative animate-float-slow floating-shadow">
            <div className="absolute inset-0 starburst bg-bakery-pink/30 blur-xl scale-110" />
            <div className="starburst relative flex h-36 w-36 items-center justify-center bg-gradient-to-br from-bakery-pink via-bakery-pink-deep to-bakery-red-velvet shadow-2xl shadow-bakery-pink/50 md:h-40 md:w-40">
              <div className="text-center">
                <span className="block text-5xl font-black text-white drop-shadow-lg md:text-6xl">6K</span>
                <span className="block text-sm font-bold text-white/90 tracking-wide">only!</span>
              </div>
            </div>
            {/* Sparkle accents with animation */}
            <Star className="absolute -right-3 -top-3 h-6 w-6 fill-bakery-gold text-bakery-gold animate-pulse-soft drop-shadow-lg" />
            <Star className="absolute -bottom-2 -left-4 h-5 w-5 fill-bakery-gold text-bakery-gold animate-pulse-soft drop-shadow-lg" style={{ animationDelay: '0.3s' }} />
            <Star className="absolute right-2 bottom-0 h-4 w-4 fill-white/80 text-white/80 animate-pulse-soft drop-shadow" style={{ animationDelay: '0.6s' }} />
          </div>
          
          {/* Limited stock badges - stacked with depth */}
          <div className="flex flex-col items-start gap-3">
            <span className="rounded-xl bg-gradient-to-r from-bakery-cream-dark to-bakery-cream px-5 py-2.5 text-sm font-black text-bakery-red-velvet shadow-xl shadow-bakery-cream-dark/50 inner-glow transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              limited
            </span>
            <span className="ml-6 rounded-xl bg-gradient-to-r from-bakery-cream to-bakery-cream-dark px-5 py-2.5 text-sm font-black text-bakery-red-velvet shadow-xl shadow-bakery-cream-dark/50 inner-glow transform rotate-2 hover:rotate-0 transition-transform duration-300">
              stock !
            </span>
          </div>
        </div>

        {/* CTAs with enhanced hover effects */}
        <div 
          className={`flex flex-col gap-4 sm:flex-row transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        >
          <Button
            size="lg"
            className="group relative gap-2 bg-gradient-to-r from-bakery-green to-bakery-matcha px-12 py-7 text-base font-bold shadow-2xl shadow-bakery-green/40 transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:shadow-bakery-green/50 btn-press overflow-hidden"
            asChild
          >
            <a href="#products">
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Order Now</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-bakery-matcha to-bakery-green opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group border-3 border-bakery-pink bg-white/80 px-12 py-7 text-base font-bold text-bakery-chocolate shadow-xl transition-all duration-300 hover:scale-105 hover:bg-bakery-pink/20 hover:border-bakery-pink-deep hover:shadow-2xl btn-press shine-sweep"
            asChild
          >
            <a href="#about">
              <Heart className="mr-2 h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:fill-bakery-pink-deep group-hover:text-bakery-pink-deep" />
              Learn More
            </a>
          </Button>
        </div>

        {/* Floating cookie images with enhanced effects */}
        <div className="pointer-events-none absolute bottom-32 left-12 hidden lg:block">
          <div className="animate-float-slow floating-shadow" style={{ animationDelay: '0s' }}>
            <div className="relative group">
              <div className="absolute -inset-2 rounded-full bg-bakery-chocolate/20 blur-xl" />
              <Image 
                src="/images/chocolate-cookie.jpg" 
                alt="" 
                width={100}
                height={100}
                className="relative rounded-full object-cover shadow-2xl shadow-bakery-chocolate/30 ring-4 ring-white/70 transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-16 top-1/3 hidden lg:block">
          <div className="animate-float floating-shadow" style={{ animationDelay: '1s' }}>
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-bakery-matcha/20 blur-xl" />
              <Image 
                src="/images/matcha-cookie.jpg" 
                alt="" 
                width={80}
                height={80}
                className="relative rounded-full object-cover shadow-2xl shadow-bakery-matcha/30 ring-4 ring-white/70 transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-48 right-1/4 hidden lg:block">
          <div className="animate-float-slow floating-shadow" style={{ animationDelay: '2s' }}>
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-bakery-red-velvet/20 blur-xl" />
              <Image 
                src="/images/red-velvet-cookie.jpg" 
                alt="" 
                width={70}
                height={70}
                className="relative rounded-full object-cover shadow-2xl shadow-bakery-red-velvet/30 ring-4 ring-white/70 transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute left-1/4 bottom-40 hidden xl:block">
          <div className="animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-bakery-gold/20 blur-xl" />
              <Image 
                src="/images/tiramisu-cookie.jpg" 
                alt="" 
                width={60}
                height={60}
                className="relative rounded-full object-cover shadow-2xl shadow-bakery-gold/30 ring-4 ring-white/70"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
        
        {/* Star decorations with glow */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 hidden text-bakery-pink lg:block">
          <Star className="h-10 w-10 animate-pulse-soft fill-current drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(245, 182, 196, 0.5))' }} />
        </div>
        <div className="pointer-events-none absolute right-1/3 top-1/3 hidden text-bakery-green lg:block">
          <Star className="h-6 w-6 animate-pulse-soft fill-current drop-shadow-lg" style={{ animationDelay: '0.5s', filter: 'drop-shadow(0 0 6px rgba(80, 160, 80, 0.5))' }} />
        </div>
        <div className="pointer-events-none absolute bottom-1/3 left-1/3 hidden text-bakery-gold lg:block">
          <Star className="h-8 w-8 animate-pulse-soft fill-current drop-shadow-lg" style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 8px rgba(200, 160, 80, 0.5))' }} />
        </div>
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 hidden text-bakery-pink-deep xl:block">
          <Star className="h-5 w-5 animate-pulse-soft fill-current drop-shadow-lg" style={{ animationDelay: '1.5s', filter: 'drop-shadow(0 0 5px rgba(200, 130, 150, 0.5))' }} />
        </div>
      </div>

      {/* Scroll indicator with enhanced animation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex animate-bounce-subtle flex-col items-center gap-3 text-bakery-chocolate/60">
          <span className="text-xs font-bold tracking-widest uppercase">Scroll to Explore</span>
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-bakery-green/20" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm">
              <ArrowDown className="h-5 w-5 text-bakery-green" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
