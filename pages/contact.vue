<template>
   <SectionsContactHeroContact/>
   <SectionsContactMoreInfoContact/>
    <!-- <SectionsContactFormInfo/> -->
    <SectionsContactFormInfoNotion/>
   <ScrollTop />
</template>
<script setup lang="ts">
const route = useRoute()

useHead({
    title: '¡Hablemos de Sostenibilidad! Contacta con nuestro equipo',
    meta: [
      {
        name: 'description',
        content: '¿Interesado en nuestras soluciones de compensación de carbono? Contáctanos hoy para colaborar en la protección del medio ambiente.' 
      },
    ]/* ,
    script: [
    {
      src: 'https://smtpjs.com/v3/smtp.js', // Reemplaza con la ruta de tu librería
      crossorigin: '', // Agrega el atributo crossorigin para evitar errores de CORS
    },
  ], */
  });
</script>