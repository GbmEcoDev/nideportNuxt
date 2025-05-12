<template>
    <div class="relative rounded-2xl overflow-hidden bg-white max-w-[320px] w-full h-auto shadow-[0px_4px_25px_rgba(37,37,41,0.08)] "
    @touchstart="isHovered = true"
    @touchend="isHovered = false"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    >
        <NuxtImg format="webp" :src="`${urlImg}${coverImage}`" :alt="title" width="160" class="w-full rounded-2xl h-full" />
        <div :class="{
        ' max-w-[320px] w-full h-full ': !isHovered,
        ' max-w-[320px] w-full h-full bg-gradient-to-t from-[#0F5F60f3] to-[#0f5f60f3]': isHovered
            }"
            class="absolute bottom-0 py-3 px-2 flex flex-col justify-start items-start inset-x-0 transition-all duration-250">         
            <p :class="{
                    'hidden': !isHovered,
                    'block': isHovered
                }" class="text-white text-left px-3 mb-8 text-sm sm:text-xs" v-html="formattedDescription">
                </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const { title, coverImage, description } = defineProps<{
    title: string,
    description: string,
    coverImage: string
}>();

const isHovered = ref(false);
const formattedDescription = computed(() => {
    return description.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
});
</script>

<style scoped>
.transition-all {
  transition-property: all;
}
</style>