<template>
    <div class="relative w-screen h-screen z-0">
      <div class="absolute z-0 w-screen h-screen">
        <MapTech :fotoId="selectedDetID" 
        :estadoLimites="selected" 
        :estadoFajas="selectedFajas" 
        :estadoAreasDeg="selectedAreasDeg" 
        :estadoRayos="selectedRayos"
        :estadoAlta="selectedAlta"
        :estadoFotos="selectedFotos"
        :estadoCaminos="selectedCaminos"
        :estadoHidro="selectedHidro"
        :estadoPois="selectedPois"
        @propsDetalle="handlePropsDetalle" @open-panel="handleOpenPanel"
         />
      </div>
      <div class="absolute top-0 left-0 h-18 w-48">
        <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
      </div>
      <div class="absolute z-55 bottom-4 right-8">
        <UButton ref="btnActivePanel" label="DESCUBRIR" @click="isOpen = true" color="primary" size="xl" :class="{ 'btn-translate-x-full': isOpen }" icon="i-heroicons-cursor-arrow-rays-20-solid"/>
      </div>
      
      <SectionsMapappUCardDetalle class="border border-teal-800/10 rounded-lg w-[350px] h-screen absolute top-0 bottom-0 right-0" :id="selectedDetID" v-model="isOpenDet" v-if="isOpenDet" @close-det-panel="handleCloseDetPanel" :fotoId="selectedDetID" />

        <USlideover v-model="isOpen" :transition="true" side="left" :overlay="false" class="overflow-auto" >
            <Logo/>
            <div class="p-4 flex-1">
              <UTabs :items="items" @change="onChange">
              <template #item="{ item }">
                <UCard>
                  <div v-if="item.key === 'discover'" class="space-y-3">
                   <SectionsMapappListDiscovery @go-map-id="recibirId" @open-panel-det="handleOpenDetPanel"/>
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
              <UCheckbox color="black" v-model="selected" name="limites" label="Límites" :update:model-value="layerVisibility(selected )" />
              <UCheckbox color="black" v-model="selectedFotos" name="fotos" label="Registros de trabajo en campo" :update:model-value="fotosVisibility(selectedFotos )" />
              <UCheckbox color="black" v-model="selectedPois" name="pois" label="Puntos destacados" :update:model-value="poisVisibility(selectedPois )" />
              <UCheckbox v-model="selectedCaminos" name="caminos" label="Caminos" :update:model-value="caminosVisibility(selectedCaminos )" />
              <UCheckbox v-model="selectedHidro" name="hidrografia" label="Hidrografía" :update:model-value="hidrografiaVisibility(selectedHidro )" />
              <UCheckbox color="green" v-model="selectedFajas" name="fajas" label="Área reforestada" :update:model-value="fajasVisibility(selectedFajas )" />
              <UCheckbox color="red" v-model="selectedAreasDeg" name="areasDegradadas" label="Áreas a refosrestar" :update:model-value="areasDegVisibility(selectedAreasDeg )" />
            </UCard>
            </div>
        </USlideover>
   </div>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const selected = ref(true)
  const selectedFajas = ref(true)
  const selectedAreasDeg = ref(true)
  const selectedRayos = ref(true)
  const selectedAlta = ref(true)
  const selectedFotos = ref(true)
  const selectedCaminos = ref(true)
  const selectedPois = ref(true)
  const selectedHidro = ref(false)
  const { t, locale, setLocale } = useI18n()
  const localePath = useLocalePath()
  const isOpen = ref(false);
  const isOpenDet = ref(false);
  const selectedDetID = ref('');
  const colorMode  = useColorMode();
  const idSeleccionado = ref('');
  const btnActivePanel = ref('null'); 

  //seteo vista de capas 
  function onChange (index:any) {
  const item = items[index]
  if(item.label=='DESCUBRIR'){
    selectedFotos.value=true;
    selectedPois.value=true;
    selectedCaminos.value=false;
    selectedFajas.value=false;
    selectedAreasDeg.value=false;
  } else{
    selectedFajas.value=true;
    selectedAreasDeg.value=true;
    selectedFotos.value=false;
    selectedPois.value=false;
    selectedCaminos.value=true;
    selectedRayos.value=true;
  }
}




/* const itemsAccordion = [{
  label: 'Getting Started',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  content:"uno"
  //slot: 'getting-started'
}, {
  label: 'Installation',
  icon: 'i-heroicons-arrow-down-tray',
  defaultOpen: false,
  content:"dos"
  //slot: 'installation'
}] */

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

// Función para recibir el ID y actualizar el estado
const recibirId = (ID: any) => {
  selectedDetID.value = ID;
  //console.log(idFotoSelect);
};

const handlePropsDetalle = (ID:any) => {
  selectedDetID.value = ID;

};

const handleOpenPanel = (value:any) => {
  isOpenDet.value = value;
};

const handleCloseDetPanel = (value:any) => {
  isOpenDet.value = value;
  selectedDetID.value = '';
  idSeleccionado.value= '';
};
const handleOpenDetPanel = (value:any) => {
  isOpenDet.value=false;
  isOpenDet.value = value;
};
//generales de page
  onMounted(() => {
      colorMode.value = "dark";

    })

  useHead({
    title: 'Nideport - Tecnologia',
    meta: [
      { name: 'description', content: 'Utilizamos los últimos avances tecnologicos para aplicar en el proyecto.' },
    ]
  })
  /*  */
  definePageMeta({
    layout: 'application'
  })

  const emit = defineEmits( [ 'layer-vis' , 'fajas-vis' , 'areasDeg-vis' , 'areasDeg-vis' , 'alta-vis' , 'fotos-vis' , 'pois-vis' , 'caminos-vis' , 'hidrografia-vis' ] );

  const layerVisibility = ( estado: Boolean ) => {
    emit( 'layer-vis' , estado );
  };

  const fajasVisibility = (estado: Boolean) => {
    emit( 'fajas-vis' , estado );
  };

  const areasDegVisibility = (estado: Boolean) => {
    emit( 'areasDeg-vis' , estado );
  };

  const rayosVisibility = (estado: Boolean) => {
    emit( 'areasDeg-vis' , estado );
  };

  const altaVisibility = (estado: Boolean) => {
    emit( 'alta-vis' , estado );
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



</script>
<style scoped>
.btn-translate-x-full {
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
}
</style>