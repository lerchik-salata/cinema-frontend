<template>
  <div class="admin-page-container">
    <div class="admin-card">
      <h1 class="admin-title">Панель адміністратора</h1>
      
      <nav class="entity-nav">
        <button 
          @click="activeTab = 'users'" 
          :class="{ 'active': activeTab === 'users' }" 
          class="nav-tab"
        >
          Користувачі
        </button>
        <button 
          @click="activeTab = 'forums'" 
          :class="{ 'active': activeTab === 'forums' }" 
          class="nav-tab"
        >
          Форум (Пости)
        </button>
      </nav>

      <hr class="separator">

      <AdminUsersTable v-if="activeTab === 'users'" />
      <AdminForumsTable v-else-if="activeTab === 'forums'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  middleware: [
    (to, from) => {
      if (process.client && localStorage.getItem('userRole') !== 'admin') {
        alert('Доступ заборонено: потрібні права адміністратора.');
        return navigateTo('/', { replace: true }); 
      }
    }
  ]
});

const activeTab = ref<'users' | 'forums'>('users');

</script>

<style scoped>
.admin-page-container {
  padding: 40px 20px;
  background-color: #f3f4f6;
  min-height: calc(100vh - 56px);
}
.admin-card {
  background-color: #ffffff;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.admin-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 24px;
}
.entity-nav {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
}
.nav-tab {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s, border-bottom 0.2s;
  margin-bottom: -2px; 
}
.nav-tab.active {
  color: #0284c7;
  border-bottom: 3px solid #0284c7;
}
.separator {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin-bottom: 20px;
}
</style>