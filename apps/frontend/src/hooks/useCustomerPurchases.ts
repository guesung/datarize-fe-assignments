import { useQuery } from '@tanstack/react-query'
import { fetchCustomerPurchases } from '../api/client'

export function useCustomerPurchases(customerId: number | null) {
  return useQuery({
    queryKey: ['customerPurchases', customerId],
    queryFn: () => fetchCustomerPurchases(customerId!),
    enabled: customerId !== null,
  })
}
