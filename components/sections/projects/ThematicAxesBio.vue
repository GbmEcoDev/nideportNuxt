<template>
    <section class="p-24 max-sm:px-1 scroll-snap-align-start">
        <AtomsContainer>
            <div class="flex flex-col lg:flex-row gap-4 my-3">
                <div class="w-full lg:w-1/2">
                  <AtomsTitleH2 :texte="$t('project_object_title1')" alignTxt="left" colorTxt="secondary" weightTxt="normal"/>
                  <div class="mb-6 lg:w-full xs:w-full sm:w-full">
                      <p class="text-base pt-3 lg:text-left md:text-left text-center">{{$t('project_object_phrase1')}}</p>
                  </div>
                </div>
                <div class="w-full lg:w-1/2 flex gap-4">
                    <div class="rounded-[32px] bg-primary-50 p-6 lg:p-2 flex flex-col justify-center items-center w-full md:w-[16rem] lg:w-[18rem] lg:h-full h-[14rem] md:h-full px-3 sm:px-3 hover:text-gray-500 ">
                        <NuxtImg :src="`${urlImg}/images/objetive-2.svg`" :alt="$t('project_data_c2_title')" class="w-16 pb-0 mx-auto md:pb-1 lg:pb-1"/>
                        <p class="text-md text-center py-1 text-gray-500 mx-8 lg:mx-11">{{$t('project_thematicAxes_box1')}}</p>
                    </div>
                    <div class="rounded-[32px] bg-primary-50 p-6 lg:p-2 flex flex-col justify-center items-center w-full md:w-[16rem] lg:w-[18rem] lg:h-full h-[14rem] md:h-full px-3 sm:px-3 hover:text-gray-500 ">
                        <NuxtImg :src="`${urlImg}/images/project/huella.svg`" :alt="$t('project_data_c3_title')" class="w-16 pb-0 mx-auto md:pb-1 lg:pb-1 "/>
                        <p class="text-md text-center py-1 text-gray-500 mx-8 lg:mx-11 ">{{$t('project_thematicAxes_box2')}}</p>
                    </div>
                </div>
            </div>
            
            <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true" :starting-from="1" :snap-align="'start'" :navigation="true" :autoplay="8000">
                <Slide  key="1" class="p-2 overflow-hidden text-left flex flex-col h-102 items-start">
                    <NuxtImg :src="`${urlImg}/images/project/yacutinga.webp`" class=" w-full h-84  rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/yacutinga.webp')" /> 
                    <p class="text-left w-full text-base text-[#515151] mt-3"><strong>{{$t('project_thematicAxes_slide1')}}</strong> | {{$t('project_thematicAxes_slide1d')}}</p>
                    <p class="text-left w-full text-sm text-[#515151] mb-8"><span class="text-[#EF5555] text-lg mr-3">•</span>{{$t('project_thematicAxes_slide1p')}}</p>
                </Slide>
                <Slide key="2" class="p-2 overflow-hidden text-left  flex-col h-102 items-start">
                    <NuxtImg :src="`${urlImg}/images/project/yaguarete.webp`" class="w-full h-84 rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/yaguarete.webp')"/>
                    <p class="text-left w-full text-base text-[#515151] mt-3"><strong>{{$t('project_thematicAxes_slide2')}}</strong> | {{$t('project_thematicAxes_slide2d')}}</p>
                    <p class="text-left w-full text-sm text-[#515151] mb-8"><span class="text-[#EF5555] text-l mr-3">•</span>{{$t('project_thematicAxes_slide2p')}}</p>
                </Slide>
                <Slide key="3"  class="p-2 overflow-hidden text-left  flex-col  h-102 items-start">
                    <NuxtImg :src="`${urlImg}/images/project/sapitorojo.webp`" class=" w-full h-84 rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/sapitorojo.webp')"/> 
                    <p class="text-left w-full text-base text-[#515151] mt-3"><strong>{{$t('project_thematicAxes_slide3')}}</strong> | {{$t('project_thematicAxes_slide3d')}}</p>
                    <p class="text-left w-full text-sm text-[#515151]"><span class="text-[#EF5555] text-lg mr-3">•</span>{{$t('project_thematicAxes_slide3p')}}</p>
                </Slide>
                <Slide key="4"  class="p-2 overflow-hidden text-left  flex-col  h-102 items-start">
                    <NuxtImg :src="`${urlImg}/images/project/tapeti.webp`" class=" w-full h-84 rounded-2xl mx-1" alt="" @click="emit('openModal', '/images/project/tapeti.webp')"/> 
                    <p class="text-left w-full text-base text-[#515151] mt-3"><strong>{{$t('project_thematicAxes_slide4')}}</strong> | {{$t('project_thematicAxes_slide4d')}}</p>
                    <p class="text-left w-full text-sm text-[#515151]"><span class="text-[#EF5555] text-lg mr-3">•</span>{{$t('project_thematicAxes_slide4p')}}</p>
                </Slide>
                <template #addons>
                  <Pagination />
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
.carousel__item {
  display: flex;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}
.carousel__slide {
  scroll-snap-stop: auto;
  flex-shrink: 0;
  margin: 0;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: start;
  transform: translateZ(0);
}
:deep(.carousel__pagination-button) { padding: 0; margin: 5px; cursor: pointer; border: 1px solid #a0aec0; background-color: transparent; border-radius: 50%; width: 10px; height: 10px; }
:deep(.carousel__pagination-button--active) { background-color: rgb(22, 141, 103); border-color: rgb(22, 141, 103); }
:deep(.carousel__pagination-button::after) { display: none; }
</style>