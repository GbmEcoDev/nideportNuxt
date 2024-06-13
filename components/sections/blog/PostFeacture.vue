<template>
    <NuxtLink :to="`${post.slug}`" class="w-[22rem] md:w-1/3 lg:w-1/3 max-sm:w-full relative rounded-2xl overflow-hidden max-sm:mb-4 h-[12em] lg:h-[18em]">
        <div class="rounded-lg transition-all hover:-translate-y-1 hover:scale-105">
            <NuxtImg  v-if="post.yoast_head_json && post.yoast_head_json.og_image && post.yoast_head_json.og_image[0].url" :src="post.yoast_head_json.og_image[0].url" :alt="post.title.rendered" width="1060" class="w-full aspect-square object-cover rounded-2xl h-[12em] lg:h-[18em]" />
            <div class="absolute w-full rounded-lg bottom-0 h-full inset-x-0 bg-gradient-to-t from-gray-900/[.9]  to-gray-900/[.1] grid content-end ">
                <div class="w-full text-white font-bold text-left line-clamp-3 p-4">
                    <div class="text-left pb-2">
                        <h2 class="font-bold shadow text-[18px] lg:text-2xl lg:leading-6">{{ post.title.rendered }}</h2>
                    </div>
                    <div class="text-white text-[14px] lg:text-sm w-full pt-1">
                        <p>{{ formatDate(post.date) }} - {{ categoryNames }}</p>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
 </template>
 <script setup lang="ts">
    const props = defineProps<{
    post: Record<string, any>;
 }>();
 const config = useRuntimeConfig();
 const { locale } = useI18n()
const language = locale.value
const zone = language === "es" ? "es-ES" : "en-EN"
 const categoryNames = ref<string>('');

 function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(zone, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

 async function fetchCategoryNames(categoryIds: number[]): Promise<void> {
  try {
    const response = await fetch(`${config.public.wpCategories}?include=${categoryIds.join(',')}`);
    const categories = await response.json();
    categoryNames.value = categories.map((category: any) => category.name).join(', ');
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

onMounted(() => {
  fetchCategoryNames(props.post.categories);
});
 </script>
 <style scoped>
 .aspect-ratio-square {
   aspect-ratio: 1 / 1; /* Establece la relación de aspecto cuadrada */
 }
 </style>
 