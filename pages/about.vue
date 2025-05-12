<template>
  <SectionsAboutHeroAbout />
  <SectionsAboutNideport  class="pb-50 pt-50"/>
  <SectionsAboutOurTeams />
<!--   <SectionsAboutJoinOurTeam /> -->
  <GalleryPicture :images="imageList"/>
  <ScrollTop />
</template>

<script setup lang="ts">
import GalleryPicture from '@/components/GalleryPicture.vue';
const route = useRoute();
const imageList = ref([
'/images/gallery/gallery01.webp',
'/images/gallery/gallery02.webp',
'/images/gallery/gallery17.webp',
'/images/gallery/gallery04.webp',
'/images/gallery/gallery05.webp',
'/images/gallery/gallery07.webp',
'/images/gallery/gallery08.webp',
'/images/gallery/gallery09.webp',
'/images/gallery/gallery10.webp',
'/images/gallery/gallery11.webp',
'/images/gallery/gallery12.webp',
'/images/gallery/gallery13.webp',
'/images/gallery/gallery14.webp',
'/images/gallery/gallery15.webp',
'/images/gallery/gallery16.webp',
'/images/gallery/gallery19.webp',
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
