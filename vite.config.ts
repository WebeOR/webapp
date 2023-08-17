import path from 'node:path'

import Vue from '@vitejs/plugin-vue'
import i18n from '@intlify/unplugin-vue-i18n/vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import { defineConfig } from 'vite'

import Layouts from 'vite-plugin-vue-layouts'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      script: { propsDestructure: true },
      template: { transformAssetUrls },
    }),

    quasar({
      autoImportComponentCase: 'kebab',
      sassVariables: 'src/app/base/styles/quasar-variables.scss',
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      defaultLayout: 'MainLayout',
      importMode: () => 'async',
      layoutsDirs: [
        'src/app/base/layouts',
      ],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      dirs: [
        'src/shared/composables',
        'src/shared/stores',
      ],
      dts: 'src/shims/auto-imports.d.ts',
      imports: [
        '@vueuse/core',
        '@vueuse/head',
        'pinia',
        'quasar',
        'vue-i18n',
        'vue-router',
        'vue',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: [
        'src/shared/components',
      ],

      dts: 'src/shims/components.d.ts',

      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    i18n({
      compositionOnly: true,
      include: [path.resolve(__dirname, 'src/locales/**')],
      runtimeOnly: true,
    }),

    chunkSplitPlugin({
      customChunk: (args) => {
        // files into pages directory is export in single files
        const { file } = args
        if (file.startsWith('src/app/scopes/'))
          return file.split('/')[3].replace(/\.[^.$]+$/, '')
        if (file.endsWith('.json'))
          return file.split('/')[1]?.replace(/\.[^.$]+$/, '') ?? file.split('/')[1]
        return null
      },
      customSplitting: {
        framework: [
          '@vueuse/core',
          '@vueuse/head',
          'pinia',
          'vue-demi',
          'vue-i18n',
          'vue-router',
          'vue',
        ],
      },
      strategy: 'default',
    }),
  ],

  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@app/': `${path.resolve(__dirname, 'src', 'app')}/`,
      '@base/': `${path.resolve(__dirname, 'src', 'app', 'base')}/`,
      '@schemas': `${path.resolve(__dirname, 'schemas')}/`,
      '@scopes/': `${path.resolve(__dirname, 'src', 'app', 'scopes')}/`,
      '@shared/': `${path.resolve(__dirname, 'src', 'shared')}/`,
      '@utils/': `${path.resolve(__dirname, 'src', 'shared', 'utils')}/`,
      'src/': `${path.resolve(__dirname, 'src')}/`,
      '~/': `${path.resolve(__dirname)}/`,
    },
  },
})
