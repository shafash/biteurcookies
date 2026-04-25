'use client'

import { useEffect, useState } from 'react'
import { Clock, Thermometer, Package, Sparkles, Heart } from 'lucide-react'

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
    },
    {
      icon: Thermometer,
      title: 'Room Temperature',
      description: 'Store in a cool, dry place away from direct sunlight',
      gradient: 'from-bakery-green to-bakery-matcha',
      shadow: 'shadow-bakery-green/40',
    },
    {
      icon: Package,
      title: 'Sealed Packaging',
      description: 'Each cookie comes in premium sealed packaging',
      gradient: 'from-bakery-chocolate-light to-bakery-chocolate',
      shadow: 'shadow-bakery-chocolate/40',
    },
  ]

  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-24">
      {/* Rich background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bakery-cream/30 via-background to-bakery-pink/10" />
        <div className="absolute inset-0 texture-dots opacity-20" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-bakery-pink/15 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-bakery-green/15 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`mb-14 text-center transition-all duration-700 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-bakery-cream-dark px-5 py-2.5 shadow-lg inner-glow">
            <Sparkles className="h-4 w-4 text-bakery-green" />
            <span className="text-sm font-bold text-bakery-chocolate tracking-wide">GOOD TO KNOW</span>
          </div>
          <h2 className="mb-5 font-serif text-4xl font-bold text-bakery-chocolate md:text-5xl">
            Storage & Care
          </h2>
          <p className="mx-auto max-w-xl text-lg text-bakery-chocolate-light">
            Keep your cookies fresh and delicious with these simple tips
          </p>
        </div>

        {/* Info cards with rich styling */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl bg-white p-8 text-center shadow-bakery-lg transition-all duration-500 card-lift ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Decorative gradient blob */}
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-150`} />
              
              {/* Icon with gradient and shadow */}
              <div className="relative mb-6 inline-flex">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} blur-lg opacity-50`} />
                <div className={`relative flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-xl ${item.shadow} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 inner-glow`}>
                  <item.icon className="h-9 w-9" />
                </div>
              </div>
              
              <h3 className="mb-3 text-xl font-bold text-bakery-chocolate">
                {item.title}
              </h3>
              <p className="text-bakery-chocolate-light">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Love note */}
        <div className={`mt-14 text-center transition-all duration-700 delay-500 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-bakery-pink/20 via-bakery-cream to-bakery-green/20 px-8 py-4 shadow-lg">
            <Heart className="h-5 w-5 fill-bakery-red-velvet text-bakery-red-velvet animate-pulse-soft" />
            <p className="font-medium text-bakery-chocolate">
              Every cookie is baked with love and care
            </p>
            <Heart className="h-5 w-5 fill-bakery-red-velvet text-bakery-red-velvet animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
