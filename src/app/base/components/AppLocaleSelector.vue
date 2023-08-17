<script setup lang="ts">
import languages from 'quasar/lang/index.json'

import { upperCaseFirst } from '@shared/utils/strings'

const { lang } = useQuasar()
const locale = shallowRef(lang.isoName)

const locales = inject(InjectKeyLocales)!

const appLanguages = computed(() => languages.filter(v => Object.keys(locales).includes(v.isoName)))

const options = get(appLanguages).map(v => ({
  label: upperCaseFirst(v.nativeName),
  value: v.isoName,
}))

const { locale: appLocale } = useI18n()

watch(locale, (val) => {
  if (!locales)
    return
  lang.set(locales[val])
  set(appLocale, val)
})
</script>

<template>
  <q-select
    v-model="locale"
    dense
    borderless
    emit-value
    options-dense
    class="q-mx-sm"
    prefix="Language"
    :display-value="$t(locale)"
    :options="options"
  />
</template>
