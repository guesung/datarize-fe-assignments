import { Suspense, useState, useCallback } from 'react'
import { ErrorBoundary, Loading } from '@/components'
import CustomerSearch from './CustomerSearch'
import CustomerListContent from './CustomerListContent'
import type { Customer, SortOption } from '@/types'
import { SORT_OPTIONS } from '@/types'

interface CustomerListProps {
  onCustomerSelect: (customer: Customer) => void
}

const SORT_LABELS: Record<SortOption, string> = {
  id: 'ID순',
  asc: '구매금액 낮은순',
  desc: '구매금액 높은순',
}

export default function CustomerList({ onCustomerSelect }: CustomerListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('id')
  const [searchName, setSearchName] = useState('')

  const handleSearch = useCallback((name: string) => {
    setSearchName(name)
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">고객 목록</h2>

      <CustomerSearch onSearch={handleSearch} />

      <div className="mb-4 flex gap-2">
        <span className="text-sm text-gray-600 self-center">정렬:</span>
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`px-3 py-1 text-sm rounded ${
              sortBy === option ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {SORT_LABELS[option]}
          </button>
        ))}
      </div>

      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <CustomerListContent sortBy={sortBy} searchName={searchName} onCustomerSelect={onCustomerSelect} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
