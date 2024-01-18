<template>
    <div class="relative w-screen h-screen z-0">
      <div class="absolute z-0 w-screen h-screen"><MapTech :fotoId="idSeleccionado" /></div>
      <div class="absolute top-0 left-8 h-18 w-48">
        <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
      </div>
      <div class="absolute z-55 bottom-4 right-8">
        <UButton label="DESCUBRIR" @click="isOpen = true" color="primary" size="xl" icon="i-heroicons-cursor-arrow-rays-20-solid"/>

        <USlideover v-model="isOpen" :transition="true" side="left">
            <Logo/>
            <div class="p-4 flex-1">
              <UTabs :items="items">
              <template #item="{ item }">
                <UCard>
                  <div v-if="item.key === 'discover'" class="space-y-3">
                   <SectionsMapappListDiscovery  @go-map-id="recibirId"/>
                   <UVerticalNavigation :links="links" />
                  </div>
                  <div v-else-if="item.key === 'planner'" class="space-y-3">
                    <div class="w-full">
                      <h3>Nuestro plan de restauracion esta conformado por 3 etapas</h3>
                    </div>
                    <ListEvento />
                  </div>
                </UCard>
              </template>
            </UTabs>

            <UCheckbox v-model="selected" name="cuadriculas" label="Cuadrículas" />
            </div>
        </USlideover>
        </div>
   </div>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const selected = ref(true)
  //const route = useRoute();
  const { t, locale, setLocale } = useI18n()
  const localePath = useLocalePath()
  const isOpen = ref(false);
  const colorMode  = useColorMode();
  const idSeleccionado = ref('');

// Función para recibir el ID y actualizar el estado
const recibirId = (idFotoSelect: string) => {
  //console.log(`El ID seleccionado: ${idFotoSelect}`);
  idSeleccionado.value = idFotoSelect;
};


  const links = [{
  label: 'Restauracion',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  badge: 100
}, {
  label: 'Biodiversidad',
  icon: 'i-heroicons-home',
  to: '/getting-started/installation'
}, {
  label: 'Seguridad',
  icon: 'i-heroicons-chart-bar',
  to: '/navigation/vertical-navigation'
}, {
  label: 'Comunidad',
  icon: 'i-heroicons-command-line',
  to: '/navigation/command-palette'
}]

const items = [{
  key: 'discover',
  label: 'DESCUBRIR',
  content: 'Actividades en la reserva'
}, {
  key:'planner',
  label: 'PLAN DE RESTAURACIÓN',
  disabled: false,
  content: 'Etapas de restauración'
}]
//generales de page
onMounted(() => {
    colorMode.value = "dark";
    ///console.log('Modo de color de la página:', colorMode.value);
  })

useHead({
    title: 'Nideport - Tech',
    meta: [
      { name: 'description', content: 'Tecnologias...' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo-nideport.svg' }
    ],
  })
  
  definePageMeta({
    layout: 'application'
  })


</script>