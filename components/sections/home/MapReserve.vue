<template>
    <div class="relative overflow-hidden bg-cover bg-no-repeat h-screen scroll-snap-align-start">
      <video 
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
    </video>
     <!--  <NuxtImg :src="`${urlImg}/images/hero-home-min.webp`" width="1060" class="w-full object-cover rounded-2 h-full" alt="Panoramic Forest"/>  -->
    <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden parcialover bg-[hsla(0,0%,0%,0.10)] bg-fixed">
      <div class="flex h-full items-center justify-center">
        <AtomsContainer>
          <div class="flex flex-col items-center justify-center px-24 text-center text-white md:px-32 max-sm:px-2">
            <h1 class="mt-2 mb-16 text-5xl font-bold md:text-6xl xl:text-7xl">
              {{$t('home_map_title')}}
            </h1>
            <div class="flex items-center min-w-max relative">
                <AtomsLinkBtn :href="localePath({ name: 'tech' })" variant="primary">
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
const localePath = useLocalePath()
const { isDesktop } = useDevice();
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
</script>
<style scoped>
.parcialover{
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.80) 30%, rgba(0, 0, 0, 0.00) 100%);
}
</style>