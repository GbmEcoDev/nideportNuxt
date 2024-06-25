<template>
    <NuxtLink :to='post.uri' class="w-full md:w-1/2 lg:w-4/12 "  :class="{ 'is-first-post': isFirstPost }">
        <div class=" items-center  text-secondary p-2 transition-all hover:-translate-y-1 hover:scale-105 pb-3">
            <div class="flex gap-3">
                <div class="flex-col w-full pl-1 max-sm:h-30"><NuxtImg  v-if="post.sourceUrl" :src="post.sourceUrl" alt="Cover image" width="1060" class="w-full object-cover rounded-md mb-2" />
                  <p class="text-primary text-xs  mb-2">{{ new Date(post.date).toLocaleDateString() }} - {{ post.categories }}</p> 
                  <h2 class="font-bold text-lg   leading-5 mb-1">{{ post.title }}</h2>
                  <p class="text-gray-700 text-sm  leading-4">{{ cleanAndTruncate(post.excerpt) }}</p>
                </div>
            </div>
        </div>
    </NuxtLink>
 </template>
 <script setup lang="ts">

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
 </script>
 <style scoped>
 .aspect-ratio-square {
   aspect-ratio: 1 / 1; /* Establece la relación de aspecto cuadrada */
 }
 
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
}
 </style>
 