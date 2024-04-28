// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ui: { icons: ['lucide'] },
  modules: ['@nuxt/test-utils/module', '@nuxt/ui', '@pinia/nuxt'],
  devServer: {
    port: 8080,
  },
})
