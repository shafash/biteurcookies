'use client'

import { Instagram, MessageCircle, Mail, Heart, Cookie, Star } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-bakery-pink/30 bg-bakery-cream">
      {/* Animated marquee banner */}
      <div className="overflow-hidden bg-gradient-to-r from-bakery-green via-bakery-matcha to-bakery-green py-4 shadow-inner">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-4 text-base font-bold text-white tracking-wide"
            >
              <Star className="h-4 w-4 fill-current" />
              <span>bite ur cookies</span>
              <Star className="h-4 w-4 fill-current" />
              <span>bite ur cookies</span>
            </span>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-bakery-pink/20 blur-[100px]" />
        <div className="absolute -right-20 top-1/2 h-64 w-64 rounded-full bg-bakery-green/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink to-bakery-pink-deep shadow-xl shadow-bakery-pink/40 inner-glow">
                <Cookie className="h-6 w-6 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold text-bakery-chocolate">
                Bite Ur Cookies
              </span>
            </div>
            <p className="mb-6 leading-relaxed text-bakery-chocolate-light">
              Handcrafted premium soft cookies made with love and the finest ingredients. Every bite tells a story.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-bakery-chocolate shadow-bakery transition-all duration-300 hover:bg-bakery-green hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-bakery-green/40"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-bakery-chocolate shadow-bakery transition-all duration-300 hover:bg-bakery-green hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-bakery-green/40"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-bakery-chocolate shadow-bakery transition-all duration-300 hover:bg-bakery-green hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-bakery-green/40"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-bakery-chocolate">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { href: '#products', label: 'Our Cookies' },
                { href: '#add-ons', label: 'Add-ons' },
                { href: '#about', label: 'Storage Info' },
                { href: '#', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-bakery-chocolate-light transition-colors hover:text-bakery-green"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-bakery-pink transition-all group-hover:bg-bakery-green group-hover:scale-150" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Info */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-bakery-chocolate">Order Info</h3>
            <ul className="space-y-4">
              {[
                'Pre-order opens every week',
                'Minimum order: 4 cookies',
                'Delivery available in city area',
                'Self-pickup also available',
              ].map((info) => (
                <li key={info} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-bakery-green shadow-sm shadow-bakery-green/50" />
                  <span className="text-bakery-chocolate-light">{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 rounded-2xl bg-white/60 px-6 py-5 shadow-inner backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="flex items-center gap-2 font-medium text-bakery-chocolate">
              Made with <Heart className="h-5 w-5 fill-bakery-red-velvet text-bakery-red-velvet animate-pulse-soft" /> by Bite Ur Cookies
            </p>
            <p className="text-sm text-bakery-chocolate-light">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
