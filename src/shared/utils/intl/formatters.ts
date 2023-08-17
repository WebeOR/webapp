import { CustomPrettyMoneyFormat } from './money'

export const money = new Intl.NumberFormat('ru-RU', {
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
  style: 'currency',
})

export const integer = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  style: 'decimal',
})

export const float = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: 'decimal',
  useGrouping: false,
})

export const precise = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 5,
  minimumFractionDigits: 0,
  style: 'decimal',
})

export const prettyMoney = new CustomPrettyMoneyFormat([
  {
    base: 1000,
    maximumFractionDigits: 0,
    suffix: 'K',
    threshold: 1000,
  },
  {
    base: 1_000_000,
    maximumFractionDigits: 1,
    suffix: 'M',
    threshold: 999_950,
  },
  {
    base: 1_000_000_000,
    maximumFractionDigits: 1,
    suffix: 'B',
    threshold: 999_950_000,
  },
])

export const percent = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: 'percent',
})

export const precisedPercent = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 4,
  minimumFractionDigits: 2,
  style: 'percent',
})

export const floatPercent = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
  style: 'percent',
})

export const intPercent = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  style: 'percent',
})

export const dateDefault = new Intl.DateTimeFormat('en-US', {
  month: '2-digit',
  year: 'numeric',
})

export const dateDetailed = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  hour: '2-digit',
  hour12: false,
  minute: '2-digit',
  month: '2-digit',
  second: '2-digit',
  year: 'numeric',
})

export const dateShort = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})
