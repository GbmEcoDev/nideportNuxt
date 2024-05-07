<template>
    <section class="pt-20 pb-25 md:pt-24 scroll-snap-align-start">
        <AtomsContainer>
            <div class="flex-col items-center justify-center  w-full">  
                <div class="w-full md:h-full bg-white dark:bg-body py-10 lg:px-36">
                  <h2 class="font-semibold w-full text-[18px] mt-8 md:mt-4 lg:mt-4 md:text-[32px] lg:text-[32px] text-center sm:text-center md:text-center  leading-5 sm:leading-6 md:leading-8 lg:leading-10 text-secondary  mb-2">{{ $t('project_gs1_phrase') }}</h2>
                </div>
                <div class="w-full md:py-2 lg:py-4 lg:px-36 xs:px-0 sm:px-0">
                  <LiteYouTubeEmbed class="w-full rounded-lg" :id="videoYT" title="Nideport" ref="iframe"/>
                </div>
            </div>
        </AtomsContainer>
        <!-- Modal -->
        <div v-if="isModalOpen" class="fixed top-0 bottom-0 left-0 right-0 inset-0 z-1070 bg-black bg-opacity-80 flex items-center justify-center" >
      <div class=" p-4 h-full overflow-hidden relative flex items-center justify-center">
        <div class="relative max-h-full"> 
          <div class="absolute top-0 right-0 z-1060 flex justify-center">
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 bg-white rounded-full p-3" aria-label="Cerrar Modal">
              <IconsCloseIco />
            </button>
          </div>
          <div class="w-full h-full">
              <!-- video -->muestro video
          </div>
        </div>
      </div>
    </div>
 
    </section>
</template>
<script setup  lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LiteYouTubeEmbed from 'vue-lite-youtube-embed';
import 'vue-lite-youtube-embed/style.css';

interface HTMLIFrameElementWithActions extends HTMLIFrameElement {
  getPlayerInstance: () => HTMLIFrameElement
  stopVideo: () => void
  playVideo: () => void
  pauseVideo: () => void
}
const iframe = ref<HTMLIFrameElementWithActions | null>(null)

const config = useRuntimeConfig();
const { t, locale } = useI18n();
const language = locale.value.toUpperCase();
const urlImg = config.public.url_base;
const isModalOpen = ref(false);
const videoYT = language==="ES" ?  "VsiUfVd2FRU" : "VsiUfVd2FRU";
//const videoYT = language==="ES" ?  "P0jU46x3MoE" : "vSZC_hVBzr0";

const videoSrc = ref('');
const openModal = () => {
    iframe.value?.playVideo();
    videoSrc.value = videoYT;
    isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  iframe.value?.pauseVideo();  
};


</script>
