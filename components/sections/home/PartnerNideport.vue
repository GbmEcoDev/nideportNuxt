<template>
    <section class="pt-16 md:pt-32 lg:pt-32 pb-6 relative bg-white  scroll-snap-align-start overflow-y-hidden w-full">
        <AtomsTitleH2 alignTxt="center" colorTxt="secondary" weightTxt="bold" :texte="$t('home_partner_title')" />
        <Carousel :items-to-show="carouselItemsToShow1" :wrap-around="true" :starting-from="1" :autoplay="1" :transition="5000" :pauseAutoplayOnHover="true" :snap-align="'center'" class="p-0">
          <Slide key="1">
            
            <div class="carousel__item">
              <div class="flex-col justify-center items-center w-full">
                <p class="text-lg text-secondary font-medium text-center">{{$t('home_partner1_title')}} </p>
                  <!-- inversores -->
                  <div class="flex-col items-center justify-center mt-8 mb-8 p-4 lg:mx-36 xl:mx-36 md:mx-24">
                    <div class="flex flex-wrap pb-4 md:pb-2 items-center justify-center">
                        <template v-for="partner in partnersInversor" :key="partner.alt">
                            <div class="flex justify-center gap-8 max-sm:items-center mx-6">
                              <NuxtLink v-if="partner.url !== '#'" :to="partner.url" target="_blank" rel="noopener">
                                <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                              </NuxtLink>
                              <NuxtImg v-else :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                            </div>
                        </template>
                    </div>
                  </div>
              </div>
            </div>
          </Slide>
          <Slide key="2">
            <div class="carousel__item h-fit">
              <div class="flex-col justify- items-center w-full">
                <!-- Mentores -->
                <p class="text-lg text-secondary font-medium text-center">{{$t('home_partner2_title')}} </p>
                <div class="flex-col items-center justify-center mt-8 mb-8 p-4 lg:mx-36 xl:mx-36 md:mx-24">
                    <div class="flex flex-wrap pt-4 md:pt-4 pb-4 md:pb-2 items-center justify-center">
                        <template v-for="partner in partnersMentor" :key="partner.alt">
                            <div class="flex justify-center gap-8 max-sm:items-center mx-6">
                              <NuxtLink v-if="partner.url !== '#'" :to="partner.url" target="_blank" rel="noopener">
                              <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                            </NuxtLink>
                            <NuxtImg v-else :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                            </div>
                        </template>
                    </div>
                  </div> 
              </div>
            </div>
          </Slide>
          <Slide key="3">
            <div class="carousel__item h-fit">
              <div class="flex-col justify- items-center w-full">
              <!-- Asociaciones -->
              <p class="text-lg text-secondary font-medium text-center">{{$t('home_partner3_title')}} </p>
              <div class="flex-col items-center justify-center mt-8 mb-8 p-4 lg:mx-36 xl:mx-36 md:mx-24">
                  <div class="flex flex-wrap pt-4 md:pt-4 pb-4 md:pb-2 items-center justify-center">
                      <template v-for="partner in partnersAsociar" :key="partner.alt">
                          <div class="flex justify-center gap-8  max-sm:items-center mx-6">
                            <NuxtLink v-if="partner.url !== '#'" :to="partner.url" target="_blank" rel="noopener">
                              <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                            </NuxtLink>
                            <NuxtImg v-else :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                          </div>
                      </template>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <Slide key="4">
            <div class="carousel__item h-fit">
              <div class="flex-col justify- items-center w-full">
                <!-- Proveedores -->
                <p class="text-lg text-secondary font-medium text-center">{{$t('home_partner4_title')}} </p>
                <div class="flex-col items-center justify-center mt-8 mb-8 p-4 lg:mx-36 xl:mx-36 md:mx-24">
                    <div class="flex flex-wrap pt-4 md:pt-4 pb-4 md:pb-2 items-center justify-center">
                        <template v-for="partner in partnersProveedor" :key="partner.alt">
                            <div class="flex justify-center gap-8 max-sm:items-center mx-6">
                              <NuxtLink v-if="partner.url !== '#'" :to="partner.url" target="_blank" rel="noopener">
                                <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                              </NuxtLink>
                              <NuxtImg v-else :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                            </div>
                        </template>
                    </div>
                  </div>
              </div>
            </div>
          </Slide>
          <Slide key="5">
            <div class="carousel__item h-fit">
              <div class="flex-col justify- items-center w-full">
                <!-- Partners -->
                <p class="text-lg text-secondary font-medium text-center">{{$t('home_partner5_title')}} </p>
                <div class="flex-col items-center justify-center lg:mx-36 xl:mx-36 md:mx-24">
                  <div class="flex flex-wrap pt-4 md:pt-4 pb-4 md:pb-2 items-center justify-center">
                      <template v-for="partner in partnersPartner" :key="partner.alt">
                          <div class="flex justify-center gap-8 max-sm:items-center mx-6">
                            <NuxtLink v-if="partner.url !== '#'" :to="partner.url" target="_blank" rel="noopener">
                            <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                          </NuxtLink>
                          <NuxtImg v-else :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                          </div>
                      </template>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <Slide key="6">
            <div class="carousel__item h-fit">
              <div class="flex-col justify- items-center w-full ">
                <!-- Partners -->
                <p class="text-lg text-secondary font-medium text-center ">{{$t('home_partner5_title')}} </p>
                <div class="flex-col items-center justify-center lg:mx-36 xl:mx-36 md:mx-24">
                  <div class="flex flex-wrap pt-4 md:pt-4 pb-4 md:pb-2 items-center justify-center">
                      <template v-for="partner in partnersPartner2" :key="partner.alt">
                          <div class="flex justify-center gap-8 max-sm:items-center mx-6">
                            <NuxtLink v-if="partner.url !== '#'" :to="partner.url" target="_blank" rel="noopener">
                            <NuxtImg :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                          </NuxtLink>
                          <NuxtImg v-else :src="`${urlImg}${partner.logo}`" :alt="partner.alt" :width="partner.width" class="mt-4 max-sm:mx-3 " />
                          </div>
                      </template>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <CarouselPagination />
          </template>
        </Carousel>
    </section>
  </template>
  
  <script setup lang="ts">
  import { Carousel, Slide } from 'vue3-carousel';
  import { Pagination as CarouselPagination } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css';
  import { ref } from 'vue';
  const config = useRuntimeConfig();
  const urlImg = config.public.url_base;
  const carouselItemsToShow1 = ref(1);

  const partnersInversor = ref([
    { logo: '/images/partners/draper-cygnus.png', alt: 'Draper Cygnus', url:'https://drapercygnus.vc/', width:'110px' },
    { logo: '/images/partners/alma-logo.png', alt: 'Alma', url:'https://almavest.com/' , width:'111px' },
    { logo: '/images/partners/logo-embarca.png', alt: 'Embarca', url:'https://www.embarca.tech/' , width:'143px' },
  ]);

  const partnersMentor = ref([
    { logo: '/images/partners/ImpactaVc.png', alt: 'ImpactaVc', url:'https://www.impacta.vc/' , width:'147px' },
    { logo: '/images/partners/ManaTech.png', alt: 'Alma', url:'https://tech.manacommon.com/' , width:'124px' },

  ]);

  const partnersAsociar = ref([
    { logo: '/images/partners/logo-amcham.png', alt: 'AmCham', url:'https://amcham.com.ar/' , width:'132px' },
    { logo: '/images/partners/logo-mesa-min.png', alt: 'Mesa Carbono', url:'https://mesacarbono.org.ar/' , width:'160px' },
    { logo: '/images/partners/logo-climatech.png', alt: 'Climatech', url:'https://www.climatech.ar/' , width:'140px' },
    { logo: '/images/partners/endeavor.png', alt: 'Endeavor', url:'https://www.endeavor.org.ar/' , width:'130px' },
    { logo: '/images/partners/espaciobitcoin.png', alt: 'Espacio Bitcoin', url:'https://espacioculturalbitcoin.com/' , width:'158px' },
  ]);
 
  const partnersProveedor = ref([
    { logo: '/images/partners/fotosintesis.png', alt: 'Fotosintesis', url:'https://fotosintesis-fmi.cl/' , width:'130px' },
    { logo: '/images/partners/avesargentinas.png', alt: 'Aves Argentinas', url:'https://www.avesargentinas.org.ar/' , width:'90px' },
    { logo: '/images/partners/logo-ecosecurities.webp', alt: 'EcoSecurities', url:'https://www.ecosecurities.com/' , width:'148px' },
    { logo: '/images/partners/prosustentia.png', alt: 'Prosustentia', url:'https://prosustentia.com/' , width:'150px' },
  ]);
 
  const partnersPartner = ref([
    { logo: '/images/partners/agropro.png', alt: 'AgroPro', url:'https://agropro.ag/' , width:'145px' },
    { logo: '/images/partners/satellitesonfire.png', alt: 'Satellites onFire', url:'https://www.satellitesonfire.com/' , width:'128px' },
    { logo: '/images/partners/virtualestate.png', alt: 'Virtual Estate', url:'https://virtualestate.co/' , width:'88px' },
    { logo: '/images/partners/parsed.png', alt: 'Parsed', url:'https://parsedco.com/' , width:'88px' },
    { logo: '/images/partners/laciudadposible.png', alt: 'La Ciudad Posible', url:'https://www.laciudadposible.net/' , width:'160px' },
    { logo: '/images/partners/calice.png', alt: 'Calice', url:'https://calice.ai/' , width:'85px' },
    { logo: '/images/partners/nunatak.png', alt: 'Nunatak', url:'https://www.nunatakbio.com/' , width:'111px' },
    { logo: '/images/partners/olive.png', alt: 'Olive', url:'#' , width:'52px' },
    { logo: '/images/partners/hyphen.png', alt: 'Hyphen', url:'https://hyphen.earth' , width:'144px' },

  ]);   
  const partnersPartner2 = ref([
    { logo: '/images/partners/teramot.png', alt: 'Teramot', url:'https://teramot.com' , width:'126px' },
    { logo: '/images/partners/reforest.png', alt: 'Reforest', url:'https://reforest-latam.com' , width:'150px' },
    { logo: '/images/partners/pala.png', alt: 'Pala', url:'https://palablockchain.io' , width:'110px' },
    { logo: '/images/partners/eiru.png', alt: 'Eirú', url:'https://eiru.tech' , width:'135px' },
    { logo: '/images/partners/iov.png', alt: 'Iov Foundation', url:'https://www.iovf.org' , width:'140px' },
    { logo: '/images/partners/netto.png', alt: 'Netto', url:'https://www.netto.finance/' , width:'70px' },
    { logo: '/images/partners/Soundtitles.png', alt: 'SoundTitles', url:'https://www.soundtitles.com' , width:'142px' },
    { logo: '/images/partners/kawsay.png', alt: 'Kawsay', url:'https://www.viverokawsay.com/' , width:'110px' },
  ]);   

  </script>

<style scoped>

.carousel__viewport {
    overflow: visible !important;
    height: auto;
}

.carousel__item {
 /*  display: flex;
  justify-content: center; 
  align-items: start;
  gap: 0rem;
  width: 100%;*/
  box-sizing: border-box;
  border-radius: 20px;/* 
  margin:12px;   border: olive 1px solid;*/ height: auto;

}

.carousel {
  --vc-pgn-background-color:rgba(216, 216, 222, 1);
  --vc-pgn-active-color: rgba(2, 163, 39, 1);
  --vc-pgn-border-radius: 4px;
  --vc-pgn-height: 8px;
  --vc-pgn-width: 8px;
}

/* Efecto Fade in/out */
:deep(.carousel__track) {
  transform: none !important;
  width: 100% !important;
}

:deep(.carousel__slide) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 0;
}

:deep(.carousel__slide--active) {
  position: relative;
  opacity: 1;
  z-index: 1;
}

:deep(.carousel__pagination) {
  position: relative;
  z-index: 10;
  margin-top: 50px;
}
</style>