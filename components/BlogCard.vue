<template>
  <article class="card">
    <NuxtLink :to="localePath(`/blog/${post.slug}`)">
    <div class="items-center text-secondary transition-all border border-white hover:border hover:border-[#0FAFAA] rounded-[10px] p-1">
        <div class="flex flex-col lg:flex-row md:flex-row md:items-center lg:items-center">
          <div class="lg:w-3/12 md:w-3/12 w-full overflow-hidden">
          <NuxtImg v-if="post.image" :src="post.image" alt="Cover image" width="1060" class="w-full aspect-square object-cover rounded-lg  h-[8em] lg:h-[10em]" />
          </div>
          <div class="flex-col lg:w-8/12 md:8/12 w-full pl-1 max-sm:h-30 lg:ml-3 border-b md:border-none lg:border-none mt-3">
            <p class="text-primary text-xs ">{{ Array.isArray(post.category) ? post.category.join(' - ') : post.category }} - <span class="text-gray-600">{{ formatDate(post.date) }}</span></p> 
            <h2 class="font-bold text-lg  leading-5 my-1">{{ post.title }}</h2>
            <p class="text-[#242424] text-[16px] leading-5 text-left md:text-left lg:text-left pb-2">{{ post.description }}</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const localePath = useLocalePath()
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(locale.value === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

</script>

<!-- <style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> -->