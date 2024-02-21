// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/test-utils/module', '@nuxt/ui', '@nuxt/pinia'],
  devServer: {
    port: 8080,
  },
  colorMode: {
    preference: 'light',
  },

})
