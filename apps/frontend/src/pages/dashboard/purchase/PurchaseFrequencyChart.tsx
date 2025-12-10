import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { usePurchaseFrequency } from '@/hooks'
import { Loading, ErrorMessage, DateRangePicker } from '@/components/common'
import { formatPriceRange, getErrorMessage } from '@/utils'

const DEFAULT_FROM_DATE = '2024-07-01'
const DEFAULT_TO_DATE = '2024-07-31'

export default function PurchaseFrequencyChart() {
  const [fromDate, setFromDate] = useState(DEFAULT_FROM_DATE)
  const [toDate, setToDate] = useState(DEFAULT_TO_DATE)

  const { data, isLoading, isError, error, refetch } = usePurchaseFrequency(fromDate, toDate)

  const chartData = data?.map((item) => ({
    ...item,
    label: formatPriceRange(item.range),
  }))

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

      {isLoading && <Loading />}

      {isError && (
        <ErrorMessage message={getErrorMessage(error, '데이터를 불러오는데 실패했습니다.')} onRetry={refetch} />
      )}

      {chartData && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" angle={-45} textAnchor="end" interval={0} fontSize={12} />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value}건`, '구매 횟수']}
                labelFormatter={(label) => `가격대: ${label}`}
              />
              <Bar dataKey="count" fill="#3B82F6" name="구매 횟수" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
