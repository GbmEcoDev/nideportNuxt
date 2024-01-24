<template>
    <div 
     class="relative overflow-hidden bg-cover bg-no-repeat h-screen scroll-snap-align-start" style="
        background-position: 50%;
        background-image: url('./images/mapreserve.png');
        background-size: cover;
      ">
    <div
      class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.10)] bg-fixed">
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
</script>