<template>
    <div class="relative overflow-hidden bg-cover bg-no-repeat h-screen z-0 scroll-snap-align-start" id="map" style="
        background-position: 50%;
        background-image: url('/images/hero-home-min.webp');
        background-size: cover;
      ">
      <template v-if="showVideo">
        <SectionsHomeVideoBackground
          videoSrc='https://storage.googleapis.com/cdn-web-nideport/map-fly.mp4'
        />
      </template>

<!--       <video 
      autoplay
      loop
      muted
      preload="none"
      class="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      poster="/images/hero-home-min.webp"
      loading="lazy"
      >
      <source
        :src="`${urlImg}/video/map-fly.mp4`"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video> -->

    <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden parcialover bg-[hsla(0,0%,0%,0.10)] bg-fixed">
      <div class="flex h-full items-center justify-center">
        <AtomsContainer>
          <div class="flex flex-col items-center justify-center px-24 text-center text-white md:px-32 max-sm:px-2">
            <h1 class="mt-2 mb-16  font-bold text-[2rem] md:text-4xl lg:text-5xl xl:text-5xl  leading-8 md:leading-9 lg:leading-10">
              {{$t('home_map_title')}}
            </h1>
            <div class="flex items-center min-w-max relative">
                <AtomsLinkBtn :href="localePath({ name: 'tech' })" variant="cta" widthBtn="w-[300px]">
                  {{$t('home_map_button')}}
                </AtomsLinkBtn>
            </div>
          </div>
        </AtomsContainer>
      </div>
    </div>
  </div>
  
</template>
<script setup>
import { ref, onMounted } from 'vue';
const localePath = useLocalePath()

const showVideo = ref(false);

onMounted(() => {
  setTimeout(() => {
    showVideo.value = true;
  }, 500);
});
</script>
<style scoped>
.parcialover{
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.80) 30%, rgba(0, 0, 0, 0.00) 100%);
}
</style>