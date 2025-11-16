<template>
  <div class="app-layout">
    <AppHeader /> 

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/common/AppHeader.vue';
</script>

<style>
html, body, #__nuxt {
  margin: 0;
  padding: 0;
  height: 100%;
}
body {
  font-family: Arial, sans-serif;
  background-color: #edf2f7;
}
</style>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1; 
}
</style>