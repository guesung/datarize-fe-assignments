import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { usePurchaseFrequency } from '../../hooks'
import { Loading, ErrorMessage, DateRangePicker } from '../common'
import { formatPriceRange } from '../../utils'

/**
 * 가격대별 구매 빈도 차트 컴포넌트
 * - 날짜 범위를 선택하여 해당 기간의 구매 데이터를 조회
 * - 바 차트로 각 가격대별 구매 횟수를 시각화
 */
export function PurchaseFrequencyChart() {
  // 기본값: 7월 한 달 (2024-07-01 ~ 2024-07-31)
  const [fromDate, setFromDate] = useState('2024-07-01')
  const [toDate, setToDate] = useState('2024-07-31')

  const { data, isLoading, isError, error, refetch } = usePurchaseFrequency(fromDate, toDate)

  // API 응답 데이터에 표시용 레이블 추가
  const chartData = data?.map((item) => ({
    ...item,
    label: formatPriceRange(item.range),
  }))

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">가격대별 구매 빈도</h2>

      {/* 날짜 범위 선택 (단일 날짜 조회 시 시작일과 종료일을 같게 설정) */}
      <div className="mb-6">
        <DateRangePicker
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
        />
      </div>

      {/* 로딩 상태 */}
      {isLoading && <Loading />}

      {/* 에러 상태 및 재시도 버튼 */}
      {isError && (
        <ErrorMessage
          message={error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'}
          onRetry={() => refetch()}
        />
      )}

      {/* 바 차트 */}
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
