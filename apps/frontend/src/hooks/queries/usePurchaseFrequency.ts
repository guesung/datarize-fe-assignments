import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchPurchaseFrequency } from '@/apis'

export default function usePurchaseFrequency(from?: string, to?: string) {
  return useSuspenseQuery({
    queryKey: ['purchaseFrequency', from, to],
    queryFn: () => fetchPurchaseFrequency(from, to),
  })
}
