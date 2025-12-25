import { ErrorBoundary, Loading } from '@/components'
import type { Customer } from '@/types'
import { Suspense, useCallback, useState, useTransition } from 'react'
import CustomerListContent from './CustomerListContent'
import CustomerSearch from './CustomerSearch'

interface CustomerListProps {
  onCustomerSelect: (customer: Customer) => void
}

const SORT_OPTIONS = ['id', 'asc', 'desc'] as const
export type SortOption = (typeof SORT_OPTIONS)[number]

const SORT_LABELS: Record<SortOption, string> = {
  id: 'ID순',
  asc: '구매금액 낮은순',
  desc: '구매금액 높은순',
}

export default function CustomerList({ onCustomerSelect }: CustomerListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('id')
  const [searchName, setSearchName] = useState('')
  const [, startTransition] = useTransition()

  const handleSortChange = (option: SortOption) => {
    startTransition(() => {
      setSortBy(option)
    })
  }

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
            onClick={() => handleSortChange(option)}
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
