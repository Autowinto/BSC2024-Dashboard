import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ui: { icons: ['lucide'] },
  modules: ['@nuxt/test-utils/module', '@nuxt/ui', '@pinia/nuxt'],
  devServer: {
    port: 8080,
  },
  runtimeConfig: {
    ENERGINET_REFRESH_TOKEN: process.env.ENERGINET_REFRESH_TOKEN,
  },
})
