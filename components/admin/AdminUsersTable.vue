<template>
  <div>
    <h2 class="table-title">Керування користувачами ({{ users.length }})</h2>
    <p v-if="loading" class="loading-message">Завантаження...</p>
    <p v-else-if="error" class="error-message">Помилка: {{ error }}</p>
    
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Роль</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id.substring(0, 6) }}...</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td><span :class="{'role-admin': user.role === 'admin'}" class="role-tag">{{ user.role.toUpperCase() }}</span></td>
          <td>
            <button @click="handleDelete(user.id)" class="action-button delete">
              {{ deletingId === user.id ? 'Видалення...' : 'Видалити' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllUsers, deleteUser } from '~/api/admin';
import type { UserResponseDto } from '~/types/users';

const users = ref<UserResponseDto[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const deletingId = ref<string | null>(null);

async function fetchUsers() {
  loading.value = true;
  error.value = null;
  try {
    users.value = await getAllUsers();
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Не вдалося завантажити список користувачів.';
  } finally {
    loading.value = false;
  }
}

async function handleDelete(id: string) {
  if (deletingId.value === id) return;
  if (!confirm(`Видалити користувача з ID ${id}?`)) return;

  deletingId.value = id;
  try {
    await deleteUser(id);
    users.value = users.value.filter(u => u.id !== id); 
  } catch (e) {
    alert('Помилка видалення!');
  } finally {
    deletingId.value = null;
  }
}

onMounted(fetchUsers);
</script>

<style scoped>
.table-title { font-size: 20px; font-weight: 600; margin-bottom: 15px; color: #1a202c; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { 
    padding: 12px 15px; 
    border-bottom: 1px solid #e2e8f0; 
    text-align: left;
    font-size: 14px;
}
.data-table th { background-color: #f7fafc; color: #4a5568; font-weight: 700; }
.role-tag { padding: 4px 8px; border-radius: 4px; font-weight: 500; font-size: 12px; }
.role-tag.role-admin { background-color: #fcd34d; color: #92400e; }
.action-button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    transition: background-color 0.2s;
}
.action-button.delete { background-color: #ef4444; color: #fff; }
.action-button.delete:hover { background-color: #dc2626; }
</style>