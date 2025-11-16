<template>
  <div class="profile-page-container">
    <div v-if="loading" class="loading-message">Завантаження профілю...</div>
    
    <div v-else-if="profile" class="profile-card">
      <h1 class="profile-title">Ваш профіль</h1>
      
      <UserProfileDetails :profile="profile" />

      <UserProfileForm 
        :initial-profile="profile" 
        @profile-updated="handleProfileUpdate" 
      />
      
      <UserAccountActions />
    </div>

    <div v-else class="error-message-large">Не вдалося завантажити дані профілю.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMyProfile } from '~/api/user';
import type { UserResponseDto } from '~/types/user';

import UserProfileDetails from '~/components/user/UserProfileDetails.vue';
import UserProfileForm from '~/components/user/UserProfileForm.vue';
import UserAccountActions from '~/components/user/UserAccountActions.vue';


const profile = ref<UserResponseDto | null>(null);
const loading = ref(true);

async function fetchProfile() {
  try {
    const data = await getMyProfile();
    profile.value = data;
  } catch (e: any) {
    console.error("Error loading profile:", e);
    if (e.response?.status === 401) {
        localStorage.removeItem('accessToken');
        navigateTo('/login');
    }
  } finally {
    loading.value = false;
  }
}

function handleProfileUpdate(updatedData: UserResponseDto) {
    profile.value = updatedData;
}

onMounted(fetchProfile);

</script>

<style scoped>
.profile-page-container {
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: calc(100vh - 56px);
}
.profile-card {
  background-color: #ffffff;
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.profile-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 24px;
  border-bottom: 2px solid #edf2f7;
  padding-bottom: 10px;
}
.error-message-large {
  text-align: center;
  font-size: 20px;
  color: #e53e3e;
  margin-top: 50px;
}
.loading-message {
  text-align: center;
  font-size: 18px;
  color: #4a5568;
}
</style>