import { createI18n } from 'vue-i18n'
import type { UserPlugin } from 'src/types'

import { firstOf, lastOf } from 'src/shared/utils/arrays'

// Import i18n resources
const locales = import.meta.glob<{ default: Record<string, any> }>('../../../locales/*.y(a)?ml', { eager: true })

// TODO: подгрузка и слияние ключей с бекенда
const messages = Object.fromEntries(
  Object.entries(locales)
    .map(([key, value]) => [firstOf(lastOf(key.split('/')).split('.')), value.default]),
)

export const install: UserPlugin = (app) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    messages,
  })

  app.use(i18n)
}
