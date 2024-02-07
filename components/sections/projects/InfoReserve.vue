<template>
    <section class="px-12 max-sm:px-3 scroll-snap-align-start">
    <AtomsContainer>
        <AtomsTitleH2 :texte="$t('project_info_title1')" alignTxt="center" colorTxt="secondary" weightTxt="bold" class="mb-20"/>

      <Carousel :items-to-show="carouselItemsToShow1" :wrap-around="true" :starting-from="1" :snap-align="'start'">
        <Slide key="1">
          <div class="carousel__item">
            <div class="flex-col justify- items-center w-full m-4"><div class="h-20"><NuxtImg src="/images/vcs.svg" class="mx-auto w-[58px]"/></div><hr class="mb-4"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_01')}}</p></div>
          </div>
        </Slide>
        <Slide key="2">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4"><div class="h-20"><NuxtImg src="/images/ccb.svg" class="mx-auto w-[58px]"/></div><hr class="mb-4"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_02')}}</p></div>
          </div>
        </Slide>
        <Slide key="3">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4"><div class="h-20"><NuxtImg src="/images/ifm.svg" class="mx-auto w-[58px]"/></div><hr class="mb-4"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_03')}}</p></div>
          </div>
        </Slide>
        <Slide key="4">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4"><div class="h-20"><NuxtImg src="/images/perpetuity.svg" class="mx-auto w-[58px]"/></div><hr class="mb-4"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_04')}}</p></div>
          </div>
        </Slide>
        <Slide key="5">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4"><div class="h-20"><NuxtImg src="/images/surveillance.svg" class="mx-auto w-[58px]"/></div><hr class="mb-4"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_05')}}</p></div>
          </div>
        </Slide>  
      </Carousel>

      <Carousel :items-to-show="carouselItemsToShow2" :wrap-around="true" :starting-from="6" :snap-align="'start'">
        <Slide key="6">
          <div class="carousel__item ">
            <div class="flex-col items-center justify-self-auto w-full m-4"><p class="font-bold text-center text-[#006980] text-6xl h-20 font-[Arial]">1500</p><hr class="mb-4 mx-auto"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_06')}}</p></div>
          </div>
        </Slide>
        <Slide key="7">
          <div class="carousel__item">
            <div class="flex-col items-center justify-self-auto w-full m-4"><p class="font-bold text-center text-[#006980] px-4 text-6xl h-20 font-[Arial]">100</p><hr class="mb-4"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_07')}}</p></div>
          </div>
        </Slide>
        <Slide key="8">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4"><p class="font-bold text-center text-[#006980] px-4 text-6xl h-20 font-[Arial]">66</p><hr class="mb-4"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_08')}}</p></div>
          </div>
        </Slide> 
        <Slide key="9">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4"><p class="font-bold text-center text-[#006980] px-4 text-6xl h-20 font-[Arial]">10</p><hr class="mb-4"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_09')}}</p></div>
          </div>
        </Slide>
        <Slide key="10">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4"><p class="font-bold text-center text-[#006980] px-4 text-6xl h-20 font-[Arial]">0</p><hr class="mb-4"><p class="font-bold text-center text-[#006980] px-4 text-lg h-24">{{$t('project_info_data_10')}} </p></div>
          </div>
        </Slide>
      </Carousel>
     
    </AtomsContainer>
    <AtomsContainer class="mt-16">
        <AtomsTitleH2 :texte="$t('project_info_title2')" alignTxt="center" colorTxt="primary" weightTxt="normal"/>
        <div class="w-full flex justify-center">
            <div class="flex justify-between  gap-10 py-10 px-60 sm:px-10 w-11/12 max-sm:w-full max-sm:flex-col max-sm:px-2">
                <!-- <AtomsLinkBtn href="#" variant="primary">{{$t('project_info_btn_01')}}</AtomsLinkBtn> -->
                <AtomsLinkBtn href="https://registry.verra.org/app/projectDetail/VCS/3630" variant="primary">{{$t('project_info_btn_02')}}</AtomsLinkBtn>
               <!--  <AtomsLinkBtn href="#" variant="primary">{{$t('project_info_btn_03')}}</AtomsLinkBtn> -->
            </div>
        </div>
    </AtomsContainer>
    
    </section>
  </template>
  
  <script setup lang="ts">
  import { Carousel, Slide } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css';
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const name = 'WrapAround';
  
  const carouselItemsToShow1 = ref(2.1);
  const carouselItemsToShow2 = ref(2.1);
  
  // Define breakpoints
  const breakpoints = {
    mobile: 767,
  };
  
  const updateItemsToShow = () => {
    carouselItemsToShow1.value = window.innerWidth >= breakpoints.mobile ? 5 : 2.1;
    carouselItemsToShow2.value = window.innerWidth >= breakpoints.mobile ? 5 : 2.1;
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
    /* justify-content: start; */
    align-items: center;
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
    height: 220px;
  }
  </style>
  