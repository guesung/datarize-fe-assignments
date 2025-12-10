import ky from 'ky'
import { CustomerPurchaseResponse, CustomerResponse, PurchaseFrequencyResponse } from './type'

const api = ky.create({
  prefixUrl: '/api',
})

export async function fetchPurchaseFrequency(from?: string, to?: string): Promise<PurchaseFrequencyResponse> {
  const searchParams = new URLSearchParams()
  if (from) searchParams.set('from', from)
  if (to) searchParams.set('to', to)

  return api.get('purchase-frequency', { searchParams }).json()
}

export async function fetchCustomers(sortBy?: string, name?: string): Promise<CustomerResponse> {
  const searchParams = new URLSearchParams()
  if (sortBy) searchParams.set('sortBy', sortBy)
  if (name) searchParams.set('name', name)
  return api.get('customers', { searchParams }).json()
}

export async function fetchCustomerPurchases(customerId: number): Promise<CustomerPurchaseResponse> {
  return api.get(`customers/${customerId}/purchases`).json()
}
