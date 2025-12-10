import { useState, useEffect } from 'react'

interface CustomerSearchProps {
  onSearch: (name: string) => void
}

/**
 * 고객 이름 검색 컴포넌트
 * - 입력값에 300ms 디바운스 적용하여 API 호출 최소화
 */
export function CustomerSearch({ onSearch }: CustomerSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // 디바운스: 입력 후 300ms 대기 후 검색 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)

    // 클린업: 새 입력 시 이전 타이머 취소
    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="고객 이름 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
