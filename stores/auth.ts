import { defineStore } from "pinia";

interface AuthState {
  accessToken: string | null;
  userRole: "user" | "admin" | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: null,
    userRole: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isAdmin: (state) => state.userRole === "admin",
  },
  actions: {
    initializeStore() {
      if (import.meta.client) {
        this.accessToken = localStorage.getItem("accessToken");
        this.userRole = localStorage.getItem("userRole") as "user" | "admin" | null;
      }
    },

    setAuth(token: string, role: string) {
      if (import.meta.client) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userRole", role);
      }
      this.accessToken = token;
      this.userRole = role as "user" | "admin";
    },

    clearAuth() {
      if (import.meta.client) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
      }
      this.accessToken = null;
      this.userRole = null;
    },
  },
});
