<template>
    <div class="relative overflow-hidden bg-cover bg-no-repeat h-[44rem] z-0">
      <video v-if="isDesktop"
      autoplay
      loop
      muted
      preload="none"
      class="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      poster="/images/hero_nideport_poster.webp"
      loading="lazy"
      >
      <source
        :src="`${urlImg}/video/hero-nideport.mp4`"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
    <video v-else
      autoplay
      loop
      muted
      preload="none"
      class="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      poster="/images/hero_nideport_poster.webp"
      loading="lazy"
      >
      <source
        :src="`${urlImg}/video/hero-nideport-min.mp4`"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  <!-- <NuxtImg v-else :src="`${urlImg}/images/hero-home-min.webp`" width="1060" class="w-full object-cover rounded-2 h-full" alt="Panoramic Forest"/>   -->
    <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden hero bg-fixed">
          <AtomsContainer>
            <div class="flex h-full items-center justify-center">
              <div class="flex max-sm:flex-col w-5/6 gap-4 mt-60">
                  <div class="flex justify-end max-sm:justify-center max-sm:mx-auto w-[18.75rem]">
                    <!--  --><ElementsImagoLogo width="236" class="max-w-none w-[14.75rem] h-auto max-sm:w-[150px] max-sm:h-[150px]" />
                    <!-- <img alt="Logo Nideport" :src="`${urlImg}/images/logo-imago.svg`" width="236" class="max-w-none w-[14.75rem] h-auto max-sm:w-[150px] max-sm:h-[150px]" />
                   --></div>
                  <div class="text-left text-white md:px-10 col-span-2">
                    <h1 class="mt-20  mb-2 text-4xl font-bold md:text-4xl xl:text-5x1 max-sm:text-center max-sm:mt-2">
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
const config = useRuntimeConfig()
const urlImg = config.public.url_base
const localePath = useLocalePath()
const { isDesktop } = useDevice();
</script>
<style scoped>
.hero{
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.80) 30%, rgba(0, 0, 0, 0.00) 100%);
}
</style>