<script setup lang="ts">
const route = useRoute();
const { locales, locale, setLocale } = useI18n()


useHead({
    title: 'Compensación de Carbono: Protegiendo el Futuro del Medio Ambiente',
    meta: [
      {
        name: 'description',
        content: 'Somos expertos en soluciones basadas en la naturaleza y proyectos de créditos de carbono. Descubre cómo eliminamos carbono para un mundo más sostenible.' 
      },
    ],
  });
</script>

<template>
  <SectionsHomeHeroSection />
  <SectionsHomeOurPillars />
  <SectionsHomeMapReserve />
  <SectionsHomePartnerNideport />
  <SectionsHomeMoreInfo />
  <ScrollTop />
</template>
