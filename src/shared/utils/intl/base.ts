export type NumberFormat = Intl.NumberFormat
export type DateTimeFormat = Intl.DateTimeFormat
export type NumberFormatPart = Intl.NumberFormatPart
export type NumberRangeFormatPart = Intl.NumberRangeFormatPart

export abstract class AbstractNumberFormat implements NumberFormat {
  public formatRange(): string {
    throw new Error('Method not implemented.')
  }

  public formatRangeToParts(_start: number | bigint, _end: number | bigint): Intl.NumberRangeFormatPart[] {
    throw new Error('Method not implemented.')
  }

  public formatToParts(): Intl.NumberFormatPart[] {
    throw new Error('Method not implemented.')
  }

  public resolvedOptions(): Intl.ResolvedNumberFormatOptions {
    throw new Error('Method not implemented.')
  }

  public abstract format(value: number): string
}
