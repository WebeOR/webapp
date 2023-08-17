import type { QuasarLanguage } from 'quasar'
import type { InjectionKey } from 'vue'

export const InjectKeyLocales: InjectionKey<Record<string, QuasarLanguage>> = Symbol('locales')
