<template>
    <div class="lg:p-1 relative h-auto flex flex-col">
      <div class="relative h-max min-h-max flex items-center">
        <NuxtImg :src="`${urlImg}${coverImage}`" :alt="name" width="192" class="aspect-ratio-square mx-auto border-green-950 w-48 h-48 max-sm:w-full max-sm:h-full max-lg:h-full max-lg:w-full border-2 rounded-full object-cover scale-100 hover:scale-105 grayscale hover:grayscale-0"/>
        <span class="absolute bottom-2 right-0 max-sm:right-0 px-2 rounded-full text-sm text-white ">
            <NuxtLink target="_blank" :to="`${ linkedin }`" class="transition hover:!scale-110 ">
              <NuxtImg :src="`${urlImg}/images/icon/LN-blue.svg`" class="icons"/>
            </NuxtLink>
        </span>
      </div>
      <div class="lg:px-2 pt-2 lg:pb-4 xl:px-4 md:pt-4  h-full flex flex-col justify-between">
        <div class="h-full">
          <h2 class="font-semibold text-base md:text-lg lg:text-xl line-clamp-2 md:line-clamp-3 text-center text-white dark:text-white">
            {{ name }}
          </h2>
        </div>
        <div class="h-full">
          <h4 class="font-semibold text-base md:text-lg lg:text-xl line-clamp-2 md:line-clamp-3 text-center text-white dark:text-white">
            {{ position }}
          </h4>
        </div>
        <div class="h-full">
          <p class="font-normal text-xs md:text-xs lg:text-xs line-clamp-2 md:line-clamp-3 text-center text-white dark:text-white">
            {{ jobs }}
          </p>
        </div> 
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const config = useRuntimeConfig();
  const urlImg = config.public.url_base;
  const { name, linkedin, coverImage, position, jobs } = defineProps<{
    name: string,
    linkedin: string,
    coverImage: string,
    position: string,
    jobs: string
  }>()
  </script>

  <style scoped>
  .aspect-ratio-square {
    aspect-ratio: 1 / 1;
  }
  </style>
  