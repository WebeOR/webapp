import { createPinia } from 'pinia'

import { type UserPlugin } from 'src/types'

// Setup Pinia
export const install: UserPlugin = (app) => {
  const pinia = createPinia()
  app.use(pinia)
}
