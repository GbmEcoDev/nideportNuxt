<template>
    <section class="px-2 max-sm:px-0 scroll-snap-align-start">
        <AtomsContainer class=" border-0">
          <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true" :starting-from="1" :snap-align="'start'">
            <Slide key="1">
              <div class="carousel__item ">
                  <div class="rounded-[32px] bg-primary bg-opacity-10 p-8 flex-col items-center w-[24.5rem] h-[28,15rem] mx-2 
                  max-sm:p-4 
                  max-sm:w-full 
                  max-sm:h-[28,5rem]
                  max-lg:p-4 
                  max-lg:w-full 
                  max-lg:h-[28,75rem]">
                      <div class="w-full max-sm:mt-10">
                          <NuxtImg src="/images/objetive-1.svg" alt="" class="pb-5 mx-auto"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c1_title')" alignTxt="center" colorTxt="secondary" weightTxt="bold" />
                      <p class="text-md text-center py-8 text-gray-500 dark:text-white">{{$t('project_data_c1_parag')}}</p>
                  </div>
              </div>
            </Slide>
            <Slide key="2">
              <div class="carousel__item">
                  <div class="rounded-[32px] bg-primary bg-opacity-10 p-8 flex flex-col justify-items-center w-[24.5rem] h-[27,5rem] mx-2
                  max-sm:p-4 
                  max-sm:w-full 
                  max-sm:h-[28rem]
                  max-lg:p-4 
                  max-lg:w-full 
                  max-lg:h-[28,75rem]">
                      <div class="w-full max-sm:mt-10">
                          <NuxtImg src="/images/objetive-2.svg" alt="" class="pb-5 mx-auto"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c2_title')" alignTxt="center" colorTxt="secondary" weightTxt="bold" />
                      <p class="text-md text-center py-8 text-gray-500 dark:text-white">{{$t('project_data_c2_parag')}}</p>
                  </div>
              </div>
            </Slide>
            <Slide key="3">
              <div class="carousel__item">
                  <div class="rounded-[32px] bg-primary bg-opacity-10 p-8 flex flex-col justify-items-center w-[24.5rem] h-[28,15rem] mx-2
                  max-sm:p-4 
                  max-sm:w-full 
                  max-sm:h-[28,5rem]
                  max-lg:p-4 
                  max-lg:w-full 
                  max-lg:h-[28,75rem]">
                      <div class="w-full max-sm:mt-10">
                          <NuxtImg src="/images/objetive-3.svg" alt="" class="pb-5 mx-auto"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c3_title')" alignTxt="center" colorTxt="secondary" weightTxt="bold" />
                      <p class="text-md text-center py-8 text-gray-500 dark:text-white">{{$t('project_data_c3_parag')}}</p>
                  </div>
              </div>
            </Slide>
          </Carousel>
        </AtomsContainer>
    </section>
  </template>
  
  <script setup lang="ts">
  import { Carousel, Slide } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css';
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  
  const name = 'WrapAround';
  
  const carouselItemsToShow = ref(1.2);
  
  // Define breakpoints
  const breakpoints = {
    mobile: 767,
  };
  
  const updateItemsToShow = () => {
    carouselItemsToShow.value = window.innerWidth >= breakpoints.mobile ? 3 : 1.2;
  };
  
  // Update on window resize
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
  }
  </style>