<template>
  <div
    class="relative overflow-hidden bg-cover bg-no-repeat h-screen z-0"
    style="
        background-position: 50%;
        background-image: url('images/homePoster.webp');
        background-size: cover;
      ">
    <template v-if="showVideo">
      <SectionsHomeVideoBackground
        v-if="isDesktop"
        videoSrc='/video/HomeDesktop.mp4'
      />
      <SectionsHomeVideoBackground
        v-else
        videoSrc='/video/HomeMobile.mp4'
      />
    </template>

    <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden hero bg-fixed">
      <AtomsContainer>
        <div class="flex h-full items-center justify-center">
          <div class="flex max-sm:flex-col w-11/12 gap-4 mt-32 md:mt-60 lg:mt-60">
            <div class="flex justify-end max-sm:justify-center max-sm:mx-auto w-[300px]">
              <NuxtPicture
                :src="`${urlImg}/images/imagonideport.svg`"
                width="236"
                class="max-w-none w-[14.75rem] h-auto max-sm:w-[150px] max-sm:h-[150px]"
                alt="Logo Nideport"
              />
            </div>
            <div class="text-left text-white md:px-5 col-span-2">
              <h1
                class="mt-10 mb-2 font-bold text-[2rem] leading-8 md:leading-9 lg:leading-10 md:text-4xl lg:text-5xl xl:text-5xl max-sm:text-center max-sm:mt-2"
              >
                {{$t('home_title')}}
              </h1>
            </div>
          </div>
        </div>
      </AtomsContainer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const localePath = useLocalePath();
const { isDesktop, isMobile } = useDevice();

const showVideo = ref(false);

onMounted(() => {
  setTimeout(() => {
    showVideo.value = true;
  }, 500);
});
</script>

<style scoped>
.hero {
  background: rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .hero {
    height: 100%; /* 9:16 aspect ratio for mobile */
  }
}
</style>
