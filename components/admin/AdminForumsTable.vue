<template>
  <div>
    <h2 class="table-title">Керування постами ({{ posts.length }})</h2>
    <p v-if="loading" class="loading-message">Завантаження...</p>
    <p v-else-if="error" class="error-message">Помилка: {{ error }}</p>

    <table v-else class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Контент (фрагмент)</th>
          <th>Автор ID</th>
          <th>Створено</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.content.substring(0, 50) }}{{ post.content.length > 50 ? '...' : '' }}</td>
          <td>{{ post.authorId.substring(0, 6) }}...</td>
          <td>{{ new Date(post.createdAt).toLocaleDateString() }}</td>
          <td>
            <button @click="startEditing(post)" class="action-button edit">Редагувати</button>
            <button @click="handleDelete(post.id)" class="action-button delete">
              {{ deletingId === post.id ? 'Видалення...' : 'Видалити' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isEditing" class="modal-backdrop">
      <div class="modal-content">
        <h3>Редагувати пост ID: {{ currentPost.id }}</h3>
        <textarea v-model="editContent" class="edit-textarea"></textarea>
        <div class="modal-actions">
          <button @click="submitUpdate" class="submit-button" :disabled="isUpdating">Зберегти</button>
          <button @click="cancelEditing" class="cancel-button">Скасувати</button>
        </div>
        <p v-if="updateError" class="message-error">{{ updateError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllForumPosts, deleteForumPost, updateForumPost } from '~/api/admin';
import type { PostInterface } from '~/types/forums';

const posts = ref<PostInterface[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const deletingId = ref<number | null>(null);

const isEditing = ref(false);
const isUpdating = ref(false);
const currentPost = ref<PostInterface | null>(null);
const editContent = ref('');
const updateError = ref<string | null>(null);

async function fetchPosts() {
  loading.value = true;
  error.value = null;
  try {
    posts.value = await getAllForumPosts();
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Не вдалося завантажити список постів.';
  } finally {
    loading.value = false;
  }
}

function startEditing(post: PostInterface) {
  currentPost.value = post;
  editContent.value = post.content;
  updateError.value = null;
  isEditing.value = true;
}

function cancelEditing() {
  isEditing.value = false;
  currentPost.value = null;
}

async function submitUpdate() {
  if (!currentPost.value || isUpdating.value) return;
  
  isUpdating.value = true;
  updateError.value = null;

  try {
    const postIdString = currentPost.value.id.toString(); 
    const updatedPost = await updateForumPost(postIdString, { content: editContent.value });
    cancelEditing();
  } catch (e: any) {
    console.error("Update Error Details:", e.response?.data);
    updateError.value = e.response?.data?.message || 'Помилка при збереженні поста.';
  } finally {
    isUpdating.value = false;
    fetchPosts();
  }
}

async function handleDelete(id: number) {
  if (deletingId.value === id) return;
  if (!confirm(`Видалити пост ID ${id}?`)) return;

  deletingId.value = id;
  try {
    await deleteForumPost(id.toString());
    posts.value = posts.value.filter(p => p.id !== id);
  } catch (e) {
    alert('Помилка видалення!');
  } finally {
    deletingId.value = null;
  }
}

onMounted(fetchPosts);
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
.action-button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    transition: background-color 0.2s;
    margin-right: 8px;
}
.action-button.delete { background-color: #ef4444; color: #fff; }
.action-button.delete:hover { background-color: #dc2626; }
.action-button.edit { background-color: #3b82f6; color: #fff; }
.action-button.edit:hover { background-color: #2563eb; }

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19);
  width: 90%;
  max-width: 500px;
}
.modal-content h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
}
.edit-textarea {
    width: 100%;
    min-height: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;
}
.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
.submit-button, .cancel-button {
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
}
.submit-button {
    background-color: #0284c7;
    color: #fff;
    border: none;
}
.cancel-button {
    background-color: #e5e7eb;
    color: #374151;
    border: 1px solid #d1d5db;
}
.message-error {
    color: #ef4444;
    margin-top: 10px;
    font-size: 14px;
}
</style>