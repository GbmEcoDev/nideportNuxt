 <template>
  <div v-if="error">{{ error }}</div>
  <div v-else class="flex flex-col items-center w-full pr-4">
    <div v-if="filteredPosts.length">
      <SectionsBlogPostGralSlug v-for="post in filteredPosts" :key="post.slug" :post="post"  @click="navigateToPost(post.slug)"></SectionsBlogPostGralSlug>
    </div>
    <div v-else></div>
    <button v-if="hasMorePages" @click="fetchData" class="bg-cta w-36 hover:bg-primary text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline mt-8">{{ btnmore }}</button>
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
const btnmore = language === "es" ? "Cargar más" : "Load More"
const perPage = 5; // Cambio a 10 posts por página
let currentPage = 1;

const fetchData = async () => {
  try {
    const response = await axios.get(config.public.wpPosteos, {
      params: {
        'per_page': perPage,
        'acf.lang.slug': language,
        'page': currentPage
      }
    })
    if (response.status === 200) {
      if (currentPage === 1) {
        posts.value = response.data; // Inicializar con los primeros posts
      } else {
        posts.value = [...posts.value, ...response.data]; // Agregar más posts
      }
      currentPage++;
      // Verificar si hay más posts disponibles
      hasMorePages.value = response.data.length === perPage;
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
    //posts.value = []; // Vaciar los posts
    fetchData();
  }
)

// Comprobar si hay más páginas disponibles
const hasMorePages = ref(true);

const navigateToPost = (slug) => {
  console.log("slug",slug);
  router.push(`/${slug}`); // Assuming your post route pattern is `/post/:slug`
}

fetchData() // Fetch data initially
</script>
