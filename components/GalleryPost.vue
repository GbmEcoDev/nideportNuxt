<template>
  <div class="scroll-snap-align-start">
    <div class="grid grid-cols-4 mb-4">
      <div
        v-for="(image, index) in displayedImages"
        :key="index"
        @click="openModal(image)"
        class="relative overflow-hidden aspect-ratio-square cursor-pointer"
      >
        <NuxtImg format="webp"
          :src="`${image}`"
          alt="ImageGallery"
          class="object-cover w-full h-full transition-transform transform scale-100 hover:scale-110"
        />
      </div>
    </div>
    <div class="flex justify-center">
      <AtomsSwiperNavButton @click="prevPage" :disabled="currentPage === 1" class="mr-2">
        <IconsPrevIco />
      </AtomsSwiperNavButton>
      <AtomsSwiperNavButton @click="nextPage" :disabled="currentPage === totalPages">
        <IconsNextIco />
      </AtomsSwiperNavButton>
    </div>

    <div v-if="isModalOpen" class="fixed top-0 bottom-0 left-0 right-0 inset-0 z-[1070] bg-black bg-opacity-80 flex items-center justify-center" @click="closeModal">
      <div class="relative flex items-center justify-center w-full h-1/2 md:w-auto md:h-full lg:w-auto lg:h-full" @click.stop>>
        <div class="absolute z-[1100] top-[-150px] right-[-10px] md:top-[20px] md:right-[-20px] lg:top-[20px] lg:right-[-20px] flex justify-center">
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 bg-white rounded-full p-3" aria-label="Cerrar Modal">
            <IconsCloseIco />
          </button>
        </div>
        <div class="absolute bottom-[-50px] right-1/2 md:bottom-1/2 lg:bottom-1/2 md:left-[-20px] lg:left-[-20px] flex items-center justify-between p-1 z-[1100]">
        <button @click="prevImage" class="text-gray-500 hover:text-gray-700 ml-4 bg-white rounded-full p-3 " aria-label="Imagen anterior">
          <IconsPrevIco />
        </button>
      </div>
      <div class="absolute bottom-[-50px] left-1/2 md:right-[-30px] md:bottom-1/2 lg:bottom-1/2 lg:right-[-30px] z-1040 flex items-center justify-between md:justify-end lg:justify-end p-1 z-[1100]">
        <button @click="nextImage" class="text-gray-500 hover:text-gray-700 mr-4 bg-white rounded-full p-3" aria-label="Imagen posterior">
          <IconsNextIco />
        </button>
      </div>
        <NuxtImg :src="`${selectedImage}`" alt="Selected Image" class="h-auto w-auto z-[1080]" />
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps<{
  images: string[];
}>();

const itemsPerPage = ref(8);
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.images.length / itemsPerPage.value));

const displayedImages = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return props.images.slice(startIndex, endIndex);
});

const isModalOpen = ref(false);
const selectedImage = ref('');

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const openModal = (image: string) => {
  selectedImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  //console.log("cerrando modal");
  isModalOpen.value = false;
};

const nextImage = () => {
  const currentIndex = displayedImages.value.findIndex((image) => image === selectedImage.value);
  const nextIndex = (currentIndex + 1) % displayedImages.value.length;
  selectedImage.value = displayedImages.value[nextIndex];
};

const prevImage = () => {
  const currentIndex = displayedImages.value.findIndex((image) => image === selectedImage.value);
  const prevIndex = (currentIndex - 1 + displayedImages.value.length) % displayedImages.value.length;
  selectedImage.value = displayedImages.value[prevIndex];
};
</script>

<style scoped>
.aspect-ratio-square {
  aspect-ratio: 1 / 1;
}
</style>
