export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ["/login", "/register"];

  const requiresAuth = !publicRoutes.includes(to.path);

  if (import.meta.client) {
    const token = localStorage.getItem("accessToken");

    if (requiresAuth && !token) {
      return navigateTo("/login");
    }

    if ((to.path === "/login" || to.path === "/register") && token) {
      return navigateTo("/");
    }
  }
});
