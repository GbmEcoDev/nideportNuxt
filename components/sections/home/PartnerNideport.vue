<template>
    <section class="pt-16 md:pt-32 lg:pt-32 relative bg-white  scroll-snap-align-start overflow-y-hidden w-full">
        <AtomsTitleH2 alignTxt="center" colorTxt="secondary" weightTxt="bold" :texte="$t('home_partner_title')" />
          <div class="flex-col items-center justify-center mt-8 mb-24">
            <div class="flex flex-wrap pt-8 md:pt-8 pb-2 md:pb-2 items-center justify-center lg:px-36 xl:px-36 md:px-24">
                <template v-for="partner in partners" :key="partner.alt">
                    <div class="flex justify-center max-sm:items-center mx-2">
                      <NuxtLink :to="partner.url" target="_blank" rel="noopener">
                        <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" width="185px" class="mt-8 max-sm:mx-3 grayscale-50 hover:scale-110 hover:grayscale-0 " />
                      </NuxtLink>
                    </div>
                </template>
            </div>
          </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  const config = useRuntimeConfig();
  const urlImg = config.public.url_base;

  const partners = ref([
    { logo: '/images/partners/logo-embarca.png', alt: 'Embarca', url:'https://www.embarca.tech/' },
    { logo: '/images/partners/alma-logo.png', alt: 'Alma', url:'https://almavest.com/' },
    { logo: '/images/partners/logo-drapercygnus.svg', alt: 'Draper Cygnus', url:'https:///drapercygnus.vc/' },
    { logo: '/images/partners/logo-mesa-min.png', alt: 'Mesa Carbono', url:'https://mesacarbono.org.ar/' },
    { logo: '/images/partners/logo-ecosecurities.webp', alt: 'EcoSecurities', url:'https://www.ecosecurities.com/' },
    { logo: '/images/partners/logo-climatech.png', alt: 'Climatech', url:'https://www.climatech.ar/' },
    { logo: '/images/partners/logo-amcham.png', alt: 'AmCham', url:'https://amcham.com.ar/' },
  ]);
  </script>