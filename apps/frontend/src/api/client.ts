import ky from 'ky';
import type { PurchaseFrequency, Customer, CustomerPurchase } from '../types';

const api = ky.create({
  prefixUrl: '/api',
});

// 가격대별 구매 빈도 조회
export async function fetchPurchaseFrequency(from?: string, to?: string): Promise<PurchaseFrequency[]> {
  const searchParams: Record<string, string> = {};
  if (from && to) {
    searchParams.from = from;
    searchParams.to = to;
  }
  return api.get('purchase-frequency', { searchParams }).json();
}

// 고객 목록 조회
export async function fetchCustomers(sortBy?: string, name?: string): Promise<Customer[]> {
  const searchParams: Record<string, string> = {};
  if (sortBy) searchParams.sortBy = sortBy;
  if (name) searchParams.name = name;
  return api.get('customers', { searchParams }).json();
}

// 고객 구매 내역 조회
export async function fetchCustomerPurchases(customerId: number): Promise<CustomerPurchase[]> {
  return api.get(`customers/${customerId}/purchases`).json();
}
