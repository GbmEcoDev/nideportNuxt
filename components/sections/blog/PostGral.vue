<template>
    <NuxtLink :to='post.uri'>
      <div class="items-center text-secondary transition-all hover:-translate-y-1 hover:scale-105 pb-8">
          <div class="flex flex-col lg:flex-row md:flex-row">
              <div class="lg:w-2/12 md:w-2/12 w-full overflow-hidden">
                <NuxtImg v-if="post.sourceUrl" :src="post.sourceUrl" alt="Cover image" width="1060" class="w-full aspect-ratio-square object-cover rounded-lg mb-2 " />
              </div>
              <div class="flex-col lg:w-9/12 md:9/12 w-full pl-1 max-sm:h-30 lg:ml-3">
                <p class="text-primary text-xs py-2">{{ post.categories }} - <span class="text-gray-600">{{ new Date(post.date).toLocaleDateString() }}</span></p> 
                <h2 class="font-bold text-lg  leading-5 mb-1">{{ post.title }}</h2>
                <p class="text-gray-700 text-sm leading-5 text-justify md:text-left lg:text-left">{{ cleanAndTruncate(post.excerpt) }}</p>
              </div>
          </div>
      </div>
    </NuxtLink>
 </template>
 <script setup lang="ts">
  const props = defineProps<{
      post: Record<string, any>;
  }>();

 /* function formatCategories(categories: { nodes: { name: string }[] }) {
    if (categories && categories.nodes && categories.nodes.length > 0) {
      return categories.nodes.map(category => category.name).join(', ');
    }
    return '';
  }

   function cleanAndTruncate(text: string) {
    // Limpiar HTML y recortar a 200 caracteres
    const cleanText = text.replace(/<[^>]+?>/g, ''); // Elimina todas las etiquetas HTML
    const truncatedText = cleanText.length > 100 ? `${cleanText.substring(0, 200)}...` : cleanText;
    return truncatedText;
  } */
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
 </script>
  <style scoped>
  .aspect-ratio-square {
    aspect-ratio: 1 / 1;
  }
 </style>
 