<template>
  <section class="py-24 pl-24  max-sm:px-1 scroll-snap-align-start">
    <div>
      <AtomsTitleH2 alignTxt="center" colorTxt="secondary" weightTxt="bold" :texte="$t('home_press_title')" class="mb-2 lg:mb-12"/>
      <Carousel :items-to-show="carouselItemsToShow1" :wrap-around="true" :starting-from="1" :snap-align="'start'" class="py-6 h-[450px]">
        <Slide key="1">
          <div class="carousel__item">
            <div class="flex-col justify- items-center w-full m-4">
                <CardsPress 
                :title="$t('home_press_c1_title')"
                date-press="Septiembre, 2024" 
                cover-image="/images/press/radiobuenosaires.png"
                :description="$t('home_award_c1_phrase')" 
                url-press="https://www.nideport.com/tomas-gonzalez-arata-en-radio-buenos-aires-am-1350/" />
            </div>
          </div>
        </Slide>
        <Slide key="2">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4">
                <CardsPress 
                :title="$t('home_press_c2_title')" 
                date-press="Septiembre, 2024"
                cover-image="/images/press/lanacion.png" 
                :description="$t('home_award_c2_phrase')" 
                url-press="https://www.lanacion.com.ar/economia/negocios/la-empresa-que-convirtio-la-sustentabilidad-en-un-negocio-nid11092024/" />
            </div>
          </div>
        </Slide>
        <Slide key="3">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4">
                <CardsPress 
                :title="$t('home_press_c3_title')" 
                date-press="Septiembre, 2024"
                cover-image="/images/press/lagaceta.png"
                :description="$t('home_award_c3_phrase')" 
                url-press="https://www.lagaceta.com.ar/nota/1052365/sociedad/para-creadores-nideport-salvar-selva-misionera-buen-negocio.html" />
            </div>
          </div>
        </Slide>
        <Slide key="4">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4">
                <CardsPress 
                :title="$t('home_press_c4_title')" 
                date-press="Septiembre, 2024"
                cover-image="/images/press/comunicarse.png"
                :description="$t('home_award_c4_phrase')" 
                url-press="https://www.comunicarseweb.com/noticia/usan-blockchain-para-salvar-los-bosques-nativos" />
            </div>
          </div>
        </Slide>
        <Slide key="5">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4">
                <CardsPress 
                :title="$t('home_press_c5_title')" 
                date-press="Septiembre, 2024"
                cover-image="/images/press/milenium.png"
                :description="$t('home_award_c5_phrase')" 
                url-press="https://open.spotify.com/episode/7B1hpIz25UQTvHVSLv4KtK?si=nwh7rE0CRHOh0AZ72wGKdg&nd=1&dlsi=c8dd36745ab04a18" />
            </div>
          </div>
        </Slide>  
        <Slide key="6">
          <div class="carousel__item">
            <div class="flex-col items-center w-full m-4">
                <CardsPress 
                :title="$t('home_press_c6_title')" 
                date-press="Septiembre, 2024"
                cover-image="/images/press/economiasust.png"
                :description="$t('home_award_c5_phrase')" 
                url-press="https://economiasustentable.com/noticias/esta-startup-financia-la-regeneracion-de-la-selva-misionera-ya-levanto-dolares-un-millon-de-inversores-privados" />
            </div>
          </div>
        </Slide>  
      </Carousel>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
  const config = useRuntimeConfig();
  const urlImg = config.public.url_base;
  const { t, locale } = useI18n();
  const language = locale.value.toUpperCase();
const name = 'WrapAround';

const carouselItemsToShow1 = ref(1.1);
const carouselItemsToShow2 = ref(2.1);

// Define breakpoints
const breakpoints = {
  mobile: 767,
};

const updateItemsToShow = () => {
 /*  carouselItemsToShow1.value = window.innerWidth >= breakpoints.mobile ? 4 : 2.1;
  carouselItemsToShow2.value = window.innerWidth >= breakpoints.mobile ? 4 : 2.1; */
  if (window.innerWidth >= 1200) {
    carouselItemsToShow1.value = 4.3; // Escritorio
  } else if (window.innerWidth >= 768) {
    carouselItemsToShow1.value = 3.1; // Tablet
  } else {
    carouselItemsToShow1.value = 1.1; // Móvil
  }
};

// Update on window resize
onMounted(() => {
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemsToShow);
});
</script>

<style scoped>
.carousel__viewport {
    overflow:visible !important;/*  */
}
.carousel__item {
  display: flex;
  /* justify-content: start; */
  align-items: center;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  height: 390px;
  border-radius: 20px;
  margin:4px 8px;
}
</style>
