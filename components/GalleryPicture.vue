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

        <div class="relative w-full h-auto md:w-auto md:h-full lg:w-auto lg:h-full p-4 flex items-center justify-center" @click.stop> 
          <NuxtImg format="webp" :src="`${urlImg}${selectedImage}`" alt="Selected Image" class=" h-full w-auto z-60" />
        </div>
        <div class="absolute z-[1100] top-[8px] right-[8px] flex justify-center">
          <button @click="closeModal" class="text-white hover:text-gray-100 bg-transparent border rounded-full p-1" aria-label="Cerrar Modal">
            <IconsCloseIco />
          </button>
      </div>
      <div  v-if="!isFirstImage" class="absolute top-1/2 left-[8px] flex items-center justify-between p-1 z-[1100]" @click.stop>
          <button @click="prevImage" class="text-white hover:text-gray-100 bg-transparent border rounded-full p-1 " aria-label="Imagen anterior">
            <IconsPrevIco />
          </button>
        </div>
        <div v-if="!isLastImage" class="absolute top-1/2 right-[8px] flex items-center justify-between p-1 z-[1100]" @click.stop>
          <button @click="nextImage" class="text-white hover:text-gray-100 bg-transparent border rounded-full p-1" aria-label="Imagen posterior">
            <IconsNextIco />
          </button>
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


const hasMoreImages = computed(() => props.images.length > 8);

const isLastImage = computed(() => {
  return displayedImages.value[displayedImages.value.length - 1] === selectedImage.value;
});
const isFirstImage = computed(() => {
  return displayedImages.value[0] === selectedImage.value;
});
</script>

<style scoped>
.aspect-ratio-square {
  aspect-ratio: 1 / 1;
}
</style>
