<template>
  <div class="relative w-screen h-screen z-0">
    <!-- Envolvemos el mapa en ClientOnly para evitar errores de renderizado en servidor (SSR) -->
    <ClientOnly>
      <div class="absolute z-0 w-screen h-screen"><MapaMisiones/></div>
      <template #fallback>
        <!-- Opcional: Muestra un mensaje de carga mientras el mapa se inicializa -->
        <div class="w-full h-full flex items-center justify-center bg-gray-200">Cargando mapa...</div>
      </template>
    </ClientOnly>
    <div class="absolute top-0 left-8 h-18 w-48">
      <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
    </div>
 </div>
</template>
<script setup lang="ts">
// Corregimos la ruta de importación usando el alias '~'
import MapaMisiones from '~/components/MapaMisiones.vue'

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