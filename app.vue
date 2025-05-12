<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  ogUrl: 'https://www.nideport.com',
  ogTitle: 'Nideport - Soluciones basadas en la naturaleza',
  ogDescription: 'Somos una empresa desarrolladora de proyectos de créditos de carbono, dedicada a la restauración ecológica y conservación de la biodiversidad con un enfoque social.',
  ogImage: 'https://www.nideport.com/images/logo-imago.webp',
  twitterTitle: 'Nideport - Soluciones basadas en la naturaleza',
  twitterDescription: 'Somos una empresa desarrolladora de proyectos de créditos de carbono, dedicada a la restauración ecológica y conservación de la biodiversidad con un enfoque social.',
  twitterImage: 'https://www.nideport.com/images/logo-imago.webp',
  twitterCard: 'summary'
});
useHead({
    htmlAttrs: {
          lang: 'es',
        },
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preload',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Nunito:wght@400;700&display=swap',
      as: 'style',
      onload: 'this.onload=null;this.rel="stylesheet"'
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