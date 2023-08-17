<script setup lang="ts">
useHead({
  link: [
    {
      href: computed<string>(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
      rel: 'icon',
      type: 'image/svg+xml',
    },
  ],
  meta: [
    { content: 'webapp', name: 'description' },
    {
      content: computed<string>(() => isDark.value ? '#00aba9' : '#ffffff'),
      name: 'theme-color',
    },
  ],
  title: 'webapp',
})

const { locale } = useI18n()
const locales = inject(InjectKeyLocales)!

useQuasar().lang.set(locales[locale.value])
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>
