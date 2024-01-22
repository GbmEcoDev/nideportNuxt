<script setup lang="ts">

const route = useRoute();


useHead({
  title: 'Nideport - Proyectos',
  meta: [
    { name: 'description', content: 'Soluciones naturales...' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg', href: '/images/logo-nideport.svg' }
  ],
})
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