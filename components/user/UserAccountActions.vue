<template>
  <section class="actions-section">
    <h2 class="actions-title">Керування акаунтом</h2>
    <p class="actions-description">Видалення облікового запису є незворотньою дією.</p>
    <button @click="handleDelete" class="delete-button">Видалити акаунт</button>
  </section>
</template>

<script setup lang="ts">
import { deleteMyProfile } from '~/api/user';

async function handleDelete() {
    if (window.confirm("Ви впевнені, що хочете видалити свій обліковий запис? Цю дію не можна скасувати.")) {
        try {
            await deleteMyProfile();
            if (process.client) {
              localStorage.removeItem('accessToken');
            }
            await navigateTo('/login', { replace: true });
        } catch (e) {
            alert("Помилка видалення акаунту.");
        }
    }
}
</script>

<style scoped>
.actions-section {
    border-top: 1px solid #e2e8f0;
    padding-top: 20px;
    margin-top: 30px;
}
.actions-title {
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 5px;
}
.actions-description {
    font-size: 14px;
    color: #718096;
    margin-bottom: 15px;
}
.delete-button {
  background-color: #e53e3e;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}
.delete-button:hover {
  background-color: #c53030;
}
</style>