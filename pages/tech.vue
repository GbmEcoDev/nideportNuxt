<template>
    <div class="relative w-screen h-screen z-0">
      <div class="absolute z-0 w-screen h-screen">
        <MapTech :fotoId="idSeleccionado" 
        :estadoLimites="selected" 
        :estadoFajas="selectedFajas" 
        :estadoAreasArest="selectedAreasArest" 
        :estadoFotos="selectedFotos"
        :estadoCaminos="selectedCaminos"
        :estadoHidro="selectedHidro"
        :estadoPois="selectedPois" />
      </div>
      <div class="absolute top-0 left-0 h-18 w-48">
        <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
      </div>
      <div class="absolute z-55 bottom-4 right-8">
        <UButton label="DESCUBRIR" @click="isOpen = true" color="primary" size="xl" icon="i-heroicons-cursor-arrow-rays-20-solid"/>

        <USlideover v-model="isOpen" :transition="true" side="left" :overlay="false" class="overflow-auto">
            <Logo/>
            <div class="p-4 flex-1">
              <UTabs :items="items"  @change="onChange">
              <template #item="{ item }">
                <UCard>
                  <div v-if="item.key === 'discover'" class="space-y-3" >
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
                <UCheckbox v-model="selected" name="limites" label="Límites" :update:model-value="layerVisibility(selected )" />
                <UCheckbox v-model="selectedFajas" name="fajas" label="Área reforestada" :update:model-value="fajasVisibility(selectedFajas )" />
                <UCheckbox v-model="selectedAreasArest" name="areasDegradadas" label="Áreas a refosrestar" :update:model-value="areasArestisibility(selectedAreasArest )" />
                <UCheckbox v-model="selectedFotos" name="fotos" label="Registros de trabajo en campo" :update:model-value="fotosVisibility(selectedFotos )" />
                <UCheckbox v-model="selectedPois" name="pois" label="Puntos destacados" :update:model-value="poisVisibility(selectedPois )" />
                <UCheckbox v-model="selectedCaminos" name="caminos" label="Caminos" :update:model-value="caminosVisibility(selectedCaminos )" />
                <UCheckbox v-model="selectedHidro" name="hidrografia" label="Hidrografía" :update:model-value="hidrografiaVisibility(selectedHidro )" />
              </UCard>
            </div>
        </USlideover>
      </div>
   </div>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const selected = ref(true)
  const selectedFajas = ref(true)
  const selectedAreasArest = ref(true)
  const selectedFotos = ref(true)
  const selectedCaminos = ref(true)
  const selectedPois = ref(true)
  const selectedHidro = ref(false)

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

  const emit = defineEmits( [ 'layer-vis' , 'fajas-vis' , 'areasArest-vis' , 'fotos-vis' , 'pois-vis' , 'caminos-vis' , 'hidrografia-vis' ] );

  const layerVisibility = ( estado: Boolean ) => {
    emit( 'layer-vis' , estado );
  };

  const fajasVisibility = (estado: Boolean) => {
    emit( 'fajas-vis' , estado );
  };

  const areasArestisibility = (estado: Boolean) => {
    emit( 'areasArest-vis' , estado );
  };

  const fotosVisibility = (estado: Boolean) => {
    emit( 'fotos-vis' , estado );
  };

  const poisVisibility = (estado: Boolean) => {
    emit( 'pois-vis' , estado );
  };

  const caminosVisibility = (estado: Boolean) => {
    emit( 'caminos-vis' , estado );
  };

  const hidrografiaVisibility = (estado: Boolean) => {
    emit( 'hidrografia-vis' , estado );
  };

  function onChange (index:any) {
  const item = items[index]
    if(item.label=='DESCUBRIR'){
      //  alert(${item.label} was clicked!);
        selected.value=true;
        selectedFajas.value=false;
        selectedAreasArest.value=false;
        selectedFotos.value=false;
        selectedPois.value=true;
        selectedCaminos.value=true;
        selectedHidro.value=false;
    } else{
      selectedHidro.value=true;
      selectedFajas.value=true;
      selectedAreasArest.value=true;
      selectedFotos.value=true;
      selectedPois.value=false;
      selectedCaminos.value=false;
      selectedHidro.value=false;
    }
  }
</script>