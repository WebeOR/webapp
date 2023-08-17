import { defineStore } from 'pinia'

import { dependencies, version } from '~/package.json'

export const useInterfaceStore = defineStore({
  actions: {
    toggleLeftDrawer(v?: boolean): void {
      this.isLeftDrawerOpened = v ?? !this.isLeftDrawerOpened
    },
    toggleRightDrawer(v?: boolean): void {
      this.isRightDrawerOpened = v ?? !this.isRightDrawerOpened
    },
  },

  getters: {
    appDependencies: () => dependencies,
    appVersion: () => version,
  },

  id: 'interface',

  state: () => ({
    isLeftDrawerOpened: true,
    isRightDrawerOpened: false,
    leftDrawerOpen: true,
  }),
})
