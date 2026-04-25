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
          ? 'bg-white/90 backdrop-blur-lg shadow-bakery-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-bakery-pink to-bakery-pink-deep blur-md opacity-50 transition-all group-hover:opacity-70" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink to-bakery-pink-deep shadow-lg shadow-bakery-pink/40 transition-transform group-hover:scale-110 inner-glow">
                <Cookie className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="font-serif text-xl font-bold text-bakery-chocolate md:text-2xl">
              Bite Ur Cookies
            </span>
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
                className="relative rounded-full px-5 py-2.5 text-sm font-semibold text-bakery-chocolate/70 transition-all hover:bg-bakery-pink/20 hover:text-bakery-chocolate"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Pre-order badge - desktop */}
            <div className="hidden items-center gap-2 rounded-full bg-bakery-green/10 px-4 py-2 lg:flex">
              <Sparkles className="h-3.5 w-3.5 text-bakery-green" />
              <span className="text-xs font-bold text-bakery-green">PRE-ORDER OPEN</span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-bakery-green/10 to-bakery-matcha/10 text-bakery-chocolate transition-all hover:from-bakery-green/20 hover:to-bakery-matcha/20 hover:scale-105"
              onClick={openCart}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-6 w-6 animate-pop items-center justify-center rounded-full bg-bakery-green text-xs font-bold text-white shadow-lg shadow-bakery-green/50 ring-2 ring-white">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl bg-bakery-pink/20 text-bakery-chocolate transition-all hover:bg-bakery-pink/30 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="rounded-2xl bg-white/95 p-4 shadow-bakery-lg backdrop-blur-lg mb-4">
            <div className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-bakery-green/10 p-3">
              <Sparkles className="h-4 w-4 text-bakery-green" />
              <span className="text-sm font-bold text-bakery-green">PRE-ORDER NOW OPEN</span>
            </div>
            <div className="flex flex-col gap-1">
              {[
                { href: '#products', label: 'Our Cookies' },
                { href: '#add-ons', label: 'Add-ons' },
                { href: '#about', label: 'About' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-center font-semibold text-bakery-chocolate transition-colors hover:bg-bakery-pink/20"
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
