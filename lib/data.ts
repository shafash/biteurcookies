export interface Cookie {
  id: string
  name: string
  description: string
  price: number
  image: string
  color: string
  bgColor: string
  isLimitedStock: boolean
}

export interface AddOn {
  id: string
  name: string
  price: number
  icon: string
}

export const cookies: Cookie[] = [
  {
    id: 'chocolate',
    name: 'Chocolate',
    description: 'Rich dark chocolate with gooey melted chunks and a fudgy center',
    price: 6000,
    image: '/images/chocolate-cookie.jpg',
    color: '#4A3728',
    bgColor: '#F5E6D3',
    isLimitedStock: true,
  },
  {
    id: 'matcha',
    name: 'Matcha',
    description: 'Premium Japanese green tea with white chocolate and a soft center',
    price: 6000,
    image: '/images/matcha-cookie.jpg',
    color: '#4A7A3A',
    bgColor: '#E8F0E3',
    isLimitedStock: true,
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    description: 'Coffee-infused cookie with rich chocolate chips and mascarpone swirl',
    price: 6000,
    image: '/images/tiramisu-cookie.jpg',
    color: '#8B6914',
    bgColor: '#FFF8E7',
    isLimitedStock: false,
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    description: 'Classic red velvet with cream cheese filling and white chocolate chips',
    price: 6000,
    image: '/images/red-velvet-cookie.jpg',
    color: '#8B2942',
    bgColor: '#FFE8ED',
    isLimitedStock: true,
  },
]

export const addOns: AddOn[] = [
  {
    id: 'cream-cheese',
    name: 'Cream Cheese',
    price: 2000,
    icon: '🧀',
  },
  {
    id: 'melt-chocolate',
    name: 'Melt Milk Chocolate',
    price: 2000,
    icon: '🍫',
  },
]

export const formatPrice = (price: number): string => {
  return `${(price / 1000).toFixed(0)}K`
}
