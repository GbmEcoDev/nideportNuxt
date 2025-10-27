<template>
  <div class="mb-8 w-full">
    <SectionsBlogHeroBlog />
  </div>
  <SectionsFeaturedPosts />
  <AtomsContainer>
    <div class="py-16">
      <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="col-span-2">
               <div v-if="pending" class="text-center py-12">
                  <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  <p class="mt-2 text-gray-500">loading</p>
                </div>

                <div>
                  <div class="flex-grid w-full"><!-- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12  -->
                    <BlogCard v-if="paginatedPosts && paginatedPosts.length > 0"
                      v-for="post in paginatedPosts"
                      :key="post._path"
                      :post="post"
                    />
                  </div>

                  <Pagination
                    v-if="totalPages > 1 && paginatedPosts && paginatedPosts.length > 0"
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @update:currentPage="handlePageChange"
                  />
                </div>

                 <div v-if="!pending && (!paginatedPosts || paginatedPosts.length === 0)" class="text-center py-12 mt-8">
                  <p class="text-gray-500 text-lg">{{ $t('blog.noPostsFound') }}</p>
                </div>

            </div>
            <div class="col-span-1">
<!--               <ListTags
              :tags="allTags"
              :selected-tag="selectedTag"
              @tag-selected="handleTagFilter"
            /> -->
            <ListCategories
              class="mt-8"
              :categories="allCategories"
              :selected-category="selectedCategory"
              @category-selected="handleCategoryFilter"
            />
              
              <ListEvento />
            </div>
          </div>

       
      </div>
    </div>
  </AtomsContainer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const perPage = 10 // Aumenté el número para que se vea mejor, ajústalo a tu gusto.

// SEO
useHead({
  title: computed(() => "blog"),
  meta: [
    { name: 'description', content: 'Explora nuestro blog con artículos sobre tecnología, desarrollo y más.' }
  ]
})

const selectedTag = ref(route.query.tag || '')
const selectedCategory = ref(route.query.category || '')
const currentPage = ref(parseInt(route.query.page) || 1)

// Obtener todas las categorías únicas para la UI del filtro
const { data: allPostsForCategories } = await useAsyncData(`all-posts-for-categories-${locale.value}`, () =>
  queryContent(`/blog/${locale.value}`)
    .only(['category'])
    .find(),
  { watch: [locale] }
)

// Obtener todos los tags únicos para la UI del filtro (corregido para evitar errores)
const { data: allPostsForTags } = await useAsyncData(`all-posts-for-tags-${locale.value}`, () =>
  queryContent(`/blog/${locale.value}`)
    .only(['tags'])
    .find(),
  { watch: [locale] }
)

// Obtener todos los tags únicos
const allTags = computed(() => {
  const tagsSet = new Set()
  allPostsForTags.value?.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagsSet.add(tag.trim()))
    }
  })
  return Array.from(tagsSet).sort()
})

// Obtener todas las categorías únicas
const allCategories = computed(() => {
  const categoriesSet = new Set()
  allPostsForCategories.value?.forEach(post => {
    if (Array.isArray(post.category)) {
      // Si es un array, añadimos cada categoría
      post.category.forEach(cat => categoriesSet.add(cat.trim()))
    } else if (post.category) {
      // Mantenemos la compatibilidad si es solo un string
      categoriesSet.add(post.category.trim())
    }
  })
  return Array.from(categoriesSet).sort()
})

// Para un sitio estático (`generate`), obtenemos TODOS los posts una vez y filtramos en el cliente.
const { data: allPosts, pending } = await useAsyncData(
  `all-blog-posts-${locale.value}`,
  () => {
    let query = queryContent(`/blog/${locale.value}`)
      .only(['title', 'description', 'date', 'author', 'category', 'slug', '_path', 'image', 'tags'])
      .where({ category: { $not: { $contains: locale.value === 'en' ? 'Featured' : 'Destacadas' } } })
      .sort({ date: -1 });
    return query.find();
  },
  {
    watch: [locale] // Solo volvemos a buscar todo si cambia el idioma
  }
);

// Filtrado y paginación en el lado del cliente usando propiedades computadas
const filteredPosts = computed(() => {
  if (!allPosts.value) return [];
  
  let posts = allPosts.value;

  // Filtrar por categoría
  if (selectedCategory.value) {
    posts = posts.filter(post => 
      Array.isArray(post.category) && post.category.includes(selectedCategory.value)
    );
  }
  
  return posts;
});

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return filteredPosts.value.slice(start, end);
});

const totalPosts = computed(() => filteredPosts.value.length);
const totalPages = computed(() => Math.ceil(totalPosts.value / perPage));


// Manejar selección de tag
/* const handleTagFilter = (tag) => {
  selectedTag.value = selectedTag.value === tag ? '' : tag // Toggle: deselecciona si se vuelve a clickear
  handleFilterChange()
} */

// Manejar selección de categoría
const handleCategoryFilter = (category) => {
  selectedCategory.value = selectedCategory.value === category ? '' : category // Toggle
  handleFilterChange()
}

// Manejar cambio de página
const handlePageChange = (page) => {
  currentPage.value = page
  updateURL()
}

// Función centralizada para actualizar la URL
const updateURL = () => {
  const query = {}
  if (selectedCategory.value) query.category = selectedCategory.value
  if (selectedTag.value) query.tag = selectedTag.value
  if (currentPage.value > 1) query.page = currentPage.value

  router.push({ query })
}

const handleFilterChange = () => {
  currentPage.value = 1 // Siempre resetear a la primera página al cambiar un filtro
  updateURL()
}

// Limpiar filtro al cambiar de idioma
watch(locale, () => {
  selectedTag.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
  router.push({ query: {} }) // Limpia la URL también
})

definePageMeta({
  layout: 'blog'
})
</script>