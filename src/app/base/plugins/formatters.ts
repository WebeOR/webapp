import type { UserPlugin } from 'src/types'

import type { Formatters } from 'src/shared/utils/intl'
import formatters from 'src/shared/utils/intl'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $formatters: Formatters
  }
}

export const install: UserPlugin = (app) => {
  app.config.globalProperties.$formatters = formatters
}
