<template>
  <NuxtLink :to="`${post.slug}`">
    <div class="items-center text-secondary transition-all border border-white hover:border hover:border-[#0FAFAA] rounded-[10px] p-1">
        <div class="flex flex-col lg:flex-row md:flex-row md:items-center lg:items-center">
            <div class="lg:w-3/12 md:w-3/12 w-full overflow-hidden">
             <NuxtImg v-if="post.yoast_head_json && post.yoast_head_json.og_image && post.yoast_head_json.og_image[0].url" :src="post.yoast_head_json.og_image[0].url" alt="Cover image" width="1060" class="w-full aspect-ratio-square object-cover rounded-lg" />
            </div>
            <div class="flex-col lg:w-8/12 md:8/12 w-full pl-1 max-sm:h-30 lg:ml-3 border-b md:border-none lg:border-none mt-3">
              <p class="text-primary text-xs ">{{ categoryNames }} - <span class="text-gray-600">{{ formatDate(post.date) }}</span></p> 
              <h2 class="font-bold text-lg  leading-5 my-1">{{ post.title.rendered }}</h2>
              <p class="text-gray-700 text-md leading-5 text-left md:text-left lg:text-left pb-2">{{ cleanAndTruncate(post.excerpt.rendered) }}</p>
            </div>
        </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
const config = useRuntimeConfig();
const { locale } = useI18n()
const language = locale.value
const zone = language === "es" ? "es-ES" : "en-EN"
const props = defineProps<{
    post: Record<string, any>;
}>();
const categoryNames = ref<string>('');

function cleanAndTruncate(text: string): string {
  // Limpiar HTML y recortar a 200 caracteres
  const cleanText = text.replace(/<[^>]+?>/g, ''); 
  // Decodificar entidades HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanText, 'text/html');
  const decodedText = doc.body.textContent || '';
  // Recortar y devolver texto
  const truncatedText = decodedText.length > 200 ? `${decodedText.substring(0, 200)}...` : decodedText;
  return truncatedText;
}

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

// Cargar nombres de categorías cuando el componente se monte
onMounted(() => {
  fetchCategoryNames(props.post.categories);
});
</script>
<style scoped>
.aspect-ratio-square {
  aspect-ratio: 1 / 1;
}
</style>
