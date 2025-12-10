import { api } from './api'
import { CustomerPurchaseResponse, CustomerResponse } from './response'

export async function fetchCustomers(sortBy?: string, name?: string): Promise<CustomerResponse> {
  const searchParams = new URLSearchParams()
  if (sortBy) searchParams.set('sortBy', sortBy)
  if (name) searchParams.set('name', name)
  return api.get('customers', { searchParams }).json()
}

export async function fetchCustomerPurchases(customerId: number): Promise<CustomerPurchaseResponse> {
  return api.get(`customers/${customerId}/purchases`).json()
}
