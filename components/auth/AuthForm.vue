<template>
  <div class="auth-card">
    <h2 class="title">{{ title }}</h2>
    <form @submit.prevent="submitForm" class="form-container">
      <div v-if="isRegister" class="form-group">
        <label for="username" class="input-label">Ім'я користувача</label>
        <input 
          v-model="formData.username" 
          id="username" 
          type="text" 
          required 
          class="input-field" 
        />
      </div>

      <div class="form-group">
        <label for="email" class="input-label">Email</label>
        <input 
          v-model="formData.email" 
          id="email" 
          type="email" 
          required 
          class="input-field" 
        />
      </div>

      <div class="form-group">
        <label for="password" class="input-label">Пароль</label>
        <input 
          v-model="formData.password" 
          id="password" 
          type="password" 
          required 
          class="input-field" 
        />
      </div>

      <button type="submit" :disabled="loading" class="submit-button">
        {{ loading ? 'Обробка...' : title }}
      </button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { CreateUserDto, LoginDto } from '~/types/auth';
import { useAuthStore } from '~/stores/auth'; 
const authStore = useAuthStore();

const props = defineProps<{
  title: string;
  action: (credentials: any) => Promise<any>;
  isRegister: boolean;
}>();

const loading = ref(false);
const error = ref<string | null>(null);

const formData = reactive<CreateUserDto>({
  username: '',
  email: '',
  password: '',
});

async function submitForm() {
  loading.value = true;
  error.value = null;

  try {
    const credentials = props.isRegister 
      ? formData 
      : { email: formData.email, password: formData.password };
    
    const response = await props.action(credentials);
    
    if (response.access_token) {
      if (import.meta.client) {
        authStore.setAuth(response.access_token, response.user.role);
      }
      
      await navigateTo('/', { replace: true });

    } else {
      throw new Error('API не повернув токен.');
    }

  } catch (e: any) {
    error.value = e.response?.data?.message || 'Невідома помилка аутентифікації.';
    console.error('Auth Error:', e);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 20px 40px rgba(0, 0, 0, 0.05); 
  max-width: 450px;
  width: 100%;
  transition: transform 0.5s, box-shadow 0.5s;
  margin: 0 auto;
}

.auth-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15), 0 25px 50px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 24px;
  text-align: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px; 
}

.form-group {
  margin-bottom: 0;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 4px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.input-field:focus {
  border-color: #0284c7; 
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.25); 
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background-color: #0284c7;
  cursor: pointer;
  transition: background-color 0.15s, box-shadow 0.15s;
}

.submit-button:hover:not(:disabled) {
  background-color: #0369a1; 
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.submit-button:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
  opacity: 0.8;
  box-shadow: none;
}

.error-message {
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
  padding-top: 8px;
  text-align: center;
}
</style>