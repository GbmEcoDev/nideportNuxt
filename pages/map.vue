<template>
  <div class="relative w-screen h-screen z-0">
    
    <div class="absolute z-0 w-screen h-screen"><MapaMisiones/></div>
    <div class="absolute top-0 left-8 h-18 w-48">
      <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
    </div>
 </div>
</template>
<script setup lang="ts">
import MapaMisiones from '/components/MapaMisiones.vue'

const route = useRoute();
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()

useHead({
  title: 'Nideport - Map',
  meta: [
    { name: 'description', content: 'Tecnologias...' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg', href: '/images/logo-nideport.svg' }
  ],
})

definePageMeta({
  layout: 'application'
})
</script>