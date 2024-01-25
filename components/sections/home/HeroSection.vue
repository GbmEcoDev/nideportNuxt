<template>
    <div class="relative overflow-hidden bg-cover bg-no-repeat h-[44rem] z-0" style="
        background-position: 50%;
        background-image: url('/images/hero-home.webp');
        background-size: cover;
      ">
    <video
    autoplay
    loop
    muted
    class="absolute z-0 w-auto min-w-full min-h-full max-w-none"
    >
    <source
      src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>  
    <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden hero bg-fixed">
          <AtomsContainer>
            <div class="flex h-full items-center justify-center">
              <div class="flex max-sm:flex-col w-5/6 gap-4 mt-60">
                  <div class="flex justify-end max-sm:justify-center max-sm:mx-auto w-[18.75rem]">
                    <NuxtImg src="/images/logo-imago.svg" width="236" class="max-w-none w-[14.75rem] h-auto max-sm:w-[150px] max-sm:h-[150px]" data-aos="fade-up" />
                  </div>
                  <div class="text-left text-white md:px-10 col-span-2">
                    <h1 class="mt-20  mb-2 text-4xl font-bold md:text-4xl xl:text-5x1 max-sm:text-center max-sm:mt-2" data-aos="fade-left">
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

const localePath = useLocalePath()
</script>

<style scoped>
.hero{
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.80) 30%, rgba(0, 0, 0, 0.00) 100%);
}
</style>