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
const language = ref(locale.value)
const btnmore = language.value === "es" ? "Cargar más" : "Load More"
const perPage = 10; // Cambio a 10 posts por página
let currentPage = 1;

const categoryIds = {
    es: 20, //20 250 ID para "Destacadas" en español
    en: 22  //22  403 ID para "Highlights" en inglés
  };

const fetchData = async () => {
  try {
    const excludedCategoryId = categoryIds[language.value];
    const response = await axios.get(config.public.wpPosteos, {
      params: {
        'per_page': perPage,
        'acf.lang.slug': language.value,
        'page': currentPage,
        'categories_exclude': excludedCategoryId
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

  filteredPosts.value = posts.value.filter(post => 
  post.acf.lang && 
  post.acf.lang.slug === language.value
)
})

// Fetch data on component creation and route changes
watch(
  () => router.currentRoute.value.path,
  () => {
    currentPage = 1; // Reiniciar la página
    //posts.value = []; // Vaciar los posts
    fetchData();
  }
)


const hasMorePages = ref(true);

const navigateToPost = (slug) => {
 // router.push(`/${slug}`); 
  const localePrefix = language.value === 'en' ? '/en' : '';
  router.push(`${localePrefix}/${slug}`);
}

fetchData() 
</script>
