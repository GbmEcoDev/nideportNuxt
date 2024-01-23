<template>
    <section class="pt-32 md:pt-32 relative bg-white dark:bg-transparent scroll-snap-align-start overflow-y-hidden">
      <AtomsContainer>
        <AtomsTitleH2 alignTxt="center" colorTxt="primary" weightTxt="normal" :texte="$t('home_partner_title')" />

          <div class="flex-col items-center justify-center mt-16">
            <div class="flex flex-wrap pt-8 md:pt-8 pb-2 md:pb-2 items-center justify-center">
                <template v-for="partner in partners" :key="partner.alt">
                    <div class="w-full md:w-1/2 lg:w-1/6 xl:w-1/6 flex justify-center max-sm:items-center " data-aos="fade-up">
                      <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" width="185px" class="max-sm:mx-4" />
                    </div>
                </template>
            </div>
            <div class="flex flex-wrap pt-2 md:pt-2 pb-14 md:pb-14 items-center justify-center">
                <template v-for="partner in partners2" :key="partner.alt">
                    <div class="w-full md:w-1/2 lg:w-1/6 xl:w-1/6 flex justify-center max-sm:items-center" data-aos="fade-up">
                      <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" width="185" class="max-sm:mx-4" />
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
  const partners = ref([
    { logo: '/images/partners/logo-embarca.png', alt: 'Embarca' },
    { logo: '/images/partners/logo-alma.png', alt: 'Alma' },
    { logo: '/images/partners/logo-drapercygnus.svg', alt: 'Draper Cygnus' },
  ]);

  const partners2 = ref([
    { logo: '/images/partners/logo-ecosecurities.png', alt: 'EcoSecurities' },
    { logo: '/images/partners/logo-climatech.png', alt: 'Climatech' },
    { logo: '/images/partners/logo-amcham.png', alt: 'AmCham' },
  ]);
  </script>