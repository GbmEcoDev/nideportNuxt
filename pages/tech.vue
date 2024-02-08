<template>
    <div class="relative w-screen h-screen z-0  overflow-x-hidden">
      <div class="absolute z-0 w-screen h-screen">
        <MapTech :fotoId="selectedDetID" 
        :estadoLimites="selected" 
        :estadoFajas="selectedFajas" 
        :estadoAreasArest="selectedAreasArest"
        :estadoFotos="selectedFotos"
        :estadoCaminos="selectedCaminos"
        :estadoHidro="selectedHidro"
        :estadoPois="selectedPois"
        @propsDetalle="handlePropsDetalle" @open-panel="handleOpenPanel"
         />
      </div>
      <div class="absolute top-0 left-0 h-14 w-48">
        <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
      </div>
      <div class="absolute z-55 bottom-2 left-8" :class="{ 'left-[-250px]': isOpen }">
        <UButton ref="btnActivePanel" label="Explorá nuestro proceso de restauración" @click="isOpen = true" color="primary" size="xl" trailingIcon="i-heroicons-cursor-arrow-rays-20-solid" class="w-72 text-bold"/>
      </div>
      <div class="absolute z-55 bottom-2 left-[-250px]" :class="{ 'left-[320px]': isOpen }">
        <UButton ref="btnActivePanel" @click="isOpen = false" color="primary" size="xl"  trailingIcon="i-heroicons-x-mark-20-solid" />
      </div>
      
      <SectionsMapappUCardDetalle class=" w-[350px] h-screen absolute top-0 right-0 bg-slate-900/10 dark:bg-slate-900/10" :id="selectedDetID" v-model="isOpenDet" v-if="isOpenDet" @close-det-panel="handleCloseDetPanel" :fotoId="selectedDetID" />

        <div v-if="isOpen" class="absolute top-0 left-0 w-1/4 h-screen bg-slate-900/90 dark:bg-slate-900/90" >
            <Logo/>
            <div class="p-1 flex-1">
              <UTabs :items="items" @change="onChange">
              <template #item="{ item }">
                <UCard>
                  <div v-if="item.key === 'discover'" class="space-y-1">
                    {{ item.content }}
                   <UAccordion :items="itemscat" 
                    color="black" 
                    variant="soft"
                    size="sm">
                    <template #jobs-featured >
                      <div>
                        <SectionsMapappListDiscovery @go-map-id="recibirId" @open-panel-det="handleOpenDetPanel"/>
                      </div>
                    </template>
                    <template #jobs-security >
                      <div>
                        <SectionsMapappListDiscovery @go-map-id="recibirId" @open-panel-det="handleOpenDetPanel"/>
                      </div>
                    </template> 
                    <template #jobs-restoration >
                      fotos de restauracion
                    </template>
                    <template #jobs-community >
                      fotos de comunidad
                    </template>
                    <template #jobs-tech >
                      fotos de tecnologia
                    </template>
                    </UAccordion>
                  </div>
                  <div v-else-if="item.key === 'planner'" class="space-y-1" id="acco-area">
                    {{ item.content }}
                     <UAccordion
                        :items="itemsa"
                      >
                    <template #zone-restore >
                      <div>
                        <SectionsMapappListAreaWorked />
                      </div>
                    </template> 
                    <template #zone-from-restorate-e1 >
                      <SectionsMapappListAreaToRestore />
                    </template>
                    <template #zone-from-restorate-e2 >
                      <SectionsMapappListAreaToRestore />
                    </template>
                    <template #zone-from-restorate-e3 >
                      <SectionsMapappListAreaToRestore />
                    </template>
                    <template #zone-from-restorate-e4 >
                      <SectionsMapappListAreaToRestore />
                    </template> 
                    </UAccordion>
                  </div>
                </UCard>
              </template>
            </UTabs>
          </div>

            <UPopover :popper="{ placement: 'top-start' }" class="p-1 absolute bottom-1 left-1">
              <UButton color="white" label="Vista de capas" icon="i-heroicons-square-3-stack-3d-20-solid" />
              <template #panel>
                <div class="p-4">
                  <UCheckbox v-model="selected" name="limites" label="Límites" :update:model-value="layerVisibility(selected )" />
                  <UCheckbox v-model="selectedFajas" name="fajas" label="Áreas en restauración" :update:model-value="fajasVisibility(selectedFajas )" />
                  <UCheckbox v-model="selectedAreasArest" name="areasDegradadas" label="Áreas a restaurar" :update:model-value="areasArestisibility(selectedAreasArest )" />
                  <UCheckbox v-model="selectedFotos" name="fotos" label="Registros de trabajo en campo" :update:model-value="fotosVisibility(selectedFotos )" />
                  <UCheckbox v-model="selectedPois" name="pois" label="Puntos destacados" :update:model-value="poisVisibility(selectedPois )" />
                  <UCheckbox v-model="selectedCaminos" name="caminos" label="Caminos" :update:model-value="caminosVisibility(selectedCaminos )" />
                  <UCheckbox v-model="selectedHidro" name="hidrografia" label="Hidrografía" :update:model-value="hidrografiaVisibility(selectedHidro )" /></div>
              </template>
            </UPopover>
        </div>
   </div>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const selected = ref(true)
  const selectedFajas = ref(true)
  const selectedAreasArest = ref(true)
