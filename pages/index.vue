<template>
  <div class="container">
    <h1>Пошук фільмів</h1>
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Введіть назву, наприклад, Dune"
        @keyup.enter="performSearch" />
      <button @click="performSearch" :disabled="pending">
        {{ pending ? 'Пошук...' : 'Знайти' }}
      </button>
    </div>

    <div v-if="error">
      <p>Сталася помилка: {{ error.message }}</p>
    </div>

    <div v-if="movies.length > 0" class="results">
      <h2>Результати пошуку:</h2>
      <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-item">

          <NuxtLink :to="'/movie/' + movie.id">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              :alt="movie.title"
            />
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
          </NuxtLink>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'


const searchQuery = ref('')
const movies = ref([])
const pending = ref(false)
const error = ref(null)

// Функція для пошуку
const performSearch = async () => {
  if (!searchQuery.value) return

  pending.value = true // Починаємо запит
  error.value = null

  try {
    const { data } = await useFetch('/api/movies/search', {
      params: {
        query: searchQuery.value,
      },
    })

    // розпаковані дані
    if (data.value) {
      movies.value = data.value
    } else {
      movies.value = []
    }

  } catch (e) {
    console.error('Помилка під час пошуку:', e)
    error.value = e
  } finally {
    pending.value = false // Завершуємо запит
  }
}
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.search-bar input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
}
.search-bar button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.movie-item {
  width: 200px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
.movie-item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.movie-item a {
  text-decoration: none;
  color: black;
}
.movie-item h3 {
  font-size: 16px;
  padding: 0 10px;
}
</style>
