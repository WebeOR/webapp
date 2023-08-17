import type { QuasarLanguage } from 'quasar'
import ruRu from 'quasar/lang/ru'
import enUs from 'quasar/lang/en-US'

import { InjectKeyLocales } from '@shared/composables/symbols'

import type { UserPlugin } from 'src/types'

import { useAuthStore } from './stores/auth'

import Root from './Root.vue'

import './base/styles/main.scss'

const locales: Record<string, QuasarLanguage> = {
  'en-RU': ruRu,
  'en-US': enUs,
  'ru': ruRu,
}

function main(): void {
  const plugins = import.meta.glob<{ install: UserPlugin }>('./base/plugins/*.ts', { eager: true })

  const app = createApp(Root)

  Object
    .values(plugins)
    .forEach(i => i.install(app))

  app.provide(InjectKeyLocales, locales)

  useAuthStore().loadUserData()

  app.mount('#app')
}

main()