/*   const selectedRayos = ref(true)
  const selectedAlta = ref(true) */
  const selectedFotos = ref(true)
  const selectedCaminos = ref(true)
  const selectedPois = ref(false)
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
  if(item.key=='discover'){
    selected.value=true;
    selectedFajas.value=false;
    selectedAreasArest.value=false;
    selectedFotos.value=true;
    selectedPois.value=false;
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
    isOpenDet.value=false;

  }
}
 
   const itemsa = [{
  label: 'Áreas en restauración',
  icon: 'i-heroicons-map',
  //content:"uno"
  slot: 'zone-restore'
}, {
  label: 'Áreas a restaurar Etapa 1',
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e1'
}, {
  label: 'Áreas a restaurar Etapa 2',
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e2'
}, {
  label: 'Áreas a restaurar Etapa 3',
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e3'
}, {
  label: 'Áreas a restaurar Etapa 4',
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e4'
}]
const itemscat = [{
  label: 'Destacadas',
  icon: 'i-heroicons-sparkles',
  defaultOpen:true,
  //content:"uno"
  slot: 'jobs-featured'
},
  {
  label: 'Seguridad',
  icon: 'i-heroicons-shield-check',
  //content:"uno"
  slot: 'jobs-security'
}, {
  label: 'Restauración',
  icon: 'i-heroicons-globe-americas',
  //content:"dos"
  slot: 'jobs-restoration'
}
, {
  label: 'Comunidad',
  icon: 'i-heroicons-user-group',
  //content:"dos"
  slot: 'jobs-community'
}
, {
  label: 'Tecnología',
  icon: 'i-heroicons-computer-desktop',
  //content:"dos"
  slot: 'jobs-tech'
}]

const items = [{
  key: 'discover',
  label: 'DESCUBRIR',
  content: 'Actividades en la reserva'
}, {
  key:'planner',
  label: 'RESTAURACIÓN',
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

  const emit = defineEmits( [ 'layer-vis' , 'fajas-vis' , 'areasArest-vis' , 'fotos-vis' , 'pois-vis' , 'caminos-vis' , 'hidrografia-vis','center-map','zoom-map' ] );

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



</script>
<style scoped>
.btn-translate-x-full {
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
}

#acco-area ::v-deep(button:nth-child(1)) {
  color: rgba(112,176,85,1);
}

#acco-area ::v-deep(button:nth-child(3)) {
  color: rgba(192,209,53,1);
}

#acco-area ::v-deep(button:nth-child(5)) {
  color: rgba(217,177,42,1);
}
#acco-area ::v-deep(button:nth-child(7)) {
  color: rgba(233,118,24,1);
}
#acco-area ::v-deep(button:nth-child(9)) {
  color: rgba(241,46,25,1);
}
</style>