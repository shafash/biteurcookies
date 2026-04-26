'use client'

import { useEffect, useState } from 'react'
import { Clock, Thermometer, Package, Sparkles, Heart, Star } from 'lucide-react'

export function StorageInfo() {
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

    const section = document.getElementById('about')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const infoItems = [
    {
      icon: Clock,
      title: 'Fresh for 2 Days',
      description: 'Best enjoyed within 2 days at room temperature',
      gradient: 'from-bakery-pink to-bakery-pink-deep',
      shadow: 'shadow-bakery-pink/40',
      bgLight: 'bg-bakery-pink/10',
    },
    {
      icon: Thermometer,
      title: 'Room Temperature',
      description: 'Store in a cool, dry place away from direct sunlight',
      gradient: 'from-bakery-green to-bakery-matcha',
      shadow: 'shadow-bakery-green/40',
      bgLight: 'bg-bakery-green/10',
    },
    {
      icon: Package,
      title: 'Sealed Packaging',
      description: 'Each cookie comes in premium sealed packaging',
      gradient: 'from-bakery-chocolate-light to-bakery-chocolate',
      shadow: 'shadow-bakery-chocolate/40',
      bgLight: 'bg-bakery-chocolate/10',
    },
  ]

  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-28">
      {/* Rich background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bakery-cream/30 via-background to-bakery-pink/10" />
        <div className="absolute inset-0 texture-dots opacity-20" />
        <div className="absolute inset-0 cookie-crumbs opacity-30" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-bakery-pink/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-bakery-green/15 blur-[120px]" />
        
        {/* Decorative elements */}
        <div className="absolute left-1/3 top-20 hidden lg:block">
          <Star className="h-6 w-6 text-bakery-gold fill-current animate-pulse-soft opacity-50" />
        </div>
        <div className="absolute right-1/4 bottom-32 hidden lg:block">
          <Heart className="h-5 w-5 text-bakery-pink-deep fill-current animate-pulse-soft opacity-40" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bakery-cream-dark to-bakery-cream px-6 py-3 shadow-xl shadow-bakery-cream-dark/30 inner-glow border border-bakery-cream-dark/30">
            <Sparkles className="h-4 w-4 text-bakery-chocolate animate-pulse-soft" />
            <span className="text-sm font-black text-bakery-chocolate tracking-widest uppercase">Good To Know</span>
          </div>
          <h2 className="mb-5 font-serif text-4xl font-bold text-bakery-chocolate md:text-5xl lg:text-6xl">
            Storage & Care
          </h2>
          <p className="mx-auto max-w-xl text-lg text-bakery-chocolate-light md:text-xl">
            Keep your cookies fresh and delicious with these simple tips
          </p>
        </div>

        {/* Info cards with rich styling */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl bg-white p-8 text-center shadow-bakery-lg transition-all duration-500 hover:shadow-bakery-xl border border-bakery-pink/10 hover:border-bakery-pink/30 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Decorative gradient blob */}
              <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 blur-3xl transition-all duration-700 group-hover:opacity-40 group-hover:scale-[2]`} />
              <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-gradient-to-br from-bakery-cream to-bakery-pink/20 blur-2xl opacity-0 transition-all duration-700 group-hover:opacity-60" />
              
              {/* Icon with gradient and shadow */}
              <div className="relative mb-6 inline-flex">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
                <div className={`relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.gradient} text-white shadow-xl ${item.shadow} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 inner-glow`}>
                  <item.icon className="h-10 w-10" />
                </div>
              </div>
              
              <h3 className="mb-3 text-xl font-bold text-bakery-chocolate">
                {item.title}
              </h3>
              <p className="text-bakery-chocolate-light leading-relaxed">{item.description}</p>
              
              {/* Hover shine effect */}
              <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </div>
          ))}
        </div>

        {/* Love note with enhanced styling */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-bakery-pink/20 via-bakery-cream to-bakery-green/20 px-10 py-5 shadow-xl border border-bakery-pink/20">
            <Heart className="h-6 w-6 fill-bakery-red-velvet text-bakery-red-velvet animate-pulse-soft" />
            <p className="font-semibold text-bakery-chocolate text-lg">
              Every cookie is baked with love and care
            </p>
            <Heart className="h-6 w-6 fill-bakery-red-velvet text-bakery-red-velvet animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
