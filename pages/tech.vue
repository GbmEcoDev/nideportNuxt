<template>
    <div class="relative w-screen h-screen z-0">
      <div class="absolute z-0 w-screen h-screen"><MapTech :fotoId="idSeleccionado" :estadoLimites="selected"/></div>
      <div class="absolute top-0 left-0 h-18 w-48">
        <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
      </div>
      <div class="absolute z-55 bottom-4 right-8">
        <UButton label="DESCUBRIR" @click="isOpen = true" color="primary" size="xl" icon="i-heroicons-cursor-arrow-rays-20-solid"/>

        <USlideover v-model="isOpen" :transition="true" side="left" :overlay="false" class="overflow-auto">
            <Logo/>
            <div class="p-4 flex-1">
              <UTabs :items="items">
              <template #item="{ item }">
                <UCard>
                  <div v-if="item.key === 'discover'" class="space-y-3">
                   <SectionsMapappListDiscovery  @go-map-id="recibirId"/>
                  </div>
                  <div v-else-if="item.key === 'planner'" class="space-y-3">
                    <p>Area en proceso de restauracion</p>
                    <SectionsMapappListAreaWorked />
                    <p>Areas proximas a restaurar</p>
                    <SectionsMapappListAreaToRestore />
                  </div>
                </UCard>
              </template>
            </UTabs>
            </div>
            <div class="p-4 flex-1">
              <UCard>
                <UCheckbox color="black" v-model="selected" name="limites" label="Límites" @change="layerVisibility(selected , 'limites' )"/>
                <UCheckbox color="gray" v-model="selected" name="cuadriculas" label="Cuadrículas" @change="layerVisibility(selectedCuadricula, 'cuadriculas')"/>
                <UCheckbox color="green" v-model="selected" name="fajas" label="Área reforestada" @change="layerVisibility(selected,'')"/>
                <UCheckbox color="red" v-model="selected" name="areasDegradadas" label="Áreas a refosrestar" @change="layerVisibility(selected,'')"/>
                <UCheckbox color="blue" v-model="selected" name="rayos" label="Alertas por rayos" @change="layerVisibility(selected,'')"/>
                <UCheckbox color="yellow" v-model="selected" name="alertasBajas" label="Alertas con probabilidad baja" @change="layerVisibility(selected,'')"/>
                <UCheckbox color="orange" v-model="selected" name="alertasMedia" label="Alertas con probabilidad media" @change="layerVisibility(selected,'')"/>
                <UCheckbox color="red" v-model="selected" name="alertasAlta" label="Alertas con probabilidad alta" @change="layerVisibility(selected,'')"/>
                <UCheckbox color="black" v-model="selected" name="fotos" label="Registros de trabajo en campo" @change="layerVisibility(selected,'')"/>
              </UCard>
            </div>
        </USlideover>
        </div>
   </div>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const selected = ref(true)
  const selectedCuadricula = ref(true)

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
    title: 'Nideport - Tecnologia',
    meta: [
      { name: 'description', content: 'Utilizamos los últimos avances tecnologicos para aplicar en el proyecto.' },
    ]
  })
  
  definePageMeta({
    layout: 'application'
  })

  const emit = defineEmits(['layer-vis']);
  const layerVisibility = (estado: Boolean, capa: string  ) => {
    emit('layer-vis', estado, capa);
  };

</script>