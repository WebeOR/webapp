import type { DeepPartial, Integer, Keys } from 'src/types/scalars'

export interface ApiPaginationParams<T = any> {
  page: Integer
  size: Integer
  sort?: Array<Keys<T>>
}

export interface ApiPaginationResponse<T = any> {
  content: T[]
  totalPages: number
  totalElements: number
  size: number
  numberOfElements: number
}
