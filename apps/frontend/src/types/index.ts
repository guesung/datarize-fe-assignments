// API 응답 타입 정의

// 가격대별 구매 빈도
export interface PurchaseFrequency {
  range: string
  count: number
}

// 고객 목록
export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

// 고객 구매 내역
export interface CustomerPurchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}

// API 에러 응답
export interface ApiError {
  error: string
}

// 정렬 옵션
export type SortBy = 'asc' | 'desc' | undefined
