<template>
  <div class="scroll-snap-align-start">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mb-4">
      <div
        v-for="(image, index) in displayedImages"
        :key="index"
        @click="openModal(image)"
        class="relative overflow-hidden aspect-ratio-square cursor-pointer"
      >
        <NuxtImg format="webp"
          :src="`${urlImg}${image}`"
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

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed top-0 bottom-0 left-0 right-0 inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center" @click="closeModal">
      <div class=" p-4 h-full overflow-hidden relative flex items-center justify-center" @click.stop>
        <div class="relative w-full h-auto md:w-auto md:h-full lg:w-auto lg:h-full"> 
          <div class="absolute top-[-150px] right-[20px] md:top-[20px] md:right-[20px] lg:top-[20px] lg:right-3 z-1060 flex justify-center">
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 bg-white rounded-full p-3" aria-label="Cerrar modal">
              <IconsCloseIco />
            </button>
          </div>
          <NuxtImg format="webp" :src="`${urlImg}${selectedImage}`" alt="Selected Image" class="max-sm:h-auto max-sm:w-auto h-screen w-auto z-60" />
        </div>
          <div class="absolute bottom-[50px] right-1/2   md:bottom-1/2 lg:bottom-1/2 md:left-0 lg:left-0 flex items-center justify-between p-1">
            <button @click="prevImage" class="text-gray-500 hover:text-gray-700 ml-4 bg-white rounded-full p-3 z-60" aria-label="Imagen Anterior">
              <IconsPrevIco />
            </button>
          </div>

          <div class="absolute  bottom-[50px] left-1/2  md:right-0 md:bottom-1/2 lg:bottom-1/2 lg:right-0 z-1040 flex items-center justify-between md:justify-end lg:justify-end p-1">
            <button @click="nextImage" class="text-gray-500 hover:text-gray-700 mr-4 bg-white rounded-full p-3 z-60" aria-label="Imagen Siguiente">
              <IconsNextIco />
            </button>
          </div>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
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
