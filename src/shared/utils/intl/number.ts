import type { NumberFormat, NumberRangeFormatPart } from './base'

export abstract class AbstractNumberFormat implements NumberFormat {
  public abstract formatToParts(): Intl.NumberFormatPart[]

  public abstract resolvedOptions(): Intl.ResolvedNumberFormatOptions

  public abstract format(value: number): string

  public abstract formatRange(startDate: number | bigint, endDate: number | bigint): string

  public abstract formatRangeToParts(startDate: number | bigint, endDate: number | bigint): NumberRangeFormatPart[]
}
