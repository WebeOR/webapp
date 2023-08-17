<script setup lang="ts">
import { useMachine } from '@xstate/vue'

import { QDrawer } from 'quasar'

import AppLogo from '@app/base/components/AppLogo.vue'

import { AuthRoutes } from '@app/scopes/Auth'
import { useAuthStore } from '@app/stores/auth'

import { useFetchMachine } from '@shared/machines/fetch.machine'
import type { MenuSchema } from '@shared/models/menu.schema'

const { notify } = useQuasar()

const router = useRouter()
const authStore = useAuthStore()

const interfaceStore = useInterfaceStore()

const rightDrawer = shallowRef<QDrawer>()

const fetchMachine = useFetchMachine<MenuSchema>({} as MenuSchema, 'loading')

const { state, send } = useMachine(
  fetchMachine,
  {
    actions: {
      onFailure: (_, { data }) => notify({
        color: 'red-5',
        icon: 'warning',
        message: data.message,
        textColor: 'white',
      }),
    },

    services: {
      fetchFn(): Promise<MenuSchema> {
        return useSchema('menu')
      },
    },
  },
)

function onLogOut(): void {
  authStore.processSignOut()
  router.replace({ name: AuthRoutes.signIn })
}
</script>

<template>
  <q-layout
    view="hHh Lpr fFf"
    class="main-layout"
  >
    <q-header
      bordered
      class="app-header row"
      height-hint="48px"
    >
      <q-toolbar class="q-px-md-lg">
        <q-btn
          v-if="$q.screen.gt.xs && $q.screen.lt.lg"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="interfaceStore.toggleLeftDrawer()"
        />

        <AppLogo />

        <q-space />

        <q-btn-dropdown
          rounded
          unelevated
          auto-close
          color="primary"
          :label="authStore.user.username ?? ''"
        >
          <q-list padding>
            <q-item
              dense
              clickable
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

    <QDrawer
      bordered
      color="secondary"
      :overlay="$q.screen.lt.lg"
      :elevated="$q.screen.lt.lg"
      :model-value="$q.screen.gt.md || interfaceStore.isLeftDrawerOpened"
      @update:model-value="interfaceStore.toggleLeftDrawer"
    >
      <q-list
        v-if="state.value === 'success'"
        padding
        class="q-px-sm"
      >
        <q-item
          v-for="item in state.context.data.items"
          :key="item.key"
          v-ripple
          clickable
          class="rounded-borders"
          exact-active-class="text-bold"
          :to="{ name: item.route?.name }"
        >
          <q-item-section avatar>
            <q-icon :name="item.route?.meta.icon ?? 'code'" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t(item.key) }}</q-item-label>
            <q-item-label caption>
              {{ $t(`caption.${item.key}`) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list
        v-if="state.value === 'loading'"
        padding
        class="rounded-borders"
      >
        <q-item
          v-for="n in 5"
          :key="n"
          dense
          class="rounded-borders q-py-sm"
        >
          <q-item-section avatar>
            <q-skeleton
              type="QAvatar"
              size="36px"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton
                type="text"
                width="65%"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div
        v-if="state.value === 'failure'"
        class="column justify-center items-center full-height "
      >
        <h6
          class="text-red q-my-md text-center"
          v-text="state.context.error"
        />
        <q-btn
          unelevated
          color="primary"
          :label="$t('ui.retry')"
          @click="send('RETRY', { schema: 'menu' })"
        />
      </div>
    </QDrawer>

    <QDrawer
      ref="rightDrawer"
      overlay
      bordered
      elevated
      mini-to-overlay
      side="right"
      :width="960"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      :model-value="interfaceStore.isRightDrawerOpened"
      @update:model-value="interfaceStore.toggleRightDrawer"
    >
      <q-card-section id="right-bar" />
    </QDrawer>

    <q-page-container>
      <suspense>
        <router-view />
      </suspense>
    </q-page-container>

    <q-footer
      v-if="$q.screen.lt.sm"
      :height-hint="50"
    >
      <q-tabs
        v-if="state.value === 'success'"
        mobile-arrows
        align="justify"
        class="col-grow"
      >
        <q-route-tab
          v-for="item in state.context.data.items"
          :key="item.key"
          v-ripple
          clickable
          class="rounded-borders"
          exact-active-class="text-bold"
          :to="{ name: item.route?.name }"
          :icon="item.route?.meta.icon ?? 'code'"
        />
      </q-tabs>
    </q-footer>

    <q-footer
      v-else
      reveal
      :height-hint="60"
    >
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
</style>
