import { useQuery } from '@tanstack/react-query'
import { fetchPurchaseFrequency } from '@/api'

export function usePurchaseFrequency(from?: string, to?: string) {
  return useQuery({
    queryKey: ['purchaseFrequency', from, to],
    queryFn: () => fetchPurchaseFrequency(from, to),
  })
}
