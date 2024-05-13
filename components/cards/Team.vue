<template>
    <div class="lg:p-1 relative h-[190px] md:h-auto lg:h-[270px] flex flex-col rounded-[20px] scale-100 hover:scale-105 bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgb(255,255,255,0.2)]">
      <div class="relative h-max min-h-max flex items-center px-4 ">
        <NuxtImg format="webp" :src="`${urlImg}${coverImage}`" :alt="name" width="60" 
        class=" mt-6 aspect-ratio-square mx-auto w-[60px] h-[60px] lg:w-32 lg:h-32 rounded-full object-cover "/>
        <!--  xs:max-w-16 xs:max-h-16 sm:w-14 sm:h-14 md:w-24 md:h-24 max-lg:h-full max-lg:w-full 
          <span class="absolute bottom-2 right-0 max-sm:right-0 px-2 rounded-full text-sm text-white ">
            <NuxtLink target="_blank" :to="`${ linkedin }`" class="transition hover:!scale-110 ">
              <NuxtImg :src="`${urlImg}/images/icon/LN-blue.svg`" class="icons"/>
            </NuxtLink>
        </span> -->
      </div>
      <div class="px-1 lg:px-1 pt-2 xl:px-2 md:pt-4 h-full flex flex-col justify-between">
        <div class="h-full px-0">
          <h2 class="font-semibold text-[16px] md:text-[16px] lg:text-[16px] text-center xs:leading-2 sm:leading-2 leading-5 text-white mb-2">
            {{ name }}
          </h2>
          <p class="font-normal text-[13px] md:text-[14px] lg:text-[14px] mb-2 text-center leading-4 text-white">
            {{ position }}
          </p>
        </div>
<!--         <div class="h-full">
          <p class="font-normal text-xs md:text-xs lg:text-xs line-clamp-2 md:line-clamp-3 text-center text-white">
            {{ jobs }}
          </p>
        </div>  -->
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const config = useRuntimeConfig();
  const urlImg = config.public.url_base;
  const { name, coverImage, position } = defineProps<{
    name: string,
    //linkedin: string,
    coverImage: string,
    position: string,
    //jobs: string
  }>()
  </script>

  <style scoped>
  .aspect-ratio-square {
    aspect-ratio: 1 / 1;
  }
  </style>
  