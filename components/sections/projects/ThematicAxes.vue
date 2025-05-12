<template>
    <section class=" p-24 max-sm:px-1 scroll-snap-align-start">
        <AtomsContainer >
            <div class="flex flex-col lg:flex-row gap-4 my-3" id="bio">
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
            
            <Carousel :items-to-show="carouselItemsToShow1" :wrap-around="true" :starting-from="1" :snap-align="'start'" :navigation="true" :autoplay="8000">
                <Slide  key="1" class="p-2 overflow-hidden text-left flex flex-col h-102 items-start">
                    <NuxtImg :src="`${urlImg}/images/project/yacutinga.webp`" class=" w-full h-84  rounded-2xl mx-1" alt="" @click="openModal('/images/project/yacutinga.webp')" /> 
                    <p class="text-left w-full text-base text-[#515151] mt-3"><strong>{{$t('project_thematicAxes_slide1')}}</strong> | {{$t('project_thematicAxes_slide1d')}}</p>
                    <p class="text-left w-full text-sm text-[#515151] mb-8"><span class="text-[#EF5555] text-lg mr-3">•</span>{{$t('project_thematicAxes_slide1p')}}</p>
                    
                </Slide>
                <Slide key="2" class="p-2 overflow-hidden text-left  flex-col h-102 items-start">
                    <NuxtImg :src="`${urlImg}/images/project/yaguarete.webp`" class="w-full h-84 rounded-2xl mx-1" alt="" @click="openModal('/images/project/yaguarete.webp')"/>
                    <p class="text-left w-full text-base text-[#515151] mt-3"><strong>{{$t('project_thematicAxes_slide2')}}</strong> | {{$t('project_thematicAxes_slide2d')}}</p>
                    <p class="text-left w-full text-sm text-[#515151] mb-8"><span class="text-[#EF5555] text-l mr-3">•</span>{{$t('project_thematicAxes_slide2p')}}</p>
                </Slide>
                <Slide key="3"  class="p-2 overflow-hidden text-left  flex-col  h-102 items-start">
                    <NuxtImg :src="`${urlImg}/images/project/sapitorojo.webp`" class=" w-full h-84 rounded-2xl mx-1" alt="" @click="openModal('/images/project/sapitorojo.webp')"/> 
                    <p class="text-left w-full text-base text-[#515151] mt-3"><strong>{{$t('project_thematicAxes_slide3')}}</strong> | {{$t('project_thematicAxes_slide3d')}}</p>
                    <p class="text-left w-full text-sm text-[#515151]"><span class="text-[#EF5555] text-lg mr-3">•</span>{{$t('project_thematicAxes_slide3p')}}</p>
                </Slide>
                <Slide key="4"  class="p-2 overflow-hidden text-left  flex-col  h-102 items-start">
                    <NuxtImg :src="`${urlImg}/images/project/tapeti.webp`" class=" w-full h-84 rounded-2xl mx-1" alt="" @click="openModal('/images/project/tapeti.webp')"/> 
                    <p class="text-left w-full text-base text-[#515151] mt-3"><strong>{{$t('project_thematicAxes_slide4')}}</strong> | {{$t('project_thematicAxes_slide4d')}}</p>
                    <p class="text-left w-full text-sm text-[#515151]"><span class="text-[#EF5555] text-lg mr-3">•</span>{{$t('project_thematicAxes_slide4p')}}</p>
                </Slide> 
                <template #addons>
                  <Pagination />
                </template>               
            </Carousel>
        </AtomsContainer>
        <AtomsContainer class="mt-16">
            <AtomsTitleH2 :texte="$t('project_object_title2')" alignTxt="left" colorTxt="secondary" weightTxt="normal"/>
            <div class="mb-6 lg:w-[600px] xs:w-full sm:w-full" id="com"><p class="text-base pt-3 lg:text-left md:text-left text-center">
              {{$t('project_object_phrase2')}}</p></div>
            <Carousel :items-to-show="carouselItemsToShow2" :wrap-around="true" :starting-from="1" :snap-align="'start'" :navigation="true" :autoplay="6000">
                <Slid key="5"  class="p-2 overflow-hidden  text-left flex flex-col h-90">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/comunity01.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/project/comunity01.webp')"/> 
                </Slid>
                <Slide key="6" class="p-2 overflow-hidden text-left flex flex-col h-90">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/comunity02.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/project/comunity02.webp')"/> 
                </Slide>
                <Slide key="7" class="p-2 overflow-hidden text-left flex flex-col h-90">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/comunity03.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/project/comunity03.webp')" /> 
                </Slide>
                <Slide key="8" class="p-2 overflow-hidden text-left flex flex-col h-90">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/comunity04.webp`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/project/comunity04.webp')"/> 
                </Slide>
                <template #addons>
                  <Pagination />
                </template> 
            </Carousel>
        </AtomsContainer>
        <AtomsContainer class="mt-16">
          <div class="flex flex-col lg:flex-row gap-4 my-3" id="tec">
            <div class="w-full lg:w-1/2"><AtomsTitleH2 :texte="$t('project_object_title3')" alignTxt="left" colorTxt="secondary" weightTxt="normal"/>
              <div class="mb-6 lg:w-full xs:w-full sm:w-full">
                <p class="text-base pt-3 lg:text-left md:text-left text-center">{{$t('project_object_phrase3')}}</p>
              </div>
            </div>
            <div class="w-full lg:w-1/2 flex justify-center items-center gap-4">
              <div class="rounded-[32px] bg-primary-50 p-4 lg:p-8 grid grid-cols-3 grid-rows-2 gap-4">
                  <div class="flex items-center justify-start font-bold text-sm lg:text-base hover:text-primary-500 ">
                      <NuxtImg :src="`${urlImg}/images/project/checked.svg`" :alt="$t('project_data_c2_title')" class="w-4 lg:w-6 mr-1 lg:mr-3"/>{{$t('project_thematicAxes_box3')}}
                  </div>
                  <div class="flex items-center justify-start font-bold text-sm lg:text-base hover:text-primary-500 ">
                      <NuxtImg :src="`${urlImg}/images/project/checked.svg`" :alt="$t('project_data_c2_title')" class="w-4 lg:w-6 mr-1 lg:mr-3"/>{{$t('project_thematicAxes_box4')}}
                  </div>
                  <div class="flex items-center justify-start font-bold text-sm lg:text-base hover:text-primary-500 ">
                      <NuxtImg :src="`${urlImg}/images/project/checked.svg`" :alt="$t('project_data_c2_title')" class="w-4 lg:w-6 mr-1 lg:mr-3"/>{{$t('project_thematicAxes_box5')}}
                  </div>
                  <div class="col-span-2 row-start-2">
                      <div class="flex items-center justify-start font-bold text-sm lg:text-base hover:text-primary-500 ">
                        <NuxtImg :src="`${urlImg}/images/project/checked.svg`" :alt="$t('project_data_c2_title')" class="w-4 lg:w-6 mr-1 lg:mr-3"/>{{$t('project_thematicAxes_box6')}}
                    </div>
                  </div>
                  <div class="col-start-3 row-start-2">
                    <div class="flex items-center justify-start font-bold text-sm lg:text-base hover:text-primary-500 ">
                        <NuxtImg :src="`${urlImg}/images/project/checked.svg`" :alt="$t('project_data_c2_title')" class="w-4 lg:w-6 mr-1 lg:mr-3"/>{{$t('project_thematicAxes_box7')}}
                    </div>
                  </div>                        
              </div>
            </div>
          </div>

            <Carousel :items-to-show="carouselItemsToShow3" :wrap-around="true" :starting-from="1" :snap-align="'start'" :navigation="true" :autoplay="8000">
                <Slide key="9" class="p-2 overflow-hidden text-left flex flex-col h-90">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/capacita01.jpg`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/project/capacita01.jpg')"/> 
                </Slide>
                <Slide key="10" class="p-2  overflow-hidden text-left flex flex-col h-90">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/capacita02.jpg`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/project/capacita02.jpg')"/> 
                </Slide>
                <Slide key="11" class="p-2 overflow-hidden text-left flex flex-col h-90">
                    <NuxtImg format="webp" :src="`${urlImg}/images/project/capacita03.jpg`" class="w-full h-84 aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/project/capacita03.jpg')" /> 
                </Slide>
                <template #addons>
                  <Pagination />
                </template> 
            </Carousel>
        </AtomsContainer>  
            <!-- Modal -->
    <div v-if="isModalOpen" @click="closeModal"  class="fixed top-0 bottom-0 left-0 right-0 inset-0 z-1070 bg-black bg-opacity-80 flex items-center justify-center" >
      <div class=" p-4 h-full overflow-hidden relative flex items-center justify-center">
        <div class="relative max-h-full"> 
          <div class="absolute top-0 right-0 z-1060 flex justify-center">
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 bg-white rounded-full p-3" aria-label="cerrar modal">
              <IconsCloseIco />
            </button>
          </div>
          <NuxtImg format="webp" :src="`${urlImg}${selectedImage}`" alt="Selected Image" class="max-sm:h-auto max-sm:w-auto h-screen w-auto z-60" />
        </div>
      </div>
    </div>              
    </section>
</template>


<script setup lang="ts">
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { ref, onMounted, onBeforeUnmount } from 'vue';
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const selectedImage = ref('');
const isModalOpen = ref(false);
const name = 'WrapAround';

const carouselItemsToShow1 = ref(1.1);
const carouselItemsToShow2 = ref(1.1);
const carouselItemsToShow3 = ref(1.1);

// Define breakpoints
const breakpoints = {
  mobile: 767,
};

const updateItemsToShow = () => {
  carouselItemsToShow1.value = window.innerWidth >= breakpoints.mobile ? 2.4 : 1.1;
  carouselItemsToShow2.value = window.innerWidth >= breakpoints.mobile ? 2.4 : 1.1;
  carouselItemsToShow3.value = window.innerWidth >= breakpoints.mobile ? 2.4 : 1.1;
};

// Update on window resize
onMounted(() => {
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemsToShow);
});

const openModal = (image: string) => {
  selectedImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
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
</style>
