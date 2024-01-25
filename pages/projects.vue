<script setup lang="ts">

const route = useRoute();


useHead({
    title: 'Explora Nuestros Proyectos de Créditos de Carbono en Acción',
    meta: [
      {
        name: 'description',
        content: 'Descubre cómo contribuimos al mercado de carbono y combatimos el cambio climático a través de la tecnología de captura de carbono y soluciones basadas en la naturaleza.' 
      },
    ],
  });
</script>

<template>
  <SectionsProjectsHeroProject/>
  <SectionsProjectsGs1  class="pb-150 pt-50"/>
  <SectionsHomeMapReserve class="section_space"/>
  <SectionsProjectsDataReserve class="section_space"/>
  <SectionsProjectsInfoReserve class="section_space"/> 
  <SectionsProjectsObjectReserve class="section_space"/>
  <SectionsProjectsOdsReserve />
  <ScrollTop />
</template>
<style>
.section_space{
  margin-top:6rem;
}
</style>