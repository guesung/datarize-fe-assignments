import { api } from './api'
import { PurchaseFrequencyResponse } from './type'

export async function fetchPurchaseFrequency(from?: string, to?: string): Promise<PurchaseFrequencyResponse> {
  const searchParams = new URLSearchParams()
  if (from) searchParams.set('from', from)
  if (to) searchParams.set('to', to)

  return api.get('purchase-frequency', { searchParams }).json()
}
