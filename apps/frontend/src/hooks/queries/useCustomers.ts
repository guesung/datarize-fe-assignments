import { useSuspenseQuery } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { fetchCustomers } from '@/apis'
import type { Customer } from '@/types'

export default function useCustomers(sortBy?: string, name?: string) {
  return useSuspenseQuery({
    queryKey: ['customers', sortBy, name],
    queryFn: async (): Promise<Customer[]> => {
      try {
        return await fetchCustomers(sortBy, name)
      } catch (error) {
        if (error instanceof HTTPError && error.response.status === 404) {
          return []
        }
        throw error
      }
    },
  })
}
