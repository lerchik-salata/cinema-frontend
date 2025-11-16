// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],

  devServer: {
    port: 3001,
    host: "0.0.0.0",
  },

  routeRules: {
    "/api/**": {
      proxy: "http://localhost:3000/**",
    },
  },
});
