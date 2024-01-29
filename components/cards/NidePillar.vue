<template>
    <div class="w-full relative rounded-2xl overflow-hidden h-full">
        <NuxtImg format="webp" :src="`${urlImg}${coverImage}`" :alt="title" width="1060" class="w-full aspect-square object-cover rounded-2xl h-full" />
        <div
            class="absolute py-2 px-3 md:py-3 md:px-4 bottom-0 h-48 flex flex-col justify-between items-center inset-x-0 bg-gradient-to-t from-[#007A77] bg-opacity-90">
            <h2 class="text-white font-bold text-center text-2xl line-clamp-2 absolute bottom-5 p-4 px-auto">
                {{ title }}
            </h2>
        </div>
    </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const { title, coverImage } = defineProps<{
    title: string,
    coverImage: string
}>()

</script>