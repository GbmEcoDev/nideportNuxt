<template>
    <div v-if="error">{{ error }}</div>
    <div v-else class="flex flex-col items-center w-full pr-4">
      <div v-if="filteredPosts.length" class="flex items-start justify-center w-full max-sm:flex-col gap-6 mb-10">
        <SectionsBlogPostFeacture v-for="post in filteredPosts" :key="post.slug" :post="post" @click="navigateToPost(post.slug)"></SectionsBlogPostFeacture>
      </div>
      <div v-else></div>
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
  const perPage = 3; // Cambio a 10 posts por página
  let currentPage = 1;
  
  const categoryIds = {
    es: 20, //20 250 ID para "Destacadas" en español
    en: 22  //22  403 ID para "Highlights" en inglés
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get(config.public.wpPosteos, {
        params: {
          'per_page': perPage,
          'acf.lang.slug': language.value,
          'categories': categoryIds[language.value],
          'page': currentPage
        }
      })
      if (response.status === 200) {
        posts.value = response.data; // Inicializar con los primeros posts
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
    filteredPosts.value = posts.value.filter(post => post.acf.lang && post.acf.lang.slug === language.value && post.categories.includes(categoryIds[language.value]))
  })
  
  // Fetch data on component creation and route changes
  watch(
    () => router.currentRoute.value.path,
    () => {
      currentPage = 1; // Reiniciar la página
      fetchData();
    }
  )
  
  // Watch for language changes
  watch(locale, (newLocale) => {
    language.value = newLocale.toLowerCase();
    currentPage = 1;
    fetchData();
  });
  
  const hasMorePages = ref(true);
  
  const navigateToPost = (slug) => {
    //router.push(`/${slug}`); 
    const localePrefix = language.value === 'en' ? '/en' : '';
    router.push(`${localePrefix}/${slug}`);
  }
  
  fetchData()
  </script>
  