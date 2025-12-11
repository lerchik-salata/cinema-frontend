export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],

  // Эти настройки нужны для локальной разработки, но не для GitHub Pages
  // devServer: { port: 3001, host: "0.0.0.0" },

  app: {
    baseURL: "/cinema-frontend/",
    buildAssetsDir: "assets",
  },

  ssr: false,

  runtimeConfig: {
    public: {
      apiBase: "https://cinema-api-lerchik.onrender.com",
    },
  },
});
