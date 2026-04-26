'use client'

import { Instagram, MessageCircle, Mail, Heart, Cookie, Star, Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-bakery-pink/30 bg-bakery-cream">
      {/* Animated marquee banner */}
      <div className="overflow-hidden bg-gradient-to-r from-bakery-green via-bakery-matcha to-bakery-green py-4 shadow-inner">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-4 text-base font-bold text-white tracking-widest"
            >
              <Star className="h-4 w-4 fill-current" />
              <span>BITE UR COOKIES</span>
              <Star className="h-4 w-4 fill-current" />
              <span>PREMIUM ARTISAN</span>
            </span>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-bakery-pink/20 blur-[120px]" />
        <div className="absolute -right-32 top-1/2 h-80 w-80 rounded-full bg-bakery-green/15 blur-[120px]" />
        <div className="absolute inset-0 texture-dots opacity-20" />
        <div className="absolute inset-0 cookie-crumbs opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-bakery-pink/30 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink to-bakery-pink-deep shadow-xl shadow-bakery-pink/40 inner-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Cookie className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-bakery-chocolate">
                  Bite Ur Cookies
                </span>
                <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">Premium Artisan</p>
              </div>
            </div>
            <p className="mb-6 leading-relaxed text-bakery-chocolate-light">
              Handcrafted premium soft cookies made with love and the finest ingredients. Every bite tells a story of passion and quality.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: MessageCircle, label: 'WhatsApp' },
                { icon: Mail, label: 'Email' },
              ].map((social, i) => (
                <a
                  key={social.label}
                  href="#"
                  className="group/social flex h-12 w-12 items-center justify-center rounded-xl bg-white text-bakery-chocolate shadow-bakery transition-all duration-300 hover:bg-gradient-to-br hover:from-bakery-green hover:to-bakery-matcha hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-bakery-green/40 border border-bakery-pink/10 hover:border-transparent"
                  aria-label={social.label}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <social.icon className="h-5 w-5 transition-transform duration-300 group-hover/social:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-bakery-chocolate flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-bakery-green" />
              Quick Links
            </h3>
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
                    className="group flex items-center gap-3 text-bakery-chocolate-light transition-all duration-300 hover:text-bakery-green hover:translate-x-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-bakery-pink transition-all duration-300 group-hover:bg-bakery-green group-hover:scale-150 group-hover:shadow-md group-hover:shadow-bakery-green/50" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Info */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-bakery-chocolate flex items-center gap-2">
              <Heart className="h-4 w-4 text-bakery-pink-deep fill-current" />
              Order Info
            </h3>
            <ul className="space-y-4">
              {[
                'Pre-order opens every week',
                'Minimum order: 4 cookies',
                'Delivery available in city area',
                'Self-pickup also available',
              ].map((info, i) => (
                <li key={info} className="flex items-start gap-3 group">
                  <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-br from-bakery-green to-bakery-matcha shadow-sm shadow-bakery-green/50 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-bakery-chocolate-light leading-relaxed">{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar with enhanced styling */}
        <div className="mt-16 rounded-3xl bg-white/70 px-8 py-6 shadow-inner backdrop-blur-sm border border-bakery-pink/20">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="flex items-center gap-2 font-semibold text-bakery-chocolate">
              Made with <Heart className="h-5 w-5 fill-bakery-red-velvet text-bakery-red-velvet animate-pulse-soft" /> by Bite Ur Cookies
            </p>
            <p className="text-sm text-bakery-chocolate-light">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
