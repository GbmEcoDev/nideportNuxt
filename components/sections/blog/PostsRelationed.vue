<template>
    <NuxtLink :to='post.uri'>
        <div class="items-center dark:text-white text-secondary transition-all border border-white hover:border hover:border-[#0FAFAA] rounded-[10px] m-2 p-1">
            <div class="flex gap-3">
                <div class="w-2/12 overflow-hidden">
                  <NuxtImg  v-if="post.sourceUrl" :src="post.sourceUrl" alt="Cover image" width="1060" class="w-full aspect-ratio-square object-cover rounded-lg" />
                </div>
                <div class="flex-col w-9/12 pl-1 max-sm:h-30">
                  <p class="text-primary text-xs dark:text-white">{{ formatDate(post.date) }} - {{ post.categories }}</p> 
                  <h2 class="font-bold text-lg  dark:text-white leading-5 mb-1">{{ post.title }}</h2>
                  <p class="text-gray-700 text-sm dark:text-white leading-4">{{ cleanAndTruncate(post.excerpt) }}</p>
                </div>
            </div>
        </div>
    </NuxtLink>
 </template>
 <script setup lang="ts">
const { locale } = useI18n();
const language = locale.value;
const zone = language === "es" ? "es-ES" : "en-EN";
const props = defineProps<{
    post: Record<string, any>;
      isFirstPost: Boolean;
 }>();

function formatCategories(categories: { nodes: { name: string }[] }) {
  if (categories && categories.nodes && categories.nodes.length > 0) {
    return categories.nodes.map(category => category.name).join(', ');
  }
  return '';
}

function cleanAndTruncate(text: string) {
  const cleanText = text.replace(/<[^>]+>/g, ''); // Elimina todas las etiquetas HTML
  const truncatedText = cleanText.length > 100 ? `${cleanText.substring(0, 80)}...` : cleanText;
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
 </script>
 <style scoped>
 .aspect-ratio-square {
   aspect-ratio: 1 / 1; /* Establece la relación de aspecto cuadrada */
 }
 /* 
.is-first-post {
  width:100%;
  border-radius:.25em;
  background-color: var(#007A77);
 margin-bottom: 20px;
}
.is-first-post h2 {
 font-family: Nunito, sans-serif;
 font-size:1.4em;
 line-height: 1.2em;
} */
 </style>
 