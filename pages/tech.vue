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
        :estadoDegradadas="selectedDegradadas"
        :estadoFueraProy="selectedFueraProy"
        @propsDetalle="handlePropsDetalle" @open-panel="handleOpenPanel"
         />
      </div>
      <div class="absolute top-0 left-0 h-14 w-48">
        <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
      </div>
      <div class="absolute pb-8 z-55 bottom-2 left-2 xs:px-9 " :class="{ 'left-[-350px]': isOpen }">
        <!-- <p class="text-4xl mb-9 text-primary lg:hidden" :class="{ 'xs:block': isOpen }">Conocé nuestras acciones en restauración</p> -->
        <UButton v-if="isDesktop" ref="btnActivePanel" label="Descubrí nuestras acciones" @click="isOpen = true" color="primary" size="xl" trailingIcon="i-heroicons-cursor-arrow-rays-20-solid" class="w-72 text-bold"/>
        <div v-else class=" w-full relative flex h-full flex-col justify-center overflow-hidden rounded-xl" :class="{ 'hidden': isOpen }">
          <div class="absolute inset-0 bg-center rounded-xl dark:bg-black w-full"></div>
          <div class="group relative m-0 flex h-full w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
            <div class="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
              <img src="/images/pilar-tecnologia.webp" class="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
            </div>
            <div class="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
              <p class="text-3xl px-3 mb-9 text-white text-center font-bold shadow-lg" >Conocé nuestras acciones en restauración</p>
              <UButton block ref="btnActivePanel" label="Descubrí" @click="isOpen = true" color="primary" size="xl" trailingIcon="i-heroicons-cursor-arrow-rays-20-solid" class="w-72 text-bold"/>
            </div>
          </div>
        </div>


        </div>
        
      <SectionsMapappUCardDetalle class="absolute lg:w-[350px] lg:h-screen lg:top-0 lg:right-0 bg-slate-900/10 dark:bg-slate-900/10
      xs:top-[33%]
      xs:w-full
      " :id="selectedDetID" v-model="isOpenDet" v-if="isOpenDet && isDesktop" @close-det-panel="handleCloseDetPanel" :fotoId="selectedDetID" />

        <div v-if="isOpen" class="absolute lg:bottom-0 lg:left-0 lg:w-1/4 lg:h-screen bg-slate-900/90 dark:bg-slate-900/90
        xs:w-full
        xs:h-1/3
        xs:bottom-0" >
          <div class="relative flex items-center justify-evenly w-full xs:pt-2">
            <Logo color="dark" class="lg:block" :class="{ 'xs:hidden': isOpen }"/>
            <NuxtLink :to="localePath({ name: 'index' })" class="z-1000" ><UButton color="white" variant="outline" icon="i-heroicons-home-20-solid" class="mx-1"/></NuxtLink>
            <UPopover :popper="{ placement: 'bottom-start' }" class="border rounded-md">
              <UButton color="white" label="Capas" icon="i-heroicons-square-3-stack-3d-20-solid" />
              <template #panel>
                <div class="p-4">
                  <UCheckbox v-model="selected" name="limites" label="Límites" :update:model-value="layerVisibility(selected )" />
                  <UCheckbox v-model="selectedFajas" name="fajas" label="Áreas en restauración" :update:model-value="fajasVisibility(selectedFajas )" />
                  <UCheckbox v-model="selectedAreasArest" name="areasDegradadas" label="Áreas a restaurar" :update:model-value="areasArestisibility(selectedAreasArest )" />
                  <UCheckbox v-model="selectedDegradadas" name="areasDegradadas" label="Áreas degradadas" :update:model-value="degradadasVisibility(selectedDegradadas )" />
                  <UCheckbox v-model="selectedFotos" name="fotos" label="Registros de trabajo en campo" :update:model-value="fotosVisibility(selectedFotos )" />
                  <!-- <UCheckbox v-model="selectedPois" name="pois" label="Puntos destacados" :update:model-value="poisVisibility(selectedPois )" /> -->
                  <UCheckbox v-model="selectedCaminos" name="caminos" label="Caminos" :update:model-value="caminosVisibility(selectedCaminos )" />
                  <UCheckbox v-model="selectedHidro" name="hidrografia" label="Hidrografía" :update:model-value="hidrografiaVisibility(selectedHidro )" />
                  <UCheckbox v-model="selectedFueraProy" name="hidrografia" label="Áreas fuera de Proyecto" :update:model-value="fueraProyVisibility(selectedFueraProy )" /></div>
              </template>
            </UPopover>
            <UButton color="white" variant="outline" icon="i-heroicons-x-mark-20-solid" class="mx-1" @click="isOpen = false, isOpenDet = false"  ref="btnActivePanel" />
          </div>
            <div class="p-1 flex-1">
              <UTabs :items="items" @change="onChange">
              <template #item="{ item }">
                <UCard>
                  <div v-if="item.key === 'discover'" class="space-y-1">
                    <p class="text-sm border-b mb-2">{{ item.content }}</p>
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
                    <p class="text-sm border-b mb-2"> {{ item.content }}</p>
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

           
        </div>
   </div>
  <!--  <div class="absolute z-1100 bottom-2 left-[-250px]" :class="{ 'left-[320px]': isOpen }">
        <UButton ref="btnActivePanel" @click="isOpen = false" color="primary" size="xl"  trailingIcon="i-heroicons-x-mark-20-solid" />
      </div> -->
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const { isDesktop } = useDevice();
  const selected = ref(true)
  const selectedFajas = ref(true)
  const selectedAreasArest = ref(false)
  const selectedDegradadas = ref(false)
  const selectedFueraProy = ref(false)
