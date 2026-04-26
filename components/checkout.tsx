'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  X, ArrowLeft, Check, CreditCard, Banknote, QrCode, 
  MapPin, Phone, User, Mail, ShoppingBag, ChevronRight,
  Sparkles, Clock, Package, PartyPopper
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/data'

type PaymentMethod = 'cash' | 'transfer' | 'qris'
type CheckoutStep = 'details' | 'payment' | 'confirmation'

const paymentMethods = [
  {
    id: 'cash' as PaymentMethod,
    name: 'Cash on Delivery',
    description: 'Pay when your order arrives',
    icon: Banknote,
    gradient: 'from-bakery-green to-bakery-matcha',
    shadow: 'shadow-bakery-green/30',
  },
  {
    id: 'transfer' as PaymentMethod,
    name: 'Bank Transfer',
    description: 'Transfer to our bank account',
    icon: CreditCard,
    gradient: 'from-bakery-chocolate-light to-bakery-chocolate',
    shadow: 'shadow-bakery-chocolate/30',
  },
  {
    id: 'qris' as PaymentMethod,
    name: 'QRIS',
    description: 'Scan QR code to pay',
    icon: QrCode,
    gradient: 'from-bakery-pink-deep to-bakery-red-velvet',
    shadow: 'shadow-bakery-pink/30',
  },
]

interface CustomerDetails {
  name: string
  phone: string
  email: string
  address: string
  notes: string
}

