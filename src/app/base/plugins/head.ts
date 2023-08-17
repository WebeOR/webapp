import { createHead } from '@vueuse/head'

import { type UserPlugin } from 'src/types'

// Setup @vueuse/head
export const install: UserPlugin = (app) => {
  const head = createHead()
  app.use(head)
}
