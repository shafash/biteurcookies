'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, Cookie, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openCart, getItemCount } = useCartStore()
  const itemCount = getItemCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-bakery-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-18">
          {/* Logo with enhanced hover */}
          <a href="#" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-bakery-pink to-bakery-pink-deep blur-lg opacity-50 transition-all duration-300 group-hover:opacity-80 group-hover:blur-xl" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink to-bakery-pink-deep shadow-xl shadow-bakery-pink/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 inner-glow">
                <Cookie className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-bakery-chocolate md:text-2xl transition-colors duration-300 group-hover:text-bakery-pink-deep">
                Bite Ur Cookies
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase hidden sm:block">
                Premium Artisan Cookies
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: '#products', label: 'Our Cookies' },
              { href: '#add-ons', label: 'Add-ons' },
              { href: '#about', label: 'About' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative rounded-full px-5 py-2.5 text-sm font-semibold text-bakery-chocolate/70 transition-all duration-300 hover:bg-bakery-pink/15 hover:text-bakery-chocolate animated-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Pre-order badge - desktop */}
            <div className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-bakery-green/10 to-bakery-matcha/10 px-5 py-2.5 lg:flex border border-bakery-green/20 shadow-sm">
              <Sparkles className="h-4 w-4 text-bakery-green animate-pulse-soft" />
              <span className="text-xs font-bold text-bakery-green tracking-wide">PRE-ORDER OPEN</span>
            </div>
            
            {/* Cart button with enhanced animation */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-bakery-green/10 to-bakery-matcha/10 text-bakery-chocolate transition-all duration-300 hover:from-bakery-green/20 hover:to-bakery-matcha/20 hover:scale-110 hover:shadow-lg border border-bakery-green/10 hover:border-bakery-green/30"
              onClick={openCart}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 animate-bounce-add items-center justify-center rounded-full bg-gradient-to-br from-bakery-green to-bakery-matcha text-xs font-bold text-white shadow-lg shadow-bakery-green/50 ring-3 ring-white">
                  {itemCount}
                </span>
              )}
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl bg-bakery-pink/15 text-bakery-chocolate transition-all duration-300 hover:bg-bakery-pink/25 hover:scale-110 md:hidden border border-bakery-pink/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative h-5 w-5">
                <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`} />
                <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with smooth animation */}
        <div className={`overflow-hidden transition-all duration-500 ease-out md:hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="rounded-3xl bg-white/98 p-5 shadow-bakery-xl backdrop-blur-xl mb-4 border border-bakery-pink/20">
            <div className="mb-5 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-bakery-green/10 to-bakery-matcha/10 p-4 border border-bakery-green/20">
              <Sparkles className="h-4 w-4 text-bakery-green animate-pulse-soft" />
              <span className="text-sm font-bold text-bakery-green tracking-wide">PRE-ORDER NOW OPEN</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { href: '#products', label: 'Our Cookies' },
                { href: '#add-ons', label: 'Add-ons' },
                { href: '#about', label: 'About' },
              ].map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-5 py-4 text-center font-semibold text-bakery-chocolate transition-all duration-300 hover:bg-bakery-pink/15 hover:scale-[1.02] animate-slide-up-stagger"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
