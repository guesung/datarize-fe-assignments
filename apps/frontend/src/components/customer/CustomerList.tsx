import { useState, useCallback } from 'react'
import { useCustomers } from '@/hooks'
import { Loading, ErrorMessage } from '@/components/common'
import { CustomerSearch } from './CustomerSearch'
import type { Customer } from '@/types'

interface CustomerListProps {
  onCustomerSelect: (customer: Customer) => void
}

type SortOption = 'id' | 'asc' | 'desc'

export function CustomerList({ onCustomerSelect }: CustomerListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('id')
  const [searchName, setSearchName] = useState('')

  const { data, isLoading, isError, error, refetch } = useCustomers(
    sortBy === 'id' ? undefined : sortBy,
    searchName || undefined,
  )

  const handleSearch = useCallback((name: string) => {
    setSearchName(name)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">고객 목록</h2>

      <CustomerSearch onSearch={handleSearch} />

      <div className="mb-4 flex gap-2">
        <span className="text-sm text-gray-600 self-center">정렬:</span>
        {(['id', 'desc', 'asc'] as const).map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`px-3 py-1 text-sm rounded ${
              sortBy === option ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option === 'id' ? 'ID순' : option === 'desc' ? '구매금액 높은순' : '구매금액 낮은순'}
          </button>
        ))}
      </div>

      {isLoading && <Loading />}

      {isError && (
        <ErrorMessage
          message={error instanceof Error ? error.message : '고객 목록을 불러오는데 실패했습니다.'}
          onRetry={() => refetch()}
        />
      )}

      {data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 구매 횟수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 구매 금액
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => onCustomerSelect(customer)}
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.count}회</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(customer.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data && data.length === 0 && <p className="text-center text-gray-500 py-8">검색 결과가 없습니다.</p>}
    </div>
  )
}
