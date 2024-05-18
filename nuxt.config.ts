import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ui: { icons: ['lucide'] },
  modules: ['@nuxt/test-utils/module', '@nuxt/ui', '@pinia/nuxt'],
  devServer: {
    port: 8080,
  },
  runtimeConfig: {
    API_URL: process.env.API_URL ?? '127.0.0.1:3000',
  },
})
