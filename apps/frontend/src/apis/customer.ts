import { api } from './api'
import { CustomersPurchaseResponse, CustomersResponse } from './response'

export async function fetchCustomers(sortBy?: string, name?: string) {
  const searchParams = new URLSearchParams()

  if (sortBy) searchParams.set('sortBy', sortBy)
  if (name) searchParams.set('name', name)
  return api.get<CustomersResponse>('customers', { searchParams }).json()
}

export async function fetchCustomerPurchases(customerId: number) {
  return api.get<CustomersPurchaseResponse>(`customers/${customerId}/purchases`).json()
}
