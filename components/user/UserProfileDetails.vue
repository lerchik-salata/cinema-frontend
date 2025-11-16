<template>
  <section class="profile-details">
    <div class="detail-row">
      <span class="detail-label">Ім'я користувача:</span>
      <span class="detail-value">{{ profile.username }}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Email:</span>
      <span class="detail-value">{{ profile.email }}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Роль:</span>
      <span class="detail-value role-badge">{{ profile.role.toUpperCase() }}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Створено:</span>
      <span class="detail-value">{{ new Date(profile.createdAt).toLocaleDateString() }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { UserResponseDto } from '~/types/user';

const props = defineProps<{
  profile: UserResponseDto;
}>();
</script>

<style scoped>
.profile-details {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.detail-row {
  display: flex;
  margin-bottom: 10px;
  font-size: 16px;
}
.detail-label {
  font-weight: 600;
  color: #4a5568;
  width: 150px;
}
.detail-value {
  color: #1a202c;
}
.role-badge {
  background-color: #38a169;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}
</style>