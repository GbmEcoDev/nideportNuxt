<template>
  <SectionsAboutHeroAbout />
  <SectionsAboutNideport  class="pb-50 pt-50"/>
 <!--  <SectionsAboutOurTeams /> -->
  <GalleryPicture :images="imageList"/>
  <ScrollTop />
</template>

<script setup lang="ts">
import GalleryPicture from '@/components/GalleryPicture.vue';
const route = useRoute();
const imageList = ref([
'/images/gallery/gallery-01.jpg',
'/images/gallery/gallery-02.jpg',
'/images/gallery/gallery-03.png',
'/images/gallery/gallery-04.jpg',
'/images/gallery/gallery-05.jpg',
'/images/gallery/gallery-06.jpg',
'/images/gallery/gallery-07.png',
'/images/gallery/gallery-08.jpg',
'/images/gallery/gallery-01.jpg',
'/images/gallery/gallery-02.jpg',
'/images/gallery/gallery-03.png',
'/images/gallery/gallery-05.jpg',
'/images/gallery/gallery-04.jpg',
'/images/gallery/gallery-06.jpg',
'/images/gallery/gallery-07.png',
'/images/gallery/gallery-08.jpg',
'/images/gallery/gallery-01.jpg',
'/images/gallery/gallery-02.jpg',
'/images/gallery/gallery-03.png',
'/images/gallery/gallery-04.jpg',

]);

useHead({
    title: 'Nuestra Misión: Desarrollar Proyectos de Créditos de Carbono Sostenibles',
    meta: [
      {
        name: 'description',
        content: 'Somos una desarrolladora de proyectos comprometida con la reforestación nativa y biodiversa a gran escala y el desarrollo socioeconómico de comunidades locales.' 
      },
    ],
  });
</script>
