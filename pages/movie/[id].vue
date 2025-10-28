<template>
  <div v-if="pendingMovie || pendingTrailers">
    Завантаження...
  </div>
  <div v-else-if="movieError">
    <h1>Помилка</h1>
    <p>{{ movieError.message }}</p>
    <NuxtLink to="/">Повернутись до пошуку</NuxtLink>
  </div>
  <div v-else-if="movie" class="movie-details">
    <img
      :src="movie.poster_path"
      :alt="movie.title"
      class="poster"
    />
    <div class="info">
      <h1>{{ movie.title }} ({{ movie.release_date.split('-')[0] }})</h1>
      <p class="overview">{{ movie.overview }}</p>

      <h3>Рейтинги</h3>
      <ul class="ratings">
        <li>TMDB: {{ movie.vote_average_tmdb }} / 10</li>
        <li v-for="(rating, index) in movie.ratings_omdb" :key="index">
          {{ rating.Source }}: {{ rating.Value }}
        </li>
      </ul>

      <h3>Нагороди</h3>
      <p>{{ movie.awards }}</p>

      <h3>Трейлери</h3>
      <div v-if="trailersError">
        <p>Не вдалося завантажити трейлери.</p>
      </div>
      <div v-else class="trailers">
        <div v-for="trailer in trailers" :key="trailer.key">
          <a :href="'https://www.youtube.com/watch?v=' + trailer.key" target="_blank">
            {{ trailer.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, showError, useFetch } from '#app'

// Отримуємо ID з маршруту
const route = useRoute()
const movieId = route.params.id


// Запит 1: Деталі фільму
const {
  data: movie,
  pending: pendingMovie,
  error: movieError
} = await useFetch(`/api/movies/${movieId}`);

// Запит 2: Трейлери
const {
  data: trailers,
  pending: pendingTrailers,
  error: trailersError
} = await useFetch(`/api/movies/${movieId}/trailers`);

// Якщо основний запит повернув помилку (напр. 404), показуємо сторінку помилки
if (movieError.value) {
  showError({ statusCode: 404, statusMessage: 'Фільм не знайдено' })
}
</script>

<style scoped>
.movie-details {
  display: flex;
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 20px auto;
  gap: 30px;
}
.poster {
  width: 300px;
  border-radius: 8px;
}
.info {
  flex: 1;
}
.overview {
  font-size: 16px;
  line-height: 1.6;
}
.ratings {
  list-style: none;
  padding: 0;
}
</style>