export function Checkout() {
  const { items, getTotal, getItemCount, clearCart, getItemTotal, closeCart } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<CheckoutStep>('details')
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null)
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const handleOpenCheckout = () => {
    setIsOpen(true)
    setStep('details')
  }

  const handleCloseCheckout = () => {
    setIsOpen(false)
    setStep('details')
    setSelectedPayment(null)
    setCustomerDetails({ name: '', phone: '', email: '', address: '', notes: '' })
  }

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handleConfirmOrder = async () => {
    setIsSubmitting(true)
    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setOrderNumber(`BUC-${Date.now().toString().slice(-6)}`)
    setStep('confirmation')
    setIsSubmitting(false)
  }

  const handleCompleteOrder = () => {
    clearCart()
    closeCart()
    handleCloseCheckout()
  }

  const isDetailsValid = customerDetails.name && customerDetails.phone && customerDetails.address

  if (!isOpen) {
    return (
      <Button
        onClick={handleOpenCheckout}
        disabled={items.length === 0}
        className="w-full gap-2 bg-gradient-to-r from-bakery-green to-bakery-matcha py-7 font-bold text-white shadow-xl shadow-bakery-green/30 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] btn-press shine-sweep overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        size="lg"
      >
        <ShoppingBag className="h-5 w-5" />
        Checkout Now
      </Button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-bakery-chocolate/80 backdrop-blur-lg animate-fade-in"
        onClick={handleCloseCheckout}
      />

      {/* Checkout Modal with enhanced styling */}
      <div className="fixed inset-4 z-[60] mx-auto max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-in md:inset-y-8">
        <div className="flex h-full flex-col">
          {/* Header with rich styling */}
          <div className="relative overflow-hidden border-b border-bakery-pink/30 px-6 py-5">
            <div className="absolute inset-0 bg-gradient-to-r from-bakery-green/10 via-bakery-cream to-bakery-pink/10" />
            <div className="absolute inset-0 texture-dots opacity-30" />
            
            <div className="relative flex items-center justify-between">
              {step !== 'details' && step !== 'confirmation' ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep('details')}
                  className="h-11 w-11 rounded-full bg-white/80 shadow-md transition-all duration-300 hover:bg-white hover:scale-110"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              ) : (
                <div className="h-11 w-11" />
              )}
              
              <div className="text-center">
                <h2 className="font-serif text-xl font-bold text-bakery-chocolate">
                  {step === 'details' && 'Delivery Details'}
                  {step === 'payment' && 'Payment Method'}
                  {step === 'confirmation' && 'Order Confirmed!'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {step === 'details' && 'Where should we deliver?'}
                  {step === 'payment' && 'Choose how to pay'}
                  {step === 'confirmation' && 'Thank you for your order'}
                </p>
              </div>
              
              {step !== 'confirmation' ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseCheckout}
                  className="h-11 w-11 rounded-full bg-white/80 shadow-md transition-all duration-300 hover:bg-white hover:scale-110"
                >
                  <X className="h-5 w-5" />
                </Button>
              ) : (
                <div className="h-11 w-11" />
              )}
            </div>

            {/* Progress indicator with animation */}
            {step !== 'confirmation' && (
              <div className="relative mt-5 flex gap-2">
                <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step === 'details' || step === 'payment' ? 'bg-gradient-to-r from-bakery-green to-bakery-matcha' : 'bg-bakery-pink/30'}`} />
                <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step === 'payment' ? 'bg-gradient-to-r from-bakery-green to-bakery-matcha' : 'bg-bakery-pink/30'}`} />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Details Step */}
            {step === 'details' && (
              <form onSubmit={handleSubmitDetails} className="p-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-bakery-chocolate font-semibold">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-bakery-green/10">
                        <User className="h-4 w-4 text-bakery-green" />
                      </div>
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="h-12 border-2 border-bakery-pink/30 focus:border-bakery-green focus:ring-bakery-green/20 rounded-xl transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-bakery-chocolate font-semibold">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-bakery-green/10">
                        <Phone className="h-4 w-4 text-bakery-green" />
                      </div>
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="08123456789"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                      className="h-12 border-2 border-bakery-pink/30 focus:border-bakery-green focus:ring-bakery-green/20 rounded-xl transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-bakery-chocolate font-semibold">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-bakery-pink/10">
                        <Mail className="h-4 w-4 text-bakery-pink-deep" />
                      </div>
                      Email (Optional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12 border-2 border-bakery-pink/30 focus:border-bakery-green focus:ring-bakery-green/20 rounded-xl transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2 text-bakery-chocolate font-semibold">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-bakery-green/10">
                        <MapPin className="h-4 w-4 text-bakery-green" />
                      </div>
                      Delivery Address
                    </Label>
                    <textarea
                      id="address"
                      placeholder="Enter your full delivery address"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                      className="min-h-[100px] w-full rounded-xl border-2 border-bakery-pink/30 bg-background px-4 py-3 text-sm transition-all duration-300 focus:border-bakery-green focus:outline-none focus:ring-2 focus:ring-bakery-green/20 resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-bakery-chocolate font-semibold">
                      Order Notes (Optional)
                    </Label>
                    <Input
                      id="notes"
                      placeholder="Any special instructions?"
                      value={customerDetails.notes}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, notes: e.target.value }))}
                      className="h-12 border-2 border-bakery-pink/30 focus:border-bakery-green focus:ring-bakery-green/20 rounded-xl transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-bakery-cream/60 to-bakery-pink/10 p-5 border border-bakery-pink/20">
                  <h3 className="mb-4 font-bold text-bakery-chocolate flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-bakery-green" />
                    Order Summary
                  </h3>
                  <div className="max-h-36 space-y-3 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm bg-white/60 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-8 w-8 rounded-lg overflow-hidden"
                            style={{ backgroundColor: item.cookie.bgColor }}
                          >
                            <Image
                              src={item.cookie.image}
                              alt={item.cookie.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-muted-foreground">
                            {item.quantity}x {item.cookie.name}
                            {item.addOns.length > 0 && (
                              <span className="text-xs text-bakery-green ml-1">(+{item.addOns.length})</span>
                            )}
                          </span>
                        </div>
                        <span className="font-semibold text-bakery-chocolate">{formatPrice(getItemTotal(item))}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t-2 border-dashed border-bakery-pink/30 pt-4">
                    <span className="font-bold text-bakery-chocolate">Total ({getItemCount()} items)</span>
                    <span className="text-2xl font-black text-bakery-green">{formatPrice(getTotal())}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!isDetailsValid}
                  className="mt-6 w-full gap-2 bg-gradient-to-r from-bakery-green to-bakery-matcha py-7 font-bold text-white shadow-xl shadow-bakery-green/30 btn-press transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                  size="lg"
                >
                  Continue to Payment
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </form>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <div className="p-6">
                <div className="space-y-4">
                  {paymentMethods.map((method, i) => {
                    const Icon = method.icon
                    const isSelected = selectedPayment === method.id
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`flex w-full items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-300 btn-press animate-slide-up-stagger ${
                          isSelected
                            ? 'border-bakery-green bg-gradient-to-r from-bakery-green/10 to-bakery-matcha/10 shadow-lg shadow-bakery-green/20'
                            : 'border-bakery-pink/30 bg-white hover:border-bakery-pink hover:bg-bakery-cream/30 hover:shadow-md'
                        }`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${method.gradient} shadow-lg ${method.shadow} transition-all duration-300 ${isSelected ? 'scale-110' : ''}`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-bakery-chocolate text-lg">{method.name}</h3>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isSelected ? 'border-bakery-green bg-bakery-green scale-110' : 'border-muted-foreground/30'
                        }`}>
                          {isSelected && <Check className="h-4 w-4 text-white animate-scale-bounce" />}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Payment details based on selection */}
                {selectedPayment && (
                  <div className="mt-6 animate-scale-in rounded-2xl bg-gradient-to-br from-bakery-cream/60 to-bakery-pink/10 p-5 border border-bakery-pink/20">
                    {selectedPayment === 'cash' && (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-green to-bakery-matcha shadow-lg">
                          <Banknote className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-bakery-chocolate text-lg">Cash on Delivery</h3>
                        <p className="mt-3 text-muted-foreground">
                          Please prepare exact amount of <span className="font-black text-bakery-green text-xl">{formatPrice(getTotal())}</span> when the courier arrives.
                        </p>
                      </div>
                    )}
                    {selectedPayment === 'transfer' && (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-chocolate-light to-bakery-chocolate shadow-lg">
                          <CreditCard className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-bakery-chocolate text-lg">Bank Transfer</h3>
                        <div className="mt-4 rounded-xl bg-white p-4 text-left shadow-inner">
                          <p className="text-xs text-muted-foreground font-semibold">Bank BCA</p>
                          <p className="font-mono text-2xl font-black text-bakery-chocolate mt-1">1234 5678 9012</p>
                          <p className="text-sm text-muted-foreground mt-1">a/n Bite Ur Cookies</p>
                        </div>
                        <p className="mt-4 text-muted-foreground">
                          Transfer <span className="font-black text-bakery-green">{formatPrice(getTotal())}</span> and send proof via WhatsApp
                        </p>
                      </div>
                    )}
                    {selectedPayment === 'qris' && (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink-deep to-bakery-red-velvet shadow-lg">
                          <QrCode className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-bakery-chocolate text-lg">QRIS Payment</h3>
                        <div className="mx-auto mt-4 h-44 w-44 rounded-2xl bg-white p-3 shadow-inner">
                          <div className="flex h-full w-full items-center justify-center rounded-xl bg-bakery-cream/50 border-2 border-dashed border-bakery-pink/30">
                            <p className="text-xs text-muted-foreground px-4 text-center">QR Code will appear here after confirmation</p>
                          </div>
                        </div>
                        <p className="mt-4 text-muted-foreground">
                          Scan to pay <span className="font-black text-bakery-green">{formatPrice(getTotal())}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Total and confirm */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-bakery-cream to-bakery-pink/20 p-5 border border-bakery-pink/20">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-bakery-chocolate">Total to Pay</span>
                    <span className="text-3xl font-black text-bakery-green">{formatPrice(getTotal())}</span>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmOrder}
                  disabled={!selectedPayment || isSubmitting}
                  className="mt-6 w-full gap-2 bg-gradient-to-r from-bakery-green to-bakery-matcha py-7 font-bold text-white shadow-xl shadow-bakery-green/30 btn-press transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-3 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" />
                      Confirm Order
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Confirmation Step */}
            {step === 'confirmation' && (
              <div className="flex flex-col items-center p-6 text-center">
                <div className="relative mb-8">
                  {/* Celebration burst */}
                  <div className="absolute inset-0 animate-ping rounded-full bg-bakery-green/30 scale-150" />
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-bakery-green to-bakery-matcha shadow-2xl shadow-bakery-green/40 animate-scale-bounce">
                    <Check className="h-14 w-14 text-white" />
                  </div>
                  <div className="absolute -right-3 -top-3 animate-bounce-subtle">
                    <PartyPopper className="h-10 w-10 text-bakery-gold" />
                  </div>
                  <div className="absolute -left-2 bottom-0 animate-bounce-subtle" style={{ animationDelay: '0.3s' }}>
                    <Sparkles className="h-8 w-8 text-bakery-pink" />
                  </div>
                </div>

                <h3 className="mb-3 font-serif text-3xl font-bold text-bakery-chocolate">
                  Order Confirmed!
                </h3>
                <p className="mb-8 text-muted-foreground text-lg">
                  Your delicious cookies are being prepared
                </p>

                <div className="mb-6 w-full rounded-2xl bg-gradient-to-r from-bakery-cream to-bakery-pink/20 p-5 border border-bakery-pink/20">
                  <p className="text-sm text-muted-foreground font-semibold">Order Number</p>
                  <p className="font-mono text-3xl font-black text-bakery-green mt-1">{orderNumber}</p>
                </div>

                <div className="mb-6 grid w-full grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-bakery-pink/20 to-bakery-pink/10 p-5 border border-bakery-pink/20">
                    <Clock className="mx-auto mb-3 h-8 w-8 text-bakery-pink-deep" />
                    <p className="text-xs text-muted-foreground font-semibold">Estimated Time</p>
                    <p className="text-lg font-bold text-bakery-chocolate mt-1">30-45 mins</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-bakery-green/10 to-bakery-matcha/10 p-5 border border-bakery-green/20">
                    <Package className="mx-auto mb-3 h-8 w-8 text-bakery-green" />
                    <p className="text-xs text-muted-foreground font-semibold">Items</p>
                    <p className="text-lg font-bold text-bakery-chocolate mt-1">{getItemCount()} cookies</p>
                  </div>
                </div>

                <div className="mb-8 w-full rounded-2xl border-2 border-dashed border-bakery-pink/30 p-5 bg-white/50">
                  <p className="text-sm text-muted-foreground font-semibold">Delivering to</p>
                  <p className="font-bold text-bakery-chocolate text-lg mt-1">{customerDetails.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{customerDetails.address}</p>
                </div>

                <Button
                  onClick={handleCompleteOrder}
                  className="w-full gap-2 bg-gradient-to-r from-bakery-green to-bakery-matcha py-7 font-bold text-white shadow-xl shadow-bakery-green/30 btn-press transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                  size="lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
