import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { usePurchaseFrequency } from '@/hooks'
import { formatPriceRange } from '@/utils'

interface PurchaseFrequencyChartContentProps {
  fromDate: string
  toDate: string
}

export default function PurchaseFrequencyChartContent({ fromDate, toDate }: PurchaseFrequencyChartContentProps) {
  const { data } = usePurchaseFrequency(fromDate, toDate)

  const chartData = data?.map((item) => ({
    ...item,
    label: formatPriceRange(item.range),
  }))

  if (!chartData || chartData.length === 0) {
    return <p className="text-center text-gray-500 py-8">데이터가 없습니다.</p>
  }

  return (
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
  )
}
