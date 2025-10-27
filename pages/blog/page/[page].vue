<template>
  <div class="mb-8 w-full">
    <SectionsBlogHeroBlog />
  </div>
  <AtomsContainer>
    <div class="py-16">
      <div class="container-custom">
        <div v-if="pending" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p class="mt-2 text-gray-500">loading</p>
        </div>

        <div v-else-if="posts && posts.length > 0">
          <div class="flex-grid w-full"><!-- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12  -->
            <BlogCard
              v-for="post in posts"
              :key="post._path"
              :post="post"
            />
          </div>

          <Pagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
          />
        </div>

        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">no resultados</p>
        </div>
      </div>
    </div>
  </AtomsContainer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale } = useI18n()
const route = useRoute()
const perPage = 10 // Debe ser el mismo valor que en index.vue

const currentPage = computed(() => parseInt(route.params.page) || 1)

const { data: posts, pending } = await useAsyncData(
  `blog-posts-${locale.value}-${currentPage.value}`,
  () => queryContent(`/blog/${locale.value}`)
    .only(['title', 'description', 'date', 'author', 'category', 'slug', '_path', 'image'])
    .sort({ date: -1 })
    .skip((currentPage.value - 1) * perPage)
    .limit(perPage)
    .find(),
  { watch: [currentPage, locale] }
)

const { data: totalPostsData } = await useAsyncData(`blog-count-${locale.value}`, () => queryContent(`/blog/${locale.value}`).only('_path').find())
const totalPosts = computed(() => totalPostsData.value?.length || 0)
const totalPages = computed(() => Math.ceil(totalPosts.value / perPage))

definePageMeta({
  layout: 'blog'
})
</script>