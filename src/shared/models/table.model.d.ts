import type { Integer, Keys } from 'src/types/scalars'

export interface QTableColumn<T = Record<string, any>> {
  index?: Integer
  /**
   * Unique id, identifies column, (used by pagination.sortBy, 'body-cell-[name]' slot, ...)
   */
  name?: string
  /**
   * Label for header
   */
  label?: string
  /**
   * Row Object property to determine value for this column or function which maps to the required property
   * @param row The current row being processed
   * @returns Value for this column
   */
  field?: Keys<T> | ((row: T) => any)
  /**
   * If we use visible-columns, this col will always be visible
   */
  required?: boolean
  /**
   * Horizontal alignment of cells in this column
   * Default value: right
   */
  align?: 'left' | 'right' | 'center'
  /**
   * Tell QTable you want this column sortable
   */
  sortable?: boolean
  /**
   * Compare function if you have some custom data or want a specific way to compare two rows
   * @param a Value of the first comparison term
   * @param b Value of the second comparison term
   * @param rowA Full Row object in which is contained the first term
   * @param rowB Full Row object in which is contained the second term
   * @returns Comparison result of term 'a' with term 'b'. Less than 0 when 'a' should come first; greater than 0 if 'b' should come first; equal to 0 if their position must not be changed with respect to each other
   */
  sort?: (a: T, b: T, rowA: T, rowB: T) => number
  /**
   * Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); Overrides the 'column-sort-order' prop
   * Default value: ad
   */
  sortOrder?: 'ad' | 'da'
  /**
   * Function you can apply to format your data
   * @param val Value of the cell
   * @param row Full Row object in which the cell is contained
   * @returns The resulting formatted value
   */
  format?: (val: any, row: T) => any
  /**
   * Style to apply on normal cells of the column
   * @param row The current row being processed
   */
  style?: string | ((row: T) => string)
  /**
   * Classes to add on normal cells of the column
   * @param row The current row being processed
   */
  classes?: string | ((row: T) => string)
  /**
   * Style to apply on header cells of the column
   */
  headerStyle?: string
  /**
   * Classes to add on header cells of the column
   */
  headerClasses?: string
}

type onRowAction<T = any> = (evt: Event, row: T, index: number) => void;

export type onRowClick<T = any> = onRowAction<T>

export type onRowContextmenu<T = any> = onRowAction<T>

export type FilterMethodType<C = any, R = any, T = string> = (
  rows: readonly R[],
  terms: T,
  cols: readonly C[],
  getCellValue: (col: C, row: R) => any
) => readonly R[]

interface OnTableRequestPayload<C = any, R = any> {
  /**
   * Pagination object
   */
  pagination: QTablePagination
  /**
   * String/Object to filter table with (the 'filter' prop)
   */
  filter?: string | any
  /**
   * Function to get a cell value
   * @param col Column name from column definitions
   * @param row The row object
   * @returns Parsed/Processed cell value
   */
  getCellValue?: (col: C, row: R) => any
}

export type OnTableRequestType<C = any, R = any, T = string> = (requestProp: OnTableRequestPayload<C, R>) => void

export interface QTablePagination<T = string> {
  /**
   * Column name (from column definition)
   */
  sortBy?: T
  /**
   * Is sorting in descending order?
   */
  descending?: boolean
  /**
   * Page number (1-based)
   */
  page: number
  /**
   * How many rows per page? 0 means Infinite
   */
  rowsPerPage: number
  /**
   * For server-side fetching only. How many total database rows are there to be added to the table. If set, causes the QTable to emit @request when data is required.
   */
  rowsNumber?: number
}
