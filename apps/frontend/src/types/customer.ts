export interface PurchaseFrequency {
  range: string
  count: number
}

export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface CustomerPurchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}

export interface ApiError {
  error: string
}

export type SortBy = 'asc' | 'desc' | undefined
