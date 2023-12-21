<template>
    <NuxtLink :to='post.uri'>
        <div class="items-center dark:text-white text-secondary p-2 transition-all hover:-translate-y-1 hover:scale-105 pb-3">
            <div class="flex gap-3">

                <div class="flex-col w-full pl-1 max-sm:h-30"><nuxt-img :src="post.sourceUrl" alt="Cover image" width="1060" class="w-full aspect-square object-cover rounded-2xl" />
                  <p class="text-primary text-xs dark:text-white">{{ new Date(post.date).toLocaleDateString() }} - {{ post.categories }}</p> 
                  <h2 class="font-bold text-lg  dark:text-white leading-5 mb-1">{{ post.title }}</h2>
                  <p class="text-gray-700 text-sm dark:text-white leading-4">{{ cleanAndTruncate(post.excerpt) }}</p>
                        
                </div>
            </div>
        </div>
    </NuxtLink>
 </template>
 <script setup lang="ts">

const props = defineProps<{
    post: Record<string, any>;
 }>();

function formatCategories(categories: { nodes: { name: string }[] }) {
  if (categories && categories.nodes && categories.nodes.length > 0) {
    return categories.nodes.map(category => category.name).join(', ');
  }
  return '';
}

function cleanAndTruncate(text: string) {
  // Limpiar HTML y recortar a 200 caracteres
  const cleanText = text.replace(/<[^>]+>/g, ''); // Elimina todas las etiquetas HTML
  const truncatedText = cleanText.length > 100 ? `${cleanText.substring(0, 80)}...` : cleanText;
  return truncatedText;
}
 </script>
 <style scoped>
 .aspect-ratio-square {
   aspect-ratio: 1 / 1; /* Establece la relación de aspecto cuadrada */
 }
 </style>
 