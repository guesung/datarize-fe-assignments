import { Suspense, useState } from 'react'
import { PurchaseFrequencyChart } from './components/chart'
import { ErrorBoundary, Loading } from './components/common'
import { CustomerDetail, CustomerList } from './components/customer'
import type { Customer } from './types'

function App() {
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
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <PurchaseFrequencyChart />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <CustomerList onCustomerSelect={setSelectedCustomer} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      {selectedCustomer && (
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <CustomerDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}

export default App
