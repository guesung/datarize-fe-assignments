export function formatPriceRange(range: string): string {
  const [min, max] = range.split(' - ').map(Number)

  if (min === 0) return '~2만원'
  if (max === 100000) return '9~10만원'
  return `${Math.round(min / 10000)}~${Math.round(max / 10000)}만원`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR')
}
