/**
 * 가격대 문자열을 사용자 친화적인 레이블로 변환
 * @param range - API 응답의 가격대 문자열 (예: "0 - 20000")
 * @returns 포맷팅된 레이블 (예: "~2만원")
 */
export function formatPriceRange(range: string): string {
  const [min, max] = range.split(' - ').map(Number);

  // 2만원 이하
  if (min === 0) return '~2만원';
  // 9~10만원 (마지막 구간)
  if (max === 100000) return '9~10만원';
  // 그 외 구간 (예: 2~3만원, 3~4만원, ...)
  return `${min / 10000}~${max / 10000}만원`;
}

/**
 * 금액을 한국 원화 형식으로 포맷팅
 * @param amount - 금액
 * @returns 포맷팅된 금액 문자열 (예: "₩10,000")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
}

/**
 * 날짜 문자열을 한국어 형식으로 포맷팅
 * @param dateString - ISO 날짜 문자열
 * @returns 포맷팅된 날짜 (예: "2024. 7. 1.")
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR');
}
