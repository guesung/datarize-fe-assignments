import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchCustomerPurchases } from '@/apis'

export default function useCustomerPurchases(customerId: number) {
  return useSuspenseQuery({
    queryKey: ['customerPurchases', customerId],
    queryFn: () => fetchCustomerPurchases(customerId),
  })
}
