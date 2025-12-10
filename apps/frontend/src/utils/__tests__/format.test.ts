import { describe, it, expect } from 'vitest'
import { formatPriceRange, formatCurrency, formatDate } from '../format'

describe('formatPriceRange', () => {
  it('0 - 20000 범위를 "~2만원"으로 변환', () => {
    expect(formatPriceRange('0 - 20000')).toBe('~2만원')
  })

  it('20001 - 30000 범위를 "2~3만원"으로 변환', () => {
    expect(formatPriceRange('20001 - 30000')).toBe('2.0001~3만원')
  })

  it('30001 - 40000 범위를 "3~4만원"으로 변환', () => {
    expect(formatPriceRange('30001 - 40000')).toBe('3.0001~4만원')
  })

  it('90001 - 100000 범위를 "9~10만원"으로 변환', () => {
    expect(formatPriceRange('90001 - 100000')).toBe('9~10만원')
  })

  it('중간 가격대를 올바르게 변환', () => {
    expect(formatPriceRange('50001 - 60000')).toBe('5.0001~6만원')
    expect(formatPriceRange('70001 - 80000')).toBe('7.0001~8만원')
  })
})

describe('formatCurrency', () => {
  it('금액을 원화 형식으로 변환', () => {
    expect(formatCurrency(10000)).toBe('₩10,000')
    expect(formatCurrency(1500000)).toBe('₩1,500,000')
  })

  it('0원을 올바르게 변환', () => {
    expect(formatCurrency(0)).toBe('₩0')
  })
})

describe('formatDate', () => {
  it('ISO 날짜 문자열을 한국어 형식으로 변환', () => {
    const result = formatDate('2024-07-15')
    expect(result).toContain('2024')
    expect(result).toContain('7')
    expect(result).toContain('15')
  })
})
