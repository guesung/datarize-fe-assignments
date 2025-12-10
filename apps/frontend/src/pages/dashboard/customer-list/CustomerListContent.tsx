import { useCustomers } from '@/hooks'
import type { Customer } from '@/types'
import { formatCurrency } from '@/utils'
import { EmptyState } from '@/components'
import { SortOption } from './CustomerList'

interface CustomerListContentProps {
  sortBy: SortOption
  searchName: string
  onCustomerSelect: (customer: Customer) => void
}

export default function CustomerListContent({ sortBy, searchName, onCustomerSelect }: CustomerListContentProps) {
  const { data } = useCustomers(sortBy === 'id' ? undefined : sortBy, searchName || undefined)

  if (!data || data.length === 0) {
    return <EmptyState message="검색 결과가 없습니다." />
  }

  return (
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
  )
}
