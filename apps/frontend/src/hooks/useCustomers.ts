import { useQuery } from '@tanstack/react-query';
import { fetchCustomers } from '../api/client';

export function useCustomers(sortBy?: string, name?: string) {
  return useQuery({
    queryKey: ['customers', sortBy, name],
    queryFn: () => fetchCustomers(sortBy, name),
  });
}
