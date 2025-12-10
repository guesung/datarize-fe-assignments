import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { usePurchaseFrequency } from '@/hooks'
import { formatPriceRange } from '@/utils'
import { EmptyState } from '@/components'

interface PurchaseFrequencyChartContentProps {
  fromDate: string
  toDate: string
}

const CHART_MARGIN = { top: 20, right: 30, left: 20, bottom: 60 }
const CHART_COLORS = {
  bar: '#3B82F6',
} as const

export default function PurchaseFrequencyChartContent({ fromDate, toDate }: PurchaseFrequencyChartContentProps) {
  const { data } = usePurchaseFrequency(fromDate, toDate)

  const chartData = data?.map((item) => ({
    ...item,
    label: formatPriceRange(item.range),
  }))

  if (!chartData || chartData.length === 0) {
    return <EmptyState message="데이터가 없습니다." />
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={CHART_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" angle={-45} textAnchor="end" interval={0} fontSize={12} />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value}건`, '구매 횟수']}
            labelFormatter={(label) => `가격대: ${label}`}
          />
          <Bar dataKey="count" fill={CHART_COLORS.bar} name="구매 횟수" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
