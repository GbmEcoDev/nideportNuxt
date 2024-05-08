<template>
    <section class="relative scroll-snap-align-start ">
       
            <div class="flex-col items-center justify-center p-24 bg-[#e7f8f6] dark:bg-teal-950/80 max-sm:px-10" data-aos="flip-up">
                <AtomsTitleH2 alignTxt="center" sizeTxt="text-2xl md:text-3xl" colorTxt="secondary" weightTxt="bold"  class="mb-4" :texte="$t('home_pillar_phrase')" />
                <SectionsHomeRestorationHa />
                <AtomsTitleH2 alignTxt="center" colorTxt="secondary" weightTxt="bold"  class="mt-4" :texte="$t('home_pillar_phrases')" />
            </div>
            <div class="flex justify-center items-center mt-8 md:mt-24 lg:mt-24 pb-16 h-[454px] max-sm:flex-col">

                    <div class="flex items-center justify-center px-20 w-2/6 h-full max-sm:w-full max-sm:px-2 max-sm:my-8 " data-aos="fade-right">
                    <AtomsTitleH3 :texte="$t('home_pillar_title')"/>
                </div>
                <div class="relative w-4/6 max-sm:w-11/12 h-full">
                    <div 
                        class="flex absolute top-1/2 -left-5 -translate-y-1/2 z-10 transition duration-300 ease-linear" 
                        :class="prevIsVisible?'visible opacity-100':'invisible opacity-0'">
                        <AtomsSwiperNavButton @click="scrollToLeft()">
                            <IconsPrevIco />
                        </AtomsSwiperNavButton>
                    </div>
                    <div  
                        class="flex absolute top-1/2 -right-5 -translate-y-1/2 z-10 transition duration-300 ease-linear" 
                        :class="nextIsVisible?'visible opacity-100':'invisible opacity-0'">
                        <AtomsSwiperNavButton @click="scrollToRight()">
                            <IconsNextIco />
                        </AtomsSwiperNavButton>
                    </div>
                    <div data-slide-recent @scroll="initScroll()" class="flex items-stretch gap-5 overflow-hidden overflow-x-auto invisible-scroll h-full max-sm:w-full max-sm:snap-x">
                            <div data-aos="fade-up"
                                class="w-9/12 min-w-[91.666667%] xs:w-80 xs:min-w-[20rem] md:w-2/3 md:min-w-[66.66666%] lg:w-2/4 lg:min-w-[33%] h-full hover:rotate-1 max-sm:snap-center"  >
                              <CardsNidePillar :title="$t('home_pillar_c1_title')" cover-image="/images/pilar-restauracion-min.webp"
                              :description="$t('home_pillar_c1_phrase')" />
                            </div>
                            <div data-aos="fade-up"
                                class="w-9/12 min-w-[91.666667%] xs:w-80 xs:min-w-[20rem] md:w-2/3 md:min-w-[66.66666%] lg:w-2/4 lg:min-w-[33%] h-full hover:rotate-1 max-sm:snap-center" ><!-- @click="() => toggleModal('PillarTwo')" -->
                             <CardsNidePillar :title="$t('home_pillar_c2_title')" cover-image="/images/pilar-biodiversidad-min.webp"
                             :description="$t('home_pillar_c2_phrase')" />
                            </div>
                            <div data-aos="fade-up"
                                class="w-9/12 min-w-[91.666667%] xs:w-80 xs:min-w-[20rem] md:w-2/3 md:min-w-[66.66666%] lg:w-2/4 lg:min-w-[33%] h-full hover:rotate-1 max-sm:snap-center">
                                <CardsNidePillar :title="$t('home_pillar_c3_title')" cover-image="/images/pilar-comunidad-min.webp"
                                :description="$t('home_pillar_c3_phrase')" />
                            </div>
                            <div data-aos="fade-up"
                                class="w-9/12 min-w-[91.666667%] xs:w-80 xs:min-w-[20rem] md:w-2/3 md:min-w-[66.66666%] lg:w-2/4 lg:min-w-[33%] h-full hover:rotate-1 max-sm:snap-center" >
                                <CardsNidePillar :title="$t('home_pillar_c4_title')" cover-image="/images/pilar-tecnologia-min.webp"
                                :description="$t('home_pillar_c4_phrase')" />
                            </div>
                            <div data-aos="fade-up"
                                class="w-9/12 min-w-[91.666667%] xs:w-80 xs:min-w-[20rem] md:w-2/3 md:min-w-[66.66666%] lg:w-2/4 lg:min-w-[33%] h-full hover:rotate-1 max-sm:snap-center">
                                <CardsNidePillar :title="$t('home_pillar_c5_title')" cover-image="/images/pilar-seguridad-min.webp"
                                :description="$t('home_pillar_c5_phrase')" />
                            </div>
                    </div>
                </div>
            </div>

             <!-- Modal 
            <Modal @close="() => toggleModal(null)" :modalActive="modalActive" :content="modalContent || {}" /> -->      
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
/*import Modal from '@/components/Modal.vue';
import ModalsPillarOne from '@/components/modals/PillarOne.vue';
import ModalsPillarTwo from '@/components/modals/PillarTwo.vue';
import ModalsPillarTree from '@/components/modals/PillarTree.vue';
import ModalsPillarFour from '@/components/modals/PillarFour.vue';
import ModalsPillarFive from '@/components/modals/PillarFive.vue';

const modalActive = ref(false);
const modalContent = ref();

const toggleModal = (content: string | null) => {
  modalContent.value = content ? modals.find((modal) => modal.key === content)?.content : {};
  modalActive.value = !modalActive.value;
};

const modals = [
  { key: 'PillarOne', content: ModalsPillarOne },
  { key: 'PillarTwo', content: ModalsPillarTwo },
  { key: 'PillarTree', content: ModalsPillarTree },
  { key: 'PillarFour', content: ModalsPillarFour },
  { key: 'PillarFive', content: ModalsPillarFive },
];
*/
const nextIsVisible = ref(false);
const prevIsVisible = ref(false);
let element: HTMLDivElement | null = null;

onMounted(() => {
  element = document.querySelector("[data-slide-recent]") as HTMLDivElement;
  if (element) {
    initScroll();
  }
});

function initScroll(): void {
  if (!element) return;
  const isAtStart = element.scrollLeft <= 5; 
  const isAtEnd = element.scrollLeft >= element.scrollWidth - element.offsetWidth - 5; 
  prevIsVisible.value = !isAtStart;
  nextIsVisible.value = !isAtEnd;
}

function scrollToLeft(): void {
  if (!element) return;
  element.scrollLeft -= element.clientWidth;
}

function scrollToRight(): void {
  if (!element) return;
  element.scrollLeft += element.clientWidth;
}
</script>