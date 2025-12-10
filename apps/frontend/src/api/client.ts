import ky from 'ky';
import type { PurchaseFrequency, Customer, CustomerPurchase } from '../types';

/**
 * API 클라이언트 인스턴스
 * - 기본 URL: /api (Vite 프록시를 통해 백엔드 서버로 전달)
 */
const api = ky.create({
  prefixUrl: '/api',
});

/**
 * 가격대별 구매 빈도 조회
 * @param from - 시작 날짜 (ISO 8601 형식, optional)
 * @param to - 종료 날짜 (ISO 8601 형식, optional)
 * @returns 가격대별 구매 빈도 배열
 */
export async function fetchPurchaseFrequency(from?: string, to?: string): Promise<PurchaseFrequency[]> {
  const searchParams: Record<string, string> = {};
  if (from && to) {
    searchParams.from = from;
    searchParams.to = to;
  }
  return api.get('purchase-frequency', { searchParams }).json();
}

/**
 * 고객 목록 조회
 * @param sortBy - 정렬 기준 ('asc' | 'desc', optional)
 * @param name - 이름 검색어 (optional)
 * @returns 고객 목록 배열
 */
export async function fetchCustomers(sortBy?: string, name?: string): Promise<Customer[]> {
  const searchParams: Record<string, string> = {};
  if (sortBy) searchParams.sortBy = sortBy;
  if (name) searchParams.name = name;
  return api.get('customers', { searchParams }).json();
}

/**
 * 특정 고객의 구매 내역 조회
 * @param customerId - 고객 ID
 * @returns 구매 내역 배열
 */
export async function fetchCustomerPurchases(customerId: number): Promise<CustomerPurchase[]> {
  return api.get(`customers/${customerId}/purchases`).json();
}
