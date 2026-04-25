import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ProductGrid } from '@/components/product-grid'
import { AddOns } from '@/components/add-ons'
import { StorageInfo } from '@/components/storage-info'
import { Footer } from '@/components/footer'
import { Cart } from '@/components/cart'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <AddOns />
        <StorageInfo />
      </main>
      <Footer />
      <Cart />
    </>
  )
}
