import { useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { fetchCustomers } from '../api/client';
import type { Customer } from '../types';

/**
 * 고객 목록 조회 훅
 * - 404 에러(검색 결과 없음)를 빈 배열로 처리
 */
export function useCustomers(sortBy?: string, name?: string) {
  return useQuery({
    queryKey: ['customers', sortBy, name],
    queryFn: async (): Promise<Customer[]> => {
      try {
        return await fetchCustomers(sortBy, name);
      } catch (error) {
        // 404 에러는 검색 결과 없음으로 처리
        if (error instanceof HTTPError && error.response.status === 404) {
          return [];
        }
        throw error;
      }
    },
  });
}
