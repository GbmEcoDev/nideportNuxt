<template>
    <div class="w-full relative rounded-2xl overflow-hidden h-full"
    @touchstart="isHovered = true"
    @touchend="isHovered = false"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    >
        <NuxtImg format="webp" :src="`${urlImg}${coverImage}`" :alt="title" width="1060" class="w-full aspect-square object-cover rounded-2xl h-full" />
        <div :class="{
        'h-28 bg-gradient-to-t from-[#000000] bg-opacity-40': !isHovered,
        'h-full bg-gradient-to-t from-[#0F5F60e9] to-[#0f5f60e9]': isHovered
            }"
            class="absolute bottom-0 py-2 px-3 md:py-3 md:px-4 flex flex-col justify-end items-end inset-x-0 transition-all duration-150">
             
            <div class="flex flex-row justify-beetwen items-center w-full">
            <h2 class="text-white w-11/12 font-bold text-left text-2xl p-4">{{ title }}</h2>          
            <span class="w-[36px] h-[24px] rounded-full text-center font-bold text-4xl text-white lg:hidden" >
                <i class="mr-2 " :class="{
                    'i-heroicons-chevron-up-20-solid': !isHovered,
                    'i-heroicons-chevron-up-20-solid transform rotate-180': isHovered
                }"
                
                ></i>
            </span>
            </div>            
            <p :class="{
                    'hidden': !isHovered,
                    'block': isHovered
                }" class="text-white text-left px-3 mb-8"> {{ description }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const { title, coverImage, description } = defineProps<{
    title: string,
    description: string,
    coverImage: string
}>();

const isHovered = ref(false);

</script>

<style scoped>
.transition-all {
  transition-property: all;
}
</style>