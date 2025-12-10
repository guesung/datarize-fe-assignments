interface DateRangePickerProps {
  fromDate: string
  toDate: string
  onFromDateChange: (date: string) => void
  onToDateChange: (date: string) => void
}

export function DateRangePicker({ fromDate, toDate, onFromDateChange, onToDateChange }: DateRangePickerProps) {
  const handleFromDateChange = (date: string) => {
    // 시작일이 종료일보다 늦으면 종료일을 시작일로 자동 조정
    if (date > toDate) {
      onToDateChange(date)
    }
    onFromDateChange(date)
  }

  const handleToDateChange = (date: string) => {
    // 종료일이 시작일보다 빠르면 시작일을 종료일로 자동 조정
    if (date < fromDate) {
      onFromDateChange(date)
    }
    onToDateChange(date)
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <label htmlFor="from-date" className="text-sm font-medium text-gray-700">
          시작일
        </label>
        <input
          type="date"
          id="from-date"
          value={fromDate}
          max={toDate}
          onChange={(e) => handleFromDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="to-date" className="text-sm font-medium text-gray-700">
          종료일
        </label>
        <input
          type="date"
          id="to-date"
          value={toDate}
          min={fromDate}
          onChange={(e) => handleToDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}
