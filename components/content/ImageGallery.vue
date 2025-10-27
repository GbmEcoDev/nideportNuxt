<template>
  <div>
    <div class="image-gallery-thumbnails">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image.thumb"
        :alt="image.alt || 'Galería de imágenes'"
        class="thumbnail"
        @click="() => show(index)"
      />
    </div>
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="fullImageUrls"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'

// Definimos las props que el componente recibirá desde el Markdown
const props = defineProps({
  images: {
    type: Array,
    required: true,
    // El validador se asegura de que el array tenga la estructura correcta
    validator: (value) => value.every(img => img.thumb && img.full),
  },
});

const visibleRef = ref(false);
const indexRef = ref(0);

// Extraemos solo las URLs de las imágenes completas para el lightbox
const fullImageUrls = computed(() => props.images.map(img => img.full));

const show = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => {
  visibleRef.value = false;
};
</script>

<style scoped>
.image-gallery-thumbnails {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.thumbnail {
  width: 150px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}
.thumbnail:hover {
  transform: scale(1.05);
}
</style>
