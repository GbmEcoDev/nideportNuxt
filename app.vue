<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
/*import Loading from './components/Loading.vue';
import { ref } from 'vue';
 let loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1000);  */
 
useSeoMeta({
  ogUrl: 'https://www.nideport.com',
  ogTitle: 'Nideport - Soluciones basadas en la naturaleza',
  ogDescription: 'Somos una empresa desarrolladora de proyectos de créditos de carbono, dedicada a la restauración ecológica y conservación de la biodiversidad con un enfoque social.',
  ogImage: 'https://www.nideport.com/images/bg-contact.webp',
  twitterTitle: 'Nideport - Soluciones basadas en la naturaleza',
  twitterDescription: 'Somos una empresa desarrolladora de proyectos de créditos de carbono, dedicada a la restauración ecológica y conservación de la biodiversidad con un enfoque social.',
  twitterImage: 'https://www.nideport.com/images/bg-contact.webp',
  twitterCard: 'summary'
});
useHead({
    htmlAttrs: {
          lang: 'es',
        },
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Nunito:wght@400;700&display=swap',crossorigin: ''},
    ],
    script: [
    {
      src: 'https://smtpjs.com/v3/smtp.js', // Reemplaza con la ruta de tu librería
      crossorigin: '', // Agrega el atributo crossorigin para evitar errores de CORS
    },
  ],
  });
</script>
<style>

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>