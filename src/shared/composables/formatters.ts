import type { Keys } from 'src/types/scalars'

import type { Formatters } from '../utils/intl'
import type { DateTimeFormat, NumberFormat } from '../utils/intl/base'

export function useFormatters(): Formatters {
  const vm = getCurrentInstance()?.proxy
  if (!vm) {
    throw new ReferenceError(
      'Vue instance not found.\n'
      + 'It looks like you trying to useFormatters() outside setup() function',
    )
  }
  return vm.$formatters
}

export function useFormatter(name: Keys<Formatters>): DateTimeFormat | NumberFormat {
  const vm = getCurrentInstance()?.proxy
  if (!vm) {
    throw new ReferenceError(
      'Vue instance not found.\n'
      + `It looks like you trying to useFormatter('${name}') outside setup() function`,
    )
  }
  return vm.$formatters[name]
}
