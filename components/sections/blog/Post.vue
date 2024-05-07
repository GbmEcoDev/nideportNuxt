<template>
    <NuxtLink :to='post.uri' class="w-[22rem] max-sm:w-full relative rounded-2xl overflow-hidden mx-3 max-sm:mb-4 max-sm:mx-0 h-[12em]">
        <div class="rounded-lg transition-all hover:-translate-y-1 hover:scale-105">
            <NuxtImg  v-if="post.sourceUrl" :src="post.sourceUrl" :alt="post.title" width="1060" class="w-full aspect-square object-cover rounded-2xl h-[12em]" />
            <div class="absolute w-full rounded-lg bottom-0 h-36 flex flex-col justify-between inset-x-0 bg-gradient-to-t from-[#000000] bg-opacity-20">

                <div class="text-white font-bold text-center line-clamp-2 p-4 h-full">
                    <div class="w-full h-full flex-col align-bottom relative">
                        <div class="flex align-bottom justify-center">
                            <h2 class="font-bold shadow text-2xl leading-6">{{ post.title }}</h2>
                        </div>
                        <div class="text-white text-xs border-t w-full absolute bottom-0 pt-1">
                            <p>{{ new Date(post.date).toLocaleDateString() }} - {{ post.categories }}</p>
                        </div>
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
 
 </script>
 <style scoped>
 .aspect-ratio-square {
   aspect-ratio: 1 / 1; /* Establece la relación de aspecto cuadrada */
 }
 </style>
 