/*   const selectedRayos = ref(true)
  const selectedAlta = ref(true) */
  const selectedFotos = ref(true)
  const selectedCaminos = ref(true)
  //const selectedPois = ref(false)
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
    selectedDegradadas.value=false;
    selectedFueraProy.value=false;
    selectedFotos.value=true;
    //selectedPois.value=false;
    selectedCaminos.value=true;
    selectedHidro.value=false;
  } else{
    selectedHidro.value=true;
    selectedFajas.value=true;
    selectedAreasArest.value=true;
    selectedDegradadas.value=true;
    selectedFueraProy.value=true;
    selectedFotos.value=true;
    //selectedPois.value=false;
    selectedCaminos.value=false;
    selectedHidro.value=false;
    isOpenDet.value=false;
  }
}
 
   const itemsa = [{
  label: 'Etapa 1 - En restauración ',
  icon: 'i-heroicons-map',
  //content:"uno"
  slot: 'zone-restore'
}, {
  label: 'Etapa 2 - 2024/2026',
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e1'
}, {
  label: 'Etapa 3 - 2027/2028',
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e2'
}, {
  label: 'Etapa 4 - 2029/2032',
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e3'
}, {
  label: 'Etapa 5 - 2033/2045',
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
  label: 'ACCIONES',
  content: 'Nuestras acciones'
}, {
  key:'planner',
  label: 'RESTAURACIÓN',
  disabled: false,
  content: 'Restauración y plan de gestión del bosque'
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

  const emit = defineEmits( [ 'layer-vis' , 'fajas-vis' , 'areasArest-vis' , 'areasDegra-vis', 'fotos-vis' , 'caminos-vis' , 'hidrografia-vis' , 'fueraproy-vis' ] );

  const layerVisibility = ( estado: Boolean ) => {
    emit( 'layer-vis' , estado );
  };

  const fajasVisibility = (estado: Boolean) => {
    emit( 'fajas-vis' , estado );
  };

  const areasArestisibility = (estado: Boolean) => {
    emit( 'areasArest-vis' , estado );
  };

  const degradadasVisibility = (estado: Boolean) => {
    emit( 'areasDegra-vis' , estado );
  };

  const fotosVisibility = (estado: Boolean) => {
    emit( 'fotos-vis' , estado );
  };

 /*  const poisVisibility = (estado: Boolean) => {
    emit( 'pois-vis' , estado );
  };
 */
  const caminosVisibility = (estado: Boolean) => {
    emit( 'caminos-vis' , estado );
  };

  const hidrografiaVisibility = (estado: Boolean) => {
    emit( 'hidrografia-vis' , estado );
  };

  const fueraProyVisibility = (estado: Boolean) => {
    emit( 'fueraproy-vis' , estado );
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
  color: rgb(139, 139, 139);
}
</style>