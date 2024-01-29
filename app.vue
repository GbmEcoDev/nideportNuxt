<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
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
<script setup lang="ts">
useSeoMeta({
  ogTitle: 'Nideport - Soluciones basadas en la naturaleza',
  ogDescription: 'Somos una empresa desarrolladora de proyectos de créditos de carbono, dedicada a la restauración ecológica y conservación de la biodiversidad con un enfoque social.',
  ogImage: 'https://demo.nideport.com/images/bg-contact.webp'
});
useHead({
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    ],
  });
</script>