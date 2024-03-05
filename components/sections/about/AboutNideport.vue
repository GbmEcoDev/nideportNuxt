<template>
    <section class="pt-20 md:pt-24 scroll-snap-align-start">
        <AtomsContainer>
            <div class="relative flex justify-center max-sm:flex-col max-md:flex-col max-lg:flex-col gap-4 xl:gap-8 max-sm:gap-0 rounded-[14px] bg-primary bg-opacity-10 p-3">
                    <div class="flex w-5/12 max-md:w-11/12 md:h-full max-sm:w-full max-lg:w-full mx-auto">
                        <div class="w-full md:h-full p-3 mt-6">
                        <AtomsTitleH2 sizeTxt="text-[28px]" alignTxt="left" colorTxt="fivety" weightTxt="normal" class="tracking-tighter leading-9" :texte="$t('about_phrase1')" />
                        </div>
                    </div>
                    <div class="tips relative w-4/6 h-72 pt-8 max-sm:w-full max-lg:w-full mx-auto">
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
                        <div data-slide-recent @scroll="initScroll()" class="flex gap-5 overflow-hidden overflow-x-auto invisible-scroll h-full max-sm:w-full max-sm:snap-x">
                            
                                <div 
                                    class="flex flex-col items-center w-44 h-60 bg-white dark:bg-transparent pt-10 px-1 rounded-2xl  max-sm:px-0 max-lg:px-0  hover:border-emeralt-600">
                                    <NuxtImg :src="`${urlImg}/images/Forest.svg`" widht="100" alt="Native Forest Restoration"/>
                                    <p class="w-44 text-sm xs:text-2xl sm:text-2xl text-thirdy dark:text-gray-300 text-center mb-14">{{$t('about_c1')}}</p>
                                </div>
                                <div
                                    class="flex flex-col items-center  w-44 h-60 bg-white dark:bg-transparent pt-10 px-4 rounded-2xl  max-sm:px-0 max-lg:px-0  hover:border-emeralt-600">
                                    <NuxtImg :src="`${urlImg}/images/Focus.svg`" widht="100" alt="Strong social Focus"/>
                                    <p class="w-44 text-sm xs:text-2xl sm:text-2xl text-thirdy dark:text-gray-300 text-center mb-14">{{$t('about_c2')}}</p>
                                </div>
                                <div
                                    class="flex flex-col items-center  w-44 h-60 bg-white  dark:bg-transparent pt-10 px-4 rounded-2xl  max-sm:px-0 max-lg:px-0  hover:border-emeralt-600">
                                    <NuxtImg :src="`${urlImg}/images/Bird.svg`" widht="100" alt="Biodiversity Conservation"/>
                                    <p class="text-sm xs:text-2xl sm:text-2xl text-thirdy dark:text-gray-300 text-center mb-14">{{$t('about_c3')}}</p>
                                </div>
                                <div
                                    class="flex flex-col items-center  w-44 h-60 bg-white dark:bg-transparent  pt-10 px-1 rounded-2xl  max-sm:px-0 max-lg:px-0 hover:border-emeralt-600">
                                    <NuxtImg :src="`${urlImg}/images/Seedling.svg`" widht="100" alt="Natural Capital Preservation"/>
                                    <p class="w-44 text-sm xs:text-2xl sm:text-2xl text-thirdy dark:text-gray-300 text-center mb-14">{{$t('about_c4')}}</p>
                                </div>
                                <div
                                    class="flex flex-col items-center  w-44 h-60 bg-white dark:bg-transparent  pt-10 px-1 rounded-2xl  max-sm:px-0 max-lg:px-0 hover:border-emeralt-600">
                                    <NuxtImg :src="`${urlImg}/images/Leaf.svg`" widht="100" alt="Estrategy"/>
                                    <p class="w-44 text-sm xs:text-2xl sm:text-2xl text-thirdy dark:text-gray-300 text-center mb-14">{{$t('about_c5')}}</p>
                                </div>
                                <div
                                    class="flex flex-col items-center  w-44 h-60 bg-white dark:bg-transparent  pt-10 px-1 rounded-2xl  max-sm:px-0 max-lg:px-0 hover:border-emeralt-600">
                                    <NuxtImg :src="`${urlImg}/images/Plug.svg`" widht="100" alt="Climate"/>
                                    <p class="w-44 text-sm xs:text-2xl sm:text-2xl text-thirdy dark:text-gray-300 text-center mb-14">{{$t('about_c6')}}</p>
                                </div>
                                <div
                                    class="flex flex-col items-center  w-44 h-60 bg-white dark:bg-transparent  pt-10 px-1 rounded-2xl  max-sm:px-0 max-lg:px-0 hover:border-emeralt-600">
                                    <NuxtImg :src="`${urlImg}/images/Lightbulb.svg`" widht="100" alt="Concientizacion"/>
                                    <p class="w-44 text-sm xs:text-2xl sm:text-2xl text-thirdy dark:text-gray-300 text-center mb-14">{{$t('about_c7')}}</p>
                                </div>
                                <div
                                    class="flex flex-col items-center  w-44 h-60 bg-white dark:bg-transparent  pt-10 px-1 rounded-2xl  max-sm:px-0 max-lg:px-0 hover:border-emeralt-600">
                                    <NuxtImg :src="`${urlImg}/images/Security.svg`" widht="100" alt="Security"/>
                                    <p class="w-44 text-sm xs:text-2xl sm:text-2xl text-thirdy dark:text-gray-300 text-center mb-14">{{$t('about_c8')}}</p>
                                </div>
                            
                        </div>
                    </div>
            </div>
        </AtomsContainer>
        <AtomsContainer>
            <div class="flex flex-wrap items-center justify-center pt-36 pb-36">
                <AtomsTitleH2 sizeTxt="text-[1.875rem]" alignTxt="center" colorTxt="fivety" weightTxt="normal" class="pb-5 px-24 max-sm:px-1 max-lg:px-1 font-normal" :texte="$t('about_phrase2')" />
                <!-- <AtomsLinkBtn href="#" variant="primary">{{$t('about_btn')}} </AtomsLinkBtn> -->
            </div>
        </AtomsContainer>
    </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const config = useRuntimeConfig();
const urlImg = config.public.url_base;

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