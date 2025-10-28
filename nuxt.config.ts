// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  server: {
    port: 3001, // фронт на 3001, бєк на 3000
    host: 'localhost',
  },

  routeRules: {
    '/api/**': {
      proxy: 'http://localhost:3000/**'
    }
  },
});
