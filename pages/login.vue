<template>
  <div class="auth-page-container">
    <AuthForm 
      title="Увійти в систему" 
      :action="loginUser" 
      :is-register="false"
    />
    
    <NuxtLink to="/register" class="auth-link">
      Немає акаунту? Зареєструйтесь!
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { loginUser } from '~/api/auth';
</script>

<style scoped>
.auth-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 24px;
}

.auth-link {
  margin-top: 16px;
  font-size: 14px;
  color: #0284c7;
  font-weight: 500;
  transition: color 0.15s;
  text-decoration: none;
}

.auth-link:hover {
  color: #0369a1;
  text-decoration: underline;
}
</style>