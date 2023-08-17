import type { Maybe } from 'src/types/scalars'
import {
  AbstractNumberFormat,
  type NumberFormat,
} from './base'
import { integer } from './formatters'

interface PrettyMoneyFormatParam {
  threshold: number
  base: number
  suffix: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export class PrettyMoneyFormat extends AbstractNumberFormat {
  private readonly thresholds: PrettyMoneyFormatParam[]

  private readonly delegate: NumberFormat

  public constructor(thresholds: PrettyMoneyFormatParam[]) {
    super()
    this.thresholds = thresholds.sort((a, b) => b.threshold - a.threshold)
    this.delegate = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
      style: 'currency',
    })
  }

  public format(value: number): string {
    let threshold: Maybe<PrettyMoneyFormatParam>

    const absValue = Math.abs(value)

    for (const t of this.thresholds) {
      if (absValue >= t.threshold) {
        threshold = t
        break
      }
    }
    if (threshold !== undefined) {
      value /= threshold.base
      return `${this.delegate.format(value)}${threshold.suffix}`
    }

    return integer.format(value)
  }
}

export class CustomPrettyMoneyFormat extends AbstractNumberFormat {
  private readonly thresholds: PrettyMoneyFormatParam[]

  public constructor(thresholds: PrettyMoneyFormatParam[]) {
    super()
    this.thresholds = thresholds.sort((a, b) => b.threshold - a.threshold)
  }

  public format(value: number): string {
    let threshold: Maybe<PrettyMoneyFormatParam>

    const absValue = Math.abs(value)

    for (const t of this.thresholds) {
      if (absValue >= t.threshold) {
        threshold = t
        break
      }
    }
    if (threshold !== undefined) {
      const delegate = new Intl.NumberFormat('ru-RU', {
        compactDisplay: 'short',
        maximumFractionDigits: threshold.maximumFractionDigits,
        minimumFractionDigits: threshold.minimumFractionDigits,
      })

      value /= threshold.base
      return `${delegate.format(value)}${threshold.suffix}`
    }

    return integer.format(value)
  }
}
