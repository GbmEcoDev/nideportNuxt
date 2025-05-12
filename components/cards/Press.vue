<template>
    <div class="relative rounded-2xl bg-card max-w-[320px] w-full h-[345px] shadow-[0px_4px_25px_rgba(37,37,41,0.08)]">
        <div class="w-full h-[150px] rounded-tl-2xl rounded-tr-2xl bg-white mb-3">
            <NuxtImg format="webp" :src="`${urlImg}${coverImage}`" :alt="title" width="160" class="w-full rounded-2xl" />
        </div>
        <div class="relative h-[140px]">
            <p class="w-full text-left px-3 text-xs text-gray-500 leading-7">{{datePress}}</p>
            <p class="text-left font-bold text-md px-3 mb-8 title">{{title}}</p>
            <a class="text-left font-medium absolute -bottom-4 left-3" :href="`${urlPress}`">{{$t('home_press_btn_more')}}</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const { title,datePress, coverImage, description, urlPress } = defineProps<{
    title: string,
    datePress:string,
    description: string,
    coverImage: string,
    urlPress:string
}>();

const formattedDescription = computed(() => {
    return description.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
});
</script>

<style scoped>
.transition-all {
  transition-property: all;
}
.bg-card {
    background-color: rgba(248, 250, 252, 1);
    margin:20px 5px;
}
.bg-card p.title{
    color:rgba(0, 55, 56, 1);
    font-size: 16px;
}
.bg-card a{
    color:rgba(2, 163, 39, 1);
    font-size: 16px;
}
</style>