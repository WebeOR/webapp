import {
  AppFullscreen,
  Dark,
  Dialog,
  Notify,
  Quasar,
  type QuasarPluginOptions,
} from 'quasar'

import type { UserPlugin } from 'src/types'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'

import '@quasar/extras/animate/fadeIn.css'
import '@quasar/extras/animate/fadeOut.css'

// Import Quasar CSS
import 'quasar/src/css/index.sass'

const quasarOptions: Partial<QuasarPluginOptions> = {
  config: {
    brand: {
      primary: '#1D4CA9',
      secondary: '#678BE5',
    },
    // default set of options for Notify Quasar plugin
    notify: {
      position: 'bottom-right',
      textColor: 'white',
    },
    // loading: {...}, // default set of options for Loading Quasar plugin
    // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  },
  // import Quasar plugins and add here
  plugins: {
    AppFullscreen,
    Dark,
    Dialog,
    Notify,
  },
}

export const install: UserPlugin = app => app.use(Quasar, quasarOptions)
