<script setup lang="ts">
import { useAuthStore } from '@app/stores/auth'

import { AuthRoutes } from '@app/scopes/Auth'

import AppLogo from '../components/AppLogo.vue'

const router = useRouter()

const authStore = useAuthStore()
const interfaceStore = useInterfaceStore()

function onLogOut(): void {
  authStore.processSignOut()
  router.push({ name: AuthRoutes.signIn })
}
</script>

<template>
  <q-layout
    view="hHh Lpr fFf"
    class="main-layout"
  >
    <q-header
      bordered
      height-hint="48px"
      class="app-header row"
    >
      <q-toolbar class="q-px-md-lg">
        <AppLogo />

        <q-space />

        <q-btn-dropdown
          rounded
          unelevated
          auto-close
          color="primary"
          label="qwdqwd"
        >
          <q-list padding>
            <q-item
              dense
              clickable
              class="digital-menu__product-link"
              @click="onLogOut"
            >
              <q-item-section>
                <q-item-label>{{ $t('auth.sign_out') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <suspense>
        <router-view />
      </suspense>
    </q-page-container>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>© ООО "ТОПКОМПЕТЕНС" 2020-{{ new Date().getFullYear() }}</q-toolbar-title>
        <q-space />
        <span
          v-if="$q.screen.gt.xs"
          class="app-header__version"
        >v{{ interfaceStore.appVersion }}</span>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
.app-header {
  .q-toolbar {
    height: 48px;
    min-height: 48px;
    padding: 0 10px;
    margin: 0 auto;
  }
}
.main-layout {
  background-color: var(--q-bg);
}
</style>
