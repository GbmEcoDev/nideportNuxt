<template>
    <section class="px-24 pt-24  max-sm:px-1 scroll-snap-align-start bg-primary bg-opacity-10  ">
        <AtomsContainer>
            <AtomsTitleH2 alignTxt="center" colorTxt="secondary" weightTxt="bold" :texte="$t('home_awards_title')" class="mb-2 lg:mb-12"/>
            <Carousel :items-to-show="carouselItemsToShow1" :wrap-around="true" :starting-from="1" :snap-align="'start'" class="py-6 sm:h-[340px]">
                <Slide key="1">
                  <div class="carousel__item">
                    <div class="flex-col justify- items-center w-full m-4">
                        <CardsAward :title="$t('home_award_c1_title')" cover-image="/images/awards/Award_AmChamArgentina.png"
                                      :description="$t('home_award_c1_phrase')" />
                    </div>
                  </div>
                </Slide>
                <Slide key="2">
                  <div class="carousel__item">
                    <div class="flex-col items-center w-full m-4">
                        <CardsAward :title="$t('home_award_c2_title')" cover-image="/images/awards/Award_CCIFA.png"
                                      :description="$t('home_award_c2_phrase')" />
                    </div>
                  </div>
                </Slide>
                <Slide key="3">
                  <div class="carousel__item">
                    <div class="flex-col items-center w-full m-4">
                        <CardsAward :title="$t('home_award_c3_title')" cover-image="/images/awards/Award_Impacta.png"
                        :description="$t('home_award_c3_phrase')" />
                    </div>
                  </div>
                </Slide>
                <Slide key="4">
                  <div class="carousel__item">
                    <div class="flex-col items-center w-full m-4">
                        <CardsAward :title="$t('home_award_c4_title')" cover-image="/images/awards/Award_ManaTech.png"
                        :description="$t('home_award_c4_phrase')" />
                    </div>
                  </div>
                </Slide>
                <Slide key="5">
                  <div class="carousel__item">
                    <div class="flex-col items-center w-full m-4">
                        <CardsAward :title="$t('home_award_c5_title')" cover-image="/images/awards/Award_BCG.png"
                        :description="$t('home_award_c5_phrase')" />
                    </div>
                  </div>
                </Slide>  
              </Carousel>
        </AtomsContainer>
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
const carouselItemsToShow2 = ref(1.1);

// Define breakpoints
const breakpoints = {
  mobile: 767,
};

const updateItemsToShow = () => {
/*   carouselItemsToShow1.value = window.innerWidth >= breakpoints.mobile ? 5 : 2.1;
  carouselItemsToShow2.value = window.innerWidth >= breakpoints.mobile ? 5 : 2.1; */
  if (window.innerWidth >= 1200) {
    carouselItemsToShow1.value = 5; // Escritorio
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
    overflow: visible !important;
}

.carousel__item {
  display: flex;
  /* justify-content: start; */
  align-items: center;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 20px;
  margin:0px 8px; /* */
}
</style>
