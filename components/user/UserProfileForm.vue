<template>
  <section class="edit-section">
    <h2 class="edit-title">Редагувати профіль</h2>
    <form @submit.prevent="handleUpdate" class="edit-form">
      <div class="form-group">
        <label for="newUsername" class="input-label">Нове ім'я</label>
        <input 
          v-model="formData.username" 
          id="newUsername" 
          type="text" 
          required 
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="newEmail" class="input-label">Новий Email</label>
        <input 
          v-model="formData.email" 
          id="newEmail" 
          type="email" 
          required 
          class="input-field"
        />
      </div>
      
      <button type="submit" :disabled="isUpdating" class="submit-button">
        {{ isUpdating ? 'Оновлення...' : 'Зберегти зміни' }}
      </button>
    </form>
    
    <p v-if="updateError" class="message-error">{{ updateError }}</p>
    <p v-if="updateSuccess" class="message-success">Профіль успішно оновлено!</p>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { updateMyProfile } from '~/api/user';
import type { UserResponseDto, UpdateUserDto } from '~/types/user';

const props = defineProps<{
  initialProfile: UserResponseDto;
}>();

const emit = defineEmits(['profileUpdated']);

const isUpdating = ref(false);
const updateError = ref<string | null>(null);
const updateSuccess = ref(false);

const formData = reactive<UpdateUserDto>({
  username: props.initialProfile.username,
  email: props.initialProfile.email,
});

watch(() => props.initialProfile, (newProfile) => {
    formData.username = newProfile.username;
    formData.email = newProfile.email;
}, { deep: true });


async function handleUpdate() {
  const isChanged = formData.username !== props.initialProfile.username || formData.email !== props.initialProfile.email;

  if (!isChanged) {
      updateError.value = "Змін немає.";
      return;
  }

  isUpdating.value = true;
  updateError.value = null;
  updateSuccess.value = false;

  try {
    const updatedData = await updateMyProfile(formData);
    
    emit('profileUpdated', updatedData); 
    
    updateSuccess.value = true;
    setTimeout(() => updateSuccess.value = false, 3000);
  } catch (e: any) {
    updateError.value = e.response?.data?.message || "Помилка оновлення даних.";
  } finally {
    isUpdating.value = false;
  }
}
</script>

<style scoped>
.edit-section {
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
  margin-top: 20px;
}
.edit-title {
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 20px;
}
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 5px;
}
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
}
.submit-button {
  background-color: #0284c7;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.2s;
}
.submit-button:hover:not(:disabled) {
  background-color: #0369a1;
}

.message-success {
  color: #38a169;
  font-weight: 600;
  margin-top: 10px;
}
.message-error {
  color: #e53e3e;
  font-weight: 600;
  margin-top: 10px;
}
</style>