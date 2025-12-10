import { useState, lazy, Suspense } from 'react'
import type { Customer } from '@/types'
import { PurchaseFrequencyChart } from './purchase-frequency-chart'
import { CustomerList } from './customer-list'
import { Loading } from '@/components'

const CustomerDetail = lazy(() => import('./customer-detail').then((module) => ({ default: module.CustomerDetail })))

export default function Dashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">쇼핑몰 구매 데이터 대시보드</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid gap-6">
          <PurchaseFrequencyChart />
          <CustomerList onCustomerSelect={setSelectedCustomer} />
        </div>
      </main>

      {selectedCustomer && (
        <Suspense fallback={<Loading />}>
          <CustomerDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
        </Suspense>
      )}
    </div>
  )
}
