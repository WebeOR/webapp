import type { DateTimeFormat, NumberFormat } from './base'
import * as formatters from './formatters'

export interface Formatters {
  integer: NumberFormat
  float: NumberFormat
  precise: NumberFormat
  money: NumberFormat
  prettyMoney: NumberFormat
  percent: NumberFormat
  intPercent: NumberFormat
  floatPercent: NumberFormat
  precisedPercent: NumberFormat
  dateDefault: DateTimeFormat
  dateDetailed: DateTimeFormat
  dateShort: DateTimeFormat
}

export default formatters
