<template>
    <div class="relative overflow-hidden bg-cover bg-no-repeat h-[44rem] z-0">
    <video v-if="isDesktop"
      autoplay
      loop
      muted
      preload="none"
      class="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      poster="/images/hero_nideport_poster.webp"
      
      >
      <source
        :src="`${urlImg}/video/hero_nideport.mp4`"
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
      
      >
      <source
        :src="`${urlImg}/video/hero-nideport-min.mp4`"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video> 
   <NuxtImg :src="`${urlImg}/images/hero-home-min.webp`" width="1060" class="w-full object-cover rounded-2 h-full" alt="Panoramic Forest"/>  <!-- -->
    <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden hero bg-fixed">
          <AtomsContainer>
            <div class="flex h-full items-center justify-center ">
              <div class="flex max-sm:flex-col w-11/12 gap-4 mt-32 md:mt-60 lg:mt-60">
                  <div class="flex justify-end max-sm:justify-center max-sm:mx-auto w-[300px]">
                    <NuxtImg :src="`${urlImg}/images/imagonideport.svg`" width="236" class="max-w-none w-[14.75rem] h-auto max-sm:w-[150px] max-sm:h-[150px]" alt="Logo Nideport"/>
                    <!--  <ElementsImagoLogo width="236" class="max-w-none w-[14.75rem] h-auto max-sm:w-[150px] max-sm:h-[150px]" />-->
                    <!-- <object alt="Logo Nideport" :data="`${urlImg}/images/logo-imago.svg`" width="236" class="max-w-none w-[14.75rem] h-auto max-sm:w-[150px] max-sm:h-[150px]"></object>
                   --></div>
                  <div class="text-left text-white md:px-5 col-span-2">
                    <h1 class="mt-10  mb-2  font-bold text-[2rem] leading-8 md:leading-9 lg:leading-10 md:text-4xl lg:text-5xl xl:text-5xl  max-sm:text-center max-sm:mt-2">
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
  /*background: linear-gradient(90deg, rgba(0, 0, 0, 0.80) 30%, rgba(0, 0, 0, 0.00) 100%);*/
  background:  rgba(0, 0, 0, 0.40);
}
</style>