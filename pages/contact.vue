<template>
   <SectionsContactHeroContact/>
   <SectionsContactMoreInfoContact/>
    <SectionsContactFormInfo/>
    <!-- <SectionsContactTresDe/>-->
   <ScrollTop />
</template>
<script setup lang="ts">
const route = useRoute()

useHead({
    title: '¡Hablemos de Sostenibilidad! Contacta con Nuestro Equipo',
    meta: [
      {
        name: 'description',
        content: '¿Interesado en nuestras soluciones de compensación de carbono? Contáctanos hoy para colaborar en la protección del medio ambiente.' 
      },
    ],
  });
</script>