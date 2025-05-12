<script setup lang="ts">
const route = useRoute();
useHead({
    title: 'Explora Nuestros Proyectos de Créditos de Carbono en Acción',
    meta: [
      {
        name: 'description',
        content: 'Descubre cómo contribuimos al mercado de carbono y combatimos el cambio climático a través de la tecnología de captura de carbono y soluciones basadas en la naturaleza.' 
      },
    ], /*  */
   script: [
    {
      src: 'https://tally.so/widgets/embed.js', // Reemplaza con la ruta de tu librería
      crossorigin: '', // Agrega el atributo crossorigin para evitar errores de CORS
    },
  ],
  });
</script>
<!-- <script async src="https://tally.so/widgets/embed.js"></script> -->
<template>
  <SectionsProjectsHeroProject/>
  <SectionsProjectsDataMenuReserve class="section_space"/>
  <SectionsProjectsGralGs1 class="pb-150 pt-50" />
  <SectionsProjectsCertification class="section_space" id="cer"/> 
  <SectionsHomeMapReserve />
  <!-- <SectionsProjectsYoutubeCarousel /> -->
  <SectionsProjectsThematicAxes />
  <ScrollTop />
</template>
<style>
.section_space{
  margin-top:6rem;
}
</style>