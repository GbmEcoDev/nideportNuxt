<template>
    <section class="pt-32 md:pt-32 relative bg-white dark:bg-transparent scroll-snap-align-start overflow-y-hidden">
      <AtomsContainer>
        <AtomsTitleH2 alignTxt="center" colorTxt="primary" weightTxt="normal" :texte="$t('home_partner_title')" />

          <div class="flex-col items-center justify-center mt-16">
            <div class="flex flex-wrap pt-8 md:pt-8 pb-2 md:pb-2 items-center justify-center">
                <template v-for="partner in partners" :key="partner.alt">
                    <div class="w-full md:w-1/2 lg:w-1/6 xl:w-1/6 flex justify-center max-sm:items-center " data-aos="fade-up">
                      <NuxtLink :to="partner.url" target="_blank" rel="noopener">
                        <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" width="185px" class="max-sm:mx-4" />
                      </NuxtLink>
                    </div>
                </template>
            </div>
            <div class="flex flex-wrap pt-2 md:pt-2 pb-14 md:pb-14 items-center justify-center">
                <template v-for="partner in partners2" :key="partner.alt">
                    <div class="w-full md:w-1/2 lg:w-1/6 xl:w-1/6 flex justify-center max-sm:items-center" data-aos="fade-up">
                      <NuxtLink :to="partner.url" target="_blank" rel="noopener">
                        <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" width="185" class="max-sm:mx-4" />
                      </NuxtLink>
                    </div>
                </template>
            </div>
          </div>

      </AtomsContainer>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  const config = useRuntimeConfig();
  const urlImg = config.public.url_base;
  /*
    https://www.embarca.tech/
    https://almavest.com/
    https://drapercygnus.vc/
    https://www.ecosecurities.com/
    https://www.climatech.ar/
    https://amcham.com.ar/
    https://mesacarbono.org.ar/
   */
  const partners = ref([
    { logo: '/images/partners/logo-embarca.png', alt: 'Embarca', url:'https://www.embarca.tech/' },
    { logo: '/images/partners/logo-alma.png', alt: 'Alma', url:'https://almavest.com/' },
    { logo: '/images/partners/logo-drapercygnus.svg', alt: 'Draper Cygnus', url:'https:///drapercygnus.vc/' },
    { logo: '/images/partners/logo-mesa.png', alt: 'Mesa Carbono', url:'https://mesacarbono.org.ar/' },
    
  ]);

  const partners2 = ref([
    { logo: '/images/partners/logo-ecosecurities.png', alt: 'EcoSecurities', url:'https://www.ecosecurities.com/' },
    { logo: '/images/partners/logo-climatech.png', alt: 'Climatech', url:'https://www.climatech.ar/' },
    { logo: '/images/partners/logo-amcham.png', alt: 'AmCham', url:'https://amcham.com.ar/' },
  ]);
  </script>