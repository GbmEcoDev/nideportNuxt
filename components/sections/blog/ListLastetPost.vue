<template>
  <div v-if="error">{{ error }}</div>
  <div v-else>
    <ul v-if="posts.length">
      <li v-for="post in filteredPosts" :key="post.id">
        <h2>{{ post.title.rendered }}</h2>
      </li>
    </ul>
    <p v-else>No posts found.</p>
    <button v-if="hasMorePages" @click="fetchData">Load more</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'nuxt/app'
const config = useRuntimeConfig();
const router = useRouter()
const posts = ref([])
const error = ref(null)
const { locale } = useI18n()
const language = locale.value
const perPage = 10;
let currentPage = 1;

const fetchData = async () => {
  try {
    const response = await axios.get(config.public.wpPosteos, {
      params: {
        'per_page': perPage,
        'acf.lang.slug': language, // Filtrar por idioma del usuario
        'page': currentPage
      }
    })
    if (response.status === 200) {
      posts.value = [...posts.value, ...response.data]; // Agregar nuevos posts a la lista existente
      currentPage++; // Incrementar la página para la próxima carga
    } else {
      error.value = 'Error al obtener los posts: ' + response.statusText
    }
  } catch (error) {
    error.value = 'Error general: ' + error.message
  }
}

const filteredPosts = ref([])

// Filtrar los posts cuando se actualice la lista completa
watch(posts, () => {
  filteredPosts.value = posts.value.filter(post => post.acf.lang && post.acf.lang.slug === language)
})

// Fetch data on component creation and route changes
watch(
  () => router.currentRoute.value.path,
  () => {
    currentPage = 1; // Reiniciar la página cuando se cambia la ruta
    fetchData();
  }
)

// Comprobar si hay más páginas disponibles
const hasMorePages = ref(true);
watch(posts, () => {
  hasMorePages.value = posts.value.length % perPage === 0;
})

fetchData() // Fetch data initially
</script>
