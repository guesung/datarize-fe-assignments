interface DateRangePickerProps {
  fromDate: string
  toDate: string
  onFromDateChange: (date: string) => void
  onToDateChange: (date: string) => void
}

export function DateRangePicker({ fromDate, toDate, onFromDateChange, onToDateChange }: DateRangePickerProps) {
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
          onChange={(e) => onFromDateChange(e.target.value)}
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
          onChange={(e) => onToDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}
