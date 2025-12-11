<template>
  <div class="movie-page">
    <div v-if="loading" class="loading">Завантаження...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="movie" class="content-wrapper">
      <div class="movie-header">
        <div class="poster-column">
          <img
            v-if="movie.poster_path"
            :src="movie.poster_path"
            :alt="movie.title"
            class="poster-img"
          />
          <div v-else class="no-poster">Нема постеру</div>
        </div>

        <div class="info-column">
          <h1 class="movie-title">{{ movie.title }}</h1>
          <p v-if="movie.tagline" class="tagline">«{{ movie.tagline }}»</p>

          <div class="ratings-container">
            <div class="rating-badge tmdb" v-if="movie.vote_average_tmdb">
              <span class="source">TMDB</span>
              <span class="value">★ {{ movie.vote_average_tmdb.toFixed(1) }}</span>
            </div>

            <div
              v-for="(rating, index) in movie.ratings_omdb"
              :key="index"
              class="rating-badge omdb"
            >
              <span class="source">{{ formatSource(rating.Source) }}</span>
              <span class="value">{{ rating.Value }}</span>
            </div>
          </div>

          <div class="meta-row">
            <span v-if="movie.release_date" class="meta-item">
              📅 {{ new Date(movie.release_date).getFullYear() }}
            </span>
            <span v-if="movie.runtime" class="meta-item">⏱ {{ movie.runtime }} мин.</span>
          </div>

          <div v-if="movie.genres && movie.genres.length" class="genres-list">
            <span v-for="genre in movie.genres" :key="genre.id" class="genre-tag">
              {{ genre.name }}
            </span>
          </div>

          <div v-if="movie.awards && movie.awards !== 'N/A'" class="awards-block">
            🏆 {{ movie.awards }}
          </div>

          <div class="description-block">
            <h3>Про фільм</h3>
            <p>{{ movie.overview || "Опису немає." }}</p>
          </div>
        </div>
      </div>

      <div v-if="trailers.length > 0" class="trailers-section">
        <h3>Трейлери та відео</h3>
        <div class="trailers-grid">
          <div v-for="video in trailers" :key="video.id" class="trailer-card">
            <div class="video-wrapper">
              <iframe
                :src="`https://www.youtube.com/embed/${video.key}`"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <p class="trailer-name">{{ video.name }}</p>
          </div>
        </div>
      </div>

      <div class="actions">
        <button @click="goBack" class="btn-back">← До пошуку</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { moviesApi, type Movie, type Video } from "@/api/movies";

  const route = useRoute();
  const router = useRouter();

  const movie = ref<Movie | null>(null);
  const trailers = ref<Video[]>([]);
  const loading = ref(true);
  const error = ref("");

  const formatSource = (source: string) => {
    if (source === "Internet Movie Database") return "IMDb";
    if (source === "Rotten Tomatoes") return "Tomatoes";
    return source;
  };

  onMounted(async () => {
    const id = route.params.id as string;
    try {
      loading.value = true;

      const [movieData, trailersData] = await Promise.all([
        moviesApi.getById(id),
        moviesApi.getTrailers(id),
      ]);

      console.log("Movie Data with Ratings:", movieData);

      movie.value = movieData;
      trailers.value = (trailersData || []).filter((v) => v.site === "YouTube");
    } catch (e: any) {
      console.error("Помилка завантаження:", e);
      error.value = "Не вдалося завантажити дані фільму.";
    } finally {
      loading.value = false;
    }
  });

  const goBack = () => router.back();
</script>

<style scoped>
  .movie-page {
    max-width: 1100px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
  }

  .loading,
  .error {
    text-align: center;
    margin-top: 50px;
    font-size: 1.2rem;
  }
  .error {
    color: #e74c3c;
  }

  .movie-header {
    display: flex;
    gap: 40px;
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
  }

  .poster-column {
    flex: 0 0 300px;
  }

  .poster-img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .info-column {
    flex: 1;
  }

  .movie-title {
    margin: 0;
    font-size: 2.5rem;
    color: #2c3e50;
    line-height: 1.2;
  }

  .tagline {
    font-style: italic;
    color: #7f8c8d;
    font-size: 1.1rem;
    margin-top: 5px;
    margin-bottom: 15px;
  }

  /* Стили для рейтингов */
  .ratings-container {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .rating-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    padding: 5px 12px;
    border-radius: 8px;
    min-width: 60px;
  }

  .rating-badge .source {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #888;
    font-weight: 700;
    margin-bottom: 2px;
  }

  .rating-badge .value {
    font-weight: bold;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  .rating-badge.tmdb .value {
    color: #f1c40f;
  }

  .meta-row {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    align-items: center;
  }

  .meta-item {
    background: #f1f3f5;
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: 500;
    color: #555;
  }

  .genres-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  .genre-tag {
    border: 1px solid #ddd;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    color: #555;
  }

  .awards-block {
    margin-bottom: 20px;
    padding: 12px;
    background: #fff8e1;
    border-left: 4px solid #ffc107;
    color: #856404;
    border-radius: 4px;
  }

  .description-block h3,
  .trailers-section h3 {
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 15px;
    color: #2c3e50;
  }

  .description-block p {
    line-height: 1.6;
  }

  .trailers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    background: black;
    border-radius: 8px;
    overflow: hidden;
  }

  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .trailer-name {
    margin-top: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #444;
  }

  .btn-back {
    background: transparent;
    border: 2px solid #3498db;
    color: #3498db;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 20px;
  }

  .btn-back:hover {
    background: #3498db;
    color: white;
  }

  @media (max-width: 768px) {
    .movie-header {
      flex-direction: column;
      align-items: center;
    }
    .poster-column {
      width: 100%;
      max-width: 250px;
    }
  }
</style>
