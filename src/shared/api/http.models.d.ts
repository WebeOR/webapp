import type { Integer } from 'src/types/scalars'

export interface ApiPagination<T = any> {
  totalPages: Integer
  totalElements: Integer
  pageable: {
    pageNumber: Integer
    pageSize: Integer
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    paged: boolean
    unpaged: boolean
    offset: Integer
  }
  first: boolean
  last: boolean
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  number: Integer
  numberOfElements: Integer
  size: Integer
  content: T[]
  empty: boolean
}
