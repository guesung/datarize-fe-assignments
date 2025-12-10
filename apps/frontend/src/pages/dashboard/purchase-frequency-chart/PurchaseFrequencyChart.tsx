import { Suspense, useState } from 'react'
import { ErrorBoundary, Loading, DateRangePicker } from '@/components/common'
import PurchaseFrequencyChartContent from '../purchase/PurchaseFrequencyChartContent'

const DEFAULT_FROM_DATE = '2024-07-01'
const DEFAULT_TO_DATE = '2024-07-31'

export default function PurchaseFrequencyChart() {
  const [fromDate, setFromDate] = useState(DEFAULT_FROM_DATE)
  const [toDate, setToDate] = useState(DEFAULT_TO_DATE)

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">가격대별 구매 빈도</h2>

      <div className="mb-6">
        <DateRangePicker
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
        />
      </div>

      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <PurchaseFrequencyChartContent fromDate={fromDate} toDate={toDate} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
