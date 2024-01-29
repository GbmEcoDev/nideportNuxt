<template>
    <section class="pt-20 pb-25 md:pt-24 scroll-snap-align-start">
        <AtomsContainer>
            <div class="grid md:grid-cols-2 gap-4 xl:gap-8 relative">
                <div class="flex md:h-full ">
                    <div
                        class="w-full md:h-full bg-white dark:bg-body pt-10">
                       <AtomsTitleH2 sizeTxt="text-[28px]" alignTxt="left" colorTxt="secondary" weightTxt="bold" class="tracking-tighter" :texte="$t('project_gs1_phrase')" />
                    </div>
                </div>
                <div class="md:py-2 lg:py-4 relative col-span-1 h-full ">
                            <div class="flex justify-center align-middle p-3 relative h-full">
                                <div class="absolute object-center mt-[120px] z-10 " @click="openModal()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="88" height="63" viewBox="0 0 88 63" fill="none">
                                    <path d="M85.9317 10.3904C84.7829 6.65679 81.9109 3.49754 78.1772 2.63592C71.2843 0.625488 43.9998 0.625488 43.9998 0.625488C43.9998 0.625488 16.7154 0.625488 9.82248 2.63592C6.08882 3.78474 3.21677 6.65679 2.06795 10.3904C0.344726 17.2834 0.344727 31.6436 0.344727 31.6436C0.344727 31.6436 0.344726 46.0038 2.06795 52.8968C3.21677 56.6304 6.08882 59.7897 9.82248 60.6513C16.7154 62.3745 43.9998 62.3745 43.9998 62.3745C43.9998 62.3745 71.2843 62.3745 78.1772 60.6513C81.9109 59.5025 84.7829 56.6304 85.9317 52.8968C87.655 46.0038 87.655 31.6436 87.655 31.6436C87.655 31.6436 87.655 17.2834 85.9317 10.3904Z" fill="#F52B2B"/>
                                    <path d="M36.9033 45.6565V19.8081L59.5925 32.7323L36.9033 45.6565Z" fill="white"/>
                                    </svg>
                                </div>
                                <NuxtImg :src="`${urlImg}/images/bg-home-panoramic.webp`" class="w-full rounded-lg"/>
                            </div>
                </div>
            </div>
        </AtomsContainer>
        <!-- Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
        <div class=" p-4 h-full overflow-hidden relative flex items-center justify-center">
            <div class="relative max-h-full"> 
            <div class="absolute top-0 right-0 z-60 flex justify-center">
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 bg-white rounded-full p-3" aria-label="Close modal">
                <IconsCloseIco />
                </button>
            </div>
            <video :src="videoSrc" autoplay class="max-sm:h-auto max-sm:w-auto h-screen w-auto z-60" />
            </div>
        </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const isModalOpen = ref(false);
const videoSrc = ref('/video/GBM_Technology.mp4');
const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

</script>