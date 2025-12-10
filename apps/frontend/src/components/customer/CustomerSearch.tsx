import { useState, useEffect } from 'react'

interface CustomerSearchProps {
  onSearch: (name: string) => void
}

export function CustomerSearch({ onSearch }: CustomerSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)

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
