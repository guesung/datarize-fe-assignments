import { SORT_OPTIONS } from '@/constants'

export type SortBy = 'asc' | 'desc' | undefined

export type SortOption = (typeof SORT_OPTIONS)[number]

export interface ApiError {
  error: string
}
