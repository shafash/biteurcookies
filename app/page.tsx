import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ProductGrid } from '@/components/product-grid'
import { AddOnsSection } from '@/components/add-ons'
import { StorageInfo } from '@/components/storage-info'
import { Footer } from '@/components/footer'
import { Cart } from '@/components/cart'
import { getCookies, getAddOns } from '@/lib/db'
import { AddOnsProvider } from '@/lib/add-ons-context'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [cookies, addOns] = await Promise.all([
    getCookies(),
    getAddOns()
  ])

  return (
    <AddOnsProvider addOns={addOns}>
      <Header />
      <main>
        <Hero />
        <ProductGrid cookies={cookies} />
        <AddOnsSection addOns={addOns} />
        <StorageInfo />
      </main>
      <Footer />
      <Cart />
    </AddOnsProvider>
  )
}
