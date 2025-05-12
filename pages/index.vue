<script setup lang="ts">

const route = useRoute();
const { locales, locale, setLocale } = useI18n()


useHead({
  title: 'Nideport - Soluciones basadas en la naturaleza',
  meta: [
    {
      name: 'description',
      content: 'Somos una empresa desarrolladora de proyectos de créditos de carbono, dedicada a la restauración ecológica y conservación de la biodiversidad con un enfoque social.' 
    },
  ]/* ,
  link: [
     { rel: 'preconnect', href: 'https://player.vimeo.com' },
    ], */
});
</script>

<template>
  <SectionsHomeHeroSection />
  <SectionsHomeOurPillars />
  <SectionsHomeMapReserve />
  <SectionsHomePartnerNideport />
  <SectionsHomeAwardsSection />
  <SectionsHomePressSection />
  <SectionsHomeMoreInfo />
  <LazyScrollTop />
</template>
