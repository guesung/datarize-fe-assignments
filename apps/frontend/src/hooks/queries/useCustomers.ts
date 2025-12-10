import { fetchCustomers } from '@/apis'
import { useSuspenseQuery } from '@tanstack/react-query'
import { HTTPError } from 'ky'

export default function useCustomers(sortBy?: string, name?: string) {
  return useSuspenseQuery({
    queryKey: ['customers', sortBy, name],
    queryFn: async () => {
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
