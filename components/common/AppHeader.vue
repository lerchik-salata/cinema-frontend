<template>
  <header class="main-header">
    <div class="header-content">
      <NuxtLink to="/" class="app-logo">Movie Aggregator</NuxtLink>
      
      <nav v-if="isAuth" class="nav-menu">
        <NuxtLink v-if="isAdmin" to="/admin" class="nav-link nav-link-admin">Адмінка</NuxtLink>
        
        <NuxtLink to="/profile" class="nav-link">Профіль</NuxtLink>
        <button @click="logout" class="logout-button">Вийти</button>
      </nav>
      
      <nav v-else class="nav-menu">
        <NuxtLink to="/login" class="nav-link">Увійти</NuxtLink>
        <NuxtLink to="/register" class="nav-link nav-link-primary">Реєстрація</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
    authStore.initializeStore();
});

async function logout() {
    authStore.clearAuth();
    await navigateTo('/login', { replace: true });
}
const isAuth = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);
</script>

<style scoped>
.main-header {
  background-color: #1a202c; 
  padding: 16px 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.app-logo {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
}
.nav-menu {
  display: flex;
  gap: 20px;
  align-items: center;
}
.nav-link {
  color: #a0aec0;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #ffffff;
}
.nav-link-primary {
  background-color: #0284c7;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
}
.logout-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #a0aec0;
  font-size: 16px;
  transition: color 0.2s;
  padding: 0;
}
.logout-button:hover {
  color: #ff6347; 
}

.nav-link-admin {
    background-color: #f59e0b;
    color: #1a202c !important; 
    padding: 8px 12px;
    border-radius: 6px;
    font-weight: 600;
}
</style>