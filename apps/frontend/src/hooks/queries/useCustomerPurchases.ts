import { useQuery } from '@tanstack/react-query'
import { fetchCustomerPurchases } from '@/apis'

export default function useCustomerPurchases(customerId: number) {
  return useQuery({
    queryKey: ['customerPurchases', customerId],
    queryFn: () => fetchCustomerPurchases(customerId),
    enabled: customerId !== null,
  })
}
