export type SortBy = 'asc' | 'desc' | undefined

export const SORT_OPTIONS = ['id', 'asc', 'desc'] as const
export type SortOption = (typeof SORT_OPTIONS)[number]

export interface ApiError {
  error: string
}
