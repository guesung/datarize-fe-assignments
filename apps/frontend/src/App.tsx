import { useState } from 'react'
import { PurchaseFrequencyChart, CustomerDetail, CustomerList } from '@/components'
import type { Customer } from '@/types'

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
          <PurchaseFrequencyChart />
          <CustomerList onCustomerSelect={setSelectedCustomer} />
        </div>
      </main>

      {selectedCustomer && <CustomerDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />}
    </div>
  )
}

export default App
