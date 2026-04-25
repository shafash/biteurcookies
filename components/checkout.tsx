'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  X, ArrowLeft, Check, CreditCard, Banknote, QrCode, 
  MapPin, Phone, User, Mail, ShoppingBag, ChevronRight,
  Sparkles, Clock, Package
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
    color: 'bg-bakery-green',
  },
  {
    id: 'transfer' as PaymentMethod,
    name: 'Bank Transfer',
    description: 'Transfer to our bank account',
    icon: CreditCard,
    color: 'bg-bakery-chocolate',
  },
  {
    id: 'qris' as PaymentMethod,
    name: 'QRIS',
    description: 'Scan QR code to pay',
    icon: QrCode,
    color: 'bg-bakery-pink-deep',
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
  const { items, getTotal, getItemCount, clearCart, getItemTotal } = useCartStore()
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
    handleCloseCheckout()
  }

  const isDetailsValid = customerDetails.name && customerDetails.phone && customerDetails.address

  if (!isOpen) {
    return (
      <Button
        onClick={handleOpenCheckout}
        disabled={items.length === 0}
        className="w-full gap-2 bg-bakery-green py-6 font-bold text-white shadow-xl shadow-bakery-green/30 transition-all hover:bg-bakery-green/90 hover:shadow-2xl hover:scale-[1.02] btn-press disabled:opacity-50 disabled:cursor-not-allowed"
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
        className="fixed inset-0 z-[60] bg-bakery-chocolate/80 backdrop-blur-md animate-fade-in"
        onClick={handleCloseCheckout}
      />

      {/* Checkout Modal */}
      <div className="fixed inset-4 z-[60] mx-auto max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-in md:inset-y-8">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="relative overflow-hidden border-b border-bakery-pink/30 px-6 py-5">
            <div className="absolute inset-0 bg-gradient-to-r from-bakery-green/10 via-bakery-cream to-bakery-pink/10" />
            <div className="absolute inset-0 texture-dots" />
            
            <div className="relative flex items-center justify-between">
              {step !== 'details' && step !== 'confirmation' ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep('details')}
                  className="h-10 w-10 rounded-full bg-white/80 shadow-sm hover:bg-white"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              ) : (
                <div className="h-10 w-10" />
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
                  className="h-10 w-10 rounded-full bg-white/80 shadow-sm hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              ) : (
                <div className="h-10 w-10" />
              )}
            </div>

            {/* Progress indicator */}
            {step !== 'confirmation' && (
              <div className="relative mt-4 flex gap-2">
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${step === 'details' || step === 'payment' ? 'bg-bakery-green' : 'bg-bakery-pink/30'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${step === 'payment' ? 'bg-bakery-green' : 'bg-bakery-pink/30'}`} />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Details Step */}
            {step === 'details' && (
              <form onSubmit={handleSubmitDetails} className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-bakery-chocolate">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="border-bakery-pink/30 focus:border-bakery-green focus:ring-bakery-green/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-bakery-chocolate">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="08123456789"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-bakery-pink/30 focus:border-bakery-green focus:ring-bakery-green/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-bakery-chocolate">
                      <Mail className="h-4 w-4" />
                      Email (Optional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                      className="border-bakery-pink/30 focus:border-bakery-green focus:ring-bakery-green/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2 text-bakery-chocolate">
                      <MapPin className="h-4 w-4" />
                      Delivery Address
                    </Label>
                    <textarea
                      id="address"
                      placeholder="Enter your full delivery address"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                      className="min-h-[100px] w-full rounded-lg border border-bakery-pink/30 bg-background px-3 py-2 text-sm focus:border-bakery-green focus:outline-none focus:ring-2 focus:ring-bakery-green/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-bakery-chocolate">
                      Order Notes (Optional)
                    </Label>
                    <Input
                      id="notes"
                      placeholder="Any special instructions?"
                      value={customerDetails.notes}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, notes: e.target.value }))}
                      className="border-bakery-pink/30 focus:border-bakery-green focus:ring-bakery-green/20"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6 rounded-2xl bg-bakery-cream/50 p-4">
                  <h3 className="mb-3 font-semibold text-bakery-chocolate">Order Summary</h3>
                  <div className="max-h-32 space-y-2 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.cookie.name}
                          {item.addOns.length > 0 && (
                            <span className="text-xs"> (+{item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''})</span>
                          )}
                        </span>
                        <span className="font-medium text-bakery-chocolate">{formatPrice(getItemTotal(item))}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-bakery-pink/30 pt-3">
                    <span className="font-semibold text-bakery-chocolate">Total ({getItemCount()} items)</span>
                    <span className="text-lg font-bold text-bakery-green">{formatPrice(getTotal())}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!isDetailsValid}
                  className="mt-6 w-full gap-2 bg-bakery-green py-6 font-bold text-white shadow-lg shadow-bakery-green/30 btn-press disabled:opacity-50"
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
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    const isSelected = selectedPayment === method.id
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-300 btn-press ${
                          isSelected
                            ? 'border-bakery-green bg-bakery-green/10 shadow-lg shadow-bakery-green/20'
                            : 'border-bakery-pink/30 bg-white hover:border-bakery-pink hover:bg-bakery-cream/30'
                        }`}
                      >
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${method.color} shadow-lg`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-bakery-chocolate">{method.name}</h3>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                          isSelected ? 'border-bakery-green bg-bakery-green' : 'border-muted-foreground/30'
                        }`}>
                          {isSelected && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Payment details based on selection */}
                {selectedPayment && (
                  <div className="mt-6 animate-slide-up rounded-2xl bg-bakery-cream/50 p-4">
                    {selectedPayment === 'cash' && (
                      <div className="text-center">
                        <Banknote className="mx-auto mb-3 h-12 w-12 text-bakery-green" />
                        <h3 className="font-bold text-bakery-chocolate">Cash on Delivery</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Please prepare exact amount of <span className="font-bold text-bakery-green">{formatPrice(getTotal())}</span> when the courier arrives.
                        </p>
                      </div>
                    )}
                    {selectedPayment === 'transfer' && (
                      <div className="text-center">
                        <CreditCard className="mx-auto mb-3 h-12 w-12 text-bakery-chocolate" />
                        <h3 className="font-bold text-bakery-chocolate">Bank Transfer</h3>
                        <div className="mt-3 rounded-xl bg-white p-3 text-left">
                          <p className="text-xs text-muted-foreground">Bank BCA</p>
                          <p className="font-mono text-lg font-bold text-bakery-chocolate">1234 5678 9012</p>
                          <p className="text-sm text-muted-foreground">a/n Bite Ur Cookies</p>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Transfer <span className="font-bold text-bakery-green">{formatPrice(getTotal())}</span> and send proof via WhatsApp
                        </p>
                      </div>
                    )}
                    {selectedPayment === 'qris' && (
                      <div className="text-center">
                        <QrCode className="mx-auto mb-3 h-12 w-12 text-bakery-pink-deep" />
                        <h3 className="font-bold text-bakery-chocolate">QRIS Payment</h3>
                        <div className="mx-auto mt-3 h-40 w-40 rounded-xl bg-white p-2 shadow-inner">
                          <div className="flex h-full w-full items-center justify-center rounded-lg bg-bakery-cream/50">
                            <p className="text-xs text-muted-foreground">QR Code will appear here</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Scan to pay <span className="font-bold text-bakery-green">{formatPrice(getTotal())}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Total and confirm */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-bakery-cream to-bakery-pink/20 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-bakery-chocolate">Total to Pay</span>
                    <span className="text-2xl font-bold text-bakery-green">{formatPrice(getTotal())}</span>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmOrder}
                  disabled={!selectedPayment || isSubmitting}
                  className="mt-6 w-full gap-2 bg-bakery-green py-6 font-bold text-white shadow-lg shadow-bakery-green/30 btn-press disabled:opacity-50"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
                <div className="relative mb-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-bakery-green shadow-xl shadow-bakery-green/30 animate-scale-in">
                    <Check className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -right-2 -top-2 animate-bounce-subtle">
                    <Sparkles className="h-8 w-8 text-bakery-gold" />
                  </div>
                </div>

                <h3 className="mb-2 font-serif text-2xl font-bold text-bakery-chocolate">
                  Order Confirmed!
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Your delicious cookies are being prepared
                </p>

                <div className="mb-6 w-full rounded-2xl bg-bakery-cream/50 p-4">
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono text-2xl font-bold text-bakery-green">{orderNumber}</p>
                </div>

                <div className="mb-6 grid w-full grid-cols-2 gap-4">
                  <div className="rounded-xl bg-bakery-pink/20 p-4">
                    <Clock className="mx-auto mb-2 h-6 w-6 text-bakery-pink-deep" />
                    <p className="text-xs text-muted-foreground">Estimated Time</p>
                    <p className="font-bold text-bakery-chocolate">30-45 mins</p>
                  </div>
                  <div className="rounded-xl bg-bakery-green/10 p-4">
                    <Package className="mx-auto mb-2 h-6 w-6 text-bakery-green" />
                    <p className="text-xs text-muted-foreground">Items</p>
                    <p className="font-bold text-bakery-chocolate">{getItemCount()} cookies</p>
                  </div>
                </div>

                <div className="mb-6 w-full rounded-2xl border-2 border-dashed border-bakery-pink/30 p-4">
                  <p className="text-sm text-muted-foreground">Delivering to</p>
                  <p className="font-medium text-bakery-chocolate">{customerDetails.name}</p>
                  <p className="text-sm text-muted-foreground">{customerDetails.address}</p>
                </div>

                <Button
                  onClick={handleCompleteOrder}
                  className="w-full gap-2 bg-bakery-green py-6 font-bold text-white shadow-lg shadow-bakery-green/30 btn-press"
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
