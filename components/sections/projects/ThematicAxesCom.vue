<template>
    <section class="p-24 max-sm:px-1 scroll-snap-align-start">
        <AtomsContainer>
            <AtomsTitleH2 :texte="$t('project_object_title2')" alignTxt="left" colorTxt="secondary" weightTxt="normal"/>
            <div class="mb-6 lg:w-[600px] xs:w-full sm:w-full"><p class="text-base pt-3 lg:text-left md:text-left text-center">
              {{$t('project_object_phrase2')}}</p></div>
            <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true" :starting-from="1" :snap-align="'start'" :navigation="true" :autoplay="6000">
                <Slide key="5"  class="p-2 overflow-hidden  text-left flex flex-col h-[344px]">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/comunity01.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/comunity01.webp')"/> 
                </Slide>
                <Slide key="6" class="p-2 overflow-hidden text-left flex flex-col h-[344px]">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/comunity02.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/comunity02.webp')"/> 
                </Slide>
                <Slide key="8" class="p-2 overflow-hidden text-left flex flex-col h-[344px]">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/comunity04.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/comunity04.webp')"/> 
                </Slide>
                <Slide key="20" class="p-2 overflow-hidden text-left flex flex-col h-[344px]">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/gallery-comu-10.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/gallery-comu-10.webp')"/> 
                </Slide>
                <Slide key="21" class="p-2 overflow-hidden text-left flex flex-col h-[344px]">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/gallery-comu-11.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/gallery-comu-11.webp')"/> 
                </Slide>
                <Slide key="22" class="p-2 overflow-hidden text-left flex flex-col h-[344px]">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/gallery-comu-12.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/gallery-comu-12.webp')"/> 
                </Slide>
                <Slide key="23" class="p-2 overflow-hidden text-left flex flex-col h-[344px]">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/gallery-comu-13.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/gallery-comu-13.webp')"/> 
                </Slide>
                <Slide key="24" class="p-2 overflow-hidden text-left flex flex-col h-[344px]">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/gallery-comu-14.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/gallery-comu-14.webp')"/> 
                </Slide>
                <Slide key="25" class="p-2 overflow-hidden text-left flex flex-col h-[344px]">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/gallery-comu-15.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/gallery-comu-15.webp')"/> 
                </Slide>
                <template #addons>
                  <Pagination class="mt-12"/>
                </template> 
            </Carousel>
        </AtomsContainer>
    </section>
</template>

<script setup lang="ts">
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['openModal']);

const config = useRuntimeConfig();
const urlImg = config.public.url_base;

const carouselItemsToShow = ref(1.1);

const breakpoints = {
  mobile: 767,
};

const updateItemsToShow = () => {
  carouselItemsToShow.value = window.innerWidth >= breakpoints.mobile ? 2.4 : 1.1;
};

onMounted(() => {
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemsToShow);
});
</script>

<style scoped>
.carousel__item { display: flex; gap: 1rem; width: 100%; box-sizing: border-box; }
.carousel__slide { scroll-snap-stop: auto; flex-shrink: 0; margin: 0; position: relative; display: flex; justify-content: start; align-items: start; transform: translateZ(0); }
:deep(.carousel__pagination-button) { padding: 0; margin: 5px; cursor: pointer; border: 1px solid #a0aec0; background-color: transparent; border-radius: 50%; width: 10px; height: 10px; }
:deep(.carousel__pagination-button--active) { background-color: rgb(22, 141, 103); border-color: rgb(22, 141, 103); }
:deep(.carousel__pagination-button::after) { display: none; }
</style>