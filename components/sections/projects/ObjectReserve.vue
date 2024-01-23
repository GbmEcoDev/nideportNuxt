<template>
    <section class="bg-gradient-to-b from-[rgb(1,106,129)] to-[rgb(15,95,57)] p-24 max-sm:px-1 scroll-snap-align-start dark:from-[rgba(1,106,129,0.16)]">
        <AtomsContainer>
            <AtomsTitleH2 :texte="$t('project_object_title1')" alignTxt="center" colorTxt="white" weightTxt="normal"/>
             <div class="mb-6"><p class="text-white text-base pt-10 text-center">
              {{$t('project_object_phrase1')}}
            </p></div> 
            <Carousel :items-to-show="carouselItemsToShow1" :wrap-around="true" :starting-from="1" :snap-align="'start'" :navigation="true">
                <Slide  key="1" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-01.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-01.jpg')" /> 
                </Slide>
                <Slide key="2" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-02.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-02.jpg')"/> 
                </Slide>
                <Slide key="3"  class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-03.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-03.jpg')"/> 
                </Slide>
                <Slide key="4" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-04.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-04.jpg')"/> 
                </Slide>
            </Carousel>
        </AtomsContainer>
        <AtomsContainer class="mt-16">
            <AtomsTitleH2 :texte="$t('project_object_title1')" alignTxt="center" colorTxt="white" weightTxt="normal"/>
            <div class="mb-6"><p class="text-white text-base pt-10 text-center">
              {{$t('project_object_phrase2')}}</p></div>
            <Carousel :items-to-show="carouselItemsToShow2" :wrap-around="true" :starting-from="1" :snap-align="'start'">
                <Slid key="5"  class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-05.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-05.jpg')"/> 
                </Slid>
                <Slide key="6" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-06.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-06.jpg')"/> 
                </Slide>
                <Slide key="7" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-07.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-07.jpg')" /> 
                </Slide>
                <Slide key="8" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-08.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-08.jpg')"/> 
                </Slide>
            </Carousel>
        </AtomsContainer>
        <AtomsContainer class="mt-16">
            <AtomsTitleH2 :texte="$t('project_object_title3')" alignTxt="center" colorTxt="white" weightTxt="normal"/>
            <div class="mb-6"><p class="text-white text-base pt-10 text-center">
              {{$t('project_object_phrase3')}}</p></div>
            <Carousel :items-to-show="carouselItemsToShow3" :wrap-around="true" :starting-from="1" :snap-align="'start'">
                <Slide key="9" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-09.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-09.jpg')"/> 
                </Slide>
                <Slide key="10" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-10.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-10.jpg')"/> 
                </Slide>
                <Slide key="11" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-11.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-11.jpg')" /> 
                </Slide>
                <Slide key="12" class="p-2 overflow-hidden">
                    <NuxtImg :src="`${urlImg}/images/obj-img-12.jpg`" class="w-full aspect-square object-cover rounded-2xl mx-1" alt="" @click="openModal('/images/obj-img-12.jpg')"/> 
                </Slide>
            </Carousel>
        </AtomsContainer>  
            <!-- Modal -->
    <div v-if="isModalOpen" @click="closeModal"  class="fixed top-0 bottom-0 left-0 right-0 inset-0 z-1070 bg-black bg-opacity-80 flex items-center justify-center" >
      <div class=" p-4 h-full overflow-hidden relative flex items-center justify-center">
        <div class="relative max-h-full"> 
          <div class="absolute top-0 right-0 z-1060 flex justify-center">
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 bg-white rounded-full p-3">
              <IconsCloseIco />
            </button>
          </div>
          <NuxtImg :src="`${urlImg}${selectedImage}`" alt="Selected Image" class="max-sm:h-auto max-sm:w-auto h-screen w-auto z-60" />
        </div>
      </div>
    </div>              
    </section>
</template>


<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { ref, onMounted, onBeforeUnmount } from 'vue';
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const selectedImage = ref('');
const isModalOpen = ref(false);
const name = 'WrapAround';

const carouselItemsToShow1 = ref(2.1);
const carouselItemsToShow2 = ref(2.1);
const carouselItemsToShow3 = ref(2.1);

// Define breakpoints
const breakpoints = {
  mobile: 767,
};

const updateItemsToShow = () => {
  carouselItemsToShow1.value = window.innerWidth >= breakpoints.mobile ? 4 : 2.1;
  carouselItemsToShow2.value = window.innerWidth >= breakpoints.mobile ? 4 : 2.1;
  carouselItemsToShow3.value = window.innerWidth >= breakpoints.mobile ? 4 : 2.1;
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
  console.log("cerrando modal");
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
</style>
