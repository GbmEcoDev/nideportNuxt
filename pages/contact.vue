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
  title: 'Nideport - Contacto',
  meta: [
    { name: 'description', content: 'Soluciones naturales...' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg', href: '/images/logo-nideport.svg' }
  ],
})
</script>