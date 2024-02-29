<template>
    <div class="relative w-screen h-screen z-0  overflow-x-hidden">
      <div class="absolute z-0 w-screen h-screen">
        <MapTech 
        :fotoId="selectedDetID"
        :areaId="selectedAreaID"
        :fajaId="selectedFajaID"
        :resetMap="resetedMap"
        :estadoLimites="selected"
        :estadoFajas="selectedFajas"
        :estadoAreasArest="selectedAreasArest"
        :estadoFotos="selectedFotos"
        :estadoCaminos="selectedCaminos"
        :estadoHidro="selectedHidro"
        :estadoDegradadas="selectedDegradadas"
        :estadoFueraProy="selectedFueraProy"
        @propsDetalle="handlePropsDetalle" 
        @propsDetalleArea="handlePropsDetalleArea" 
        @propsDetalleFaja="handlePropsDetalleFaja" 
        @open-panel="handleOpenPanel" 
        @open-panel-area="handleOpenPanelArea" 
        @open-panel-faja="handleOpenPanelFaja"
        @falsear-reset="handleFalseReset"
         />
      </div>
      <div class="absolute top-2 left-2 h-14 w-48" :class="{ 'lg:hidden': isOpen }">
        <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
      </div>
      <div class="absolute pb-8 z-55 bottom-2 left-2 xs:px-9 " :class="{ 'left-[-350px]': isOpen }">
        
            <UButton v-if="isDesktop" ref="btnActivePanel" :label="$t('map_app_btn_discovery')" @click="isOpen = true" color="primary" size="xl" trailingIcon="i-heroicons-cursor-arrow-rays-20-solid" class="w-auto text-bold" />
          
            <div v-else class=" w-full relative flex h-full flex-col justify-center overflow-hidden rounded-xl" :class="{ 'hidden': isOpen }">
              <div class="absolute inset-0 bg-center rounded-xl dark:bg-black w-full"></div>
              <div class="group relative m-0 flex h-full w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                <div class="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                  <img src="/images/pilar-tecnologia.webp" class="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                </div>
                <div class="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                  <p class="text-3xl px-3 mb-9 text-white text-center font-bold shadow-lg" >{{$t('map_app_btn_xs_discovery')}}</p>
                  <UButton block ref="btnActivePanel" :label="$t('map_app_btn_xs_lb_discovery')" @click="isOpen = true" color="primary" size="xl" trailingIcon="i-heroicons-cursor-arrow-rays-20-solid" class="w-72 text-bold"/>
                </div>
              </div>
            </div>
        </div>
        
        <SectionsMapappUCardDetalleFaja class="absolute lg:w-[350px] lg:h-screen lg:top-0 lg:right-0 bg-slate-900/10 dark:bg-slate-900/10
      xs:top-[33%]
      xs:w-full
      " :id="selectedFajaID" v-model="isOpenDetFaja" v-if="isOpenDetFaja && isDesktop" @close-det-panel-faja="handleCloseDetPanelFaja" :fajaId="selectedFajaID" />

        <SectionsMapappUCardDetalleArea class="absolute lg:w-[350px] lg:h-screen lg:top-0 lg:right-0 bg-slate-900/10 dark:bg-slate-900/10
      xs:top-[33%]
      xs:w-full
      " :id="selectedAreaID" v-model="isOpenDetArea" v-if="isOpenDetArea && isDesktop" @close-det-panel-area="handleCloseDetPanelArea" :areaId="selectedAreaID" />

      <SectionsMapappUCardDetalle class="absolute lg:w-[350px] lg:h-screen lg:top-0 lg:right-0 bg-slate-900/10 dark:bg-slate-900/10
      xs:top-[33%]
            xs:w-full" :id="selectedDetID" v-model="isOpenDet" v-if="isOpenDet && isDesktop" @close-det-panel="handleCloseDetPanel" :fotoId="selectedDetID" />

        <div v-if="isOpen" class="absolute lg:bottom-0 lg:left-0 lg:w-1/4 lg:h-screen bg-slate-900/90 dark:bg-slate-900/90
        xs:w-full
        xs:h-1/3
        xs:bottom-0" >
          <div class="relative flex items-center justify-between w-full xs:pt-2">
            <div class="mr-4  flex justify-start"><Logo color="dark" class="lg:block w-36 mb-2" :class="{ 'xs:hidden': isOpen }"/></div>
            <div class="ml-2 flex justify-end"> 
            <NuxtLink :to="localePath({ name: 'index' })" class="z-1000" ><UButton color="white" variant="solid" icon="i-heroicons-home-20-solid" class="mx-1"/></NuxtLink>
            
            <UButton color="white" variant="solid" icon="i-heroicons-x-mark-20-solid" class="mx-1" @click="isOpen = false, isOpenDet = false, isOpenDetArea = false, isOpenDetFaja = false"  ref="btnActivePanel" />
            </div>
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
                        <SectionsMapappListDiscovery @go-map-id="recibirId" @open-panel-det="handleOpenDetPanel" />
                      </div>
                    </template>
                    <!--<template #jobs-security >
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
                    </template>-->
                    </UAccordion>
                  </div>
                  <div v-else-if="item.key === 'planner'" class="space-y-1" id="acco-area">
                    <p class="text-sm border-b mb-2"> {{ item.content }}</p>
                     <UAccordion
                        :items="itemsa"
                      >
                    <template #zone-restore >
                      <div>
                        <SectionsMapappListAreaWorked @go-map-faja-id="recibirFajaId" @open-panel-det-faja="handleOpenDetPanelFaja" @close-panel-det-area="handleCloseDetPanelArea" />
                      </div>
                    </template> 
                    <template #zone-from-restorate-e1 >
                      <SectionsMapappListAreaToRestore namefilter="Etapa 2" @go-map-area-id="recibirAreaId" @open-panel-det-area="handleOpenDetPanelArea" @close-panel-det-faja="handleCloseDetPanelFaja"/>
                    </template>
                    <template #zone-from-restorate-e2 >
                      <SectionsMapappListAreaToRestore namefilter="Etapa 3" @go-map-area-id="recibirAreaId" @open-panel-det-area="handleOpenDetPanelArea" @close-panel-det-faja="handleCloseDetPanelFaja"/>
                    </template>
                    <template #zone-from-restorate-e3 >
                      <SectionsMapappListAreaToRestore namefilter="Etapa 4" @go-map-area-id="recibirAreaId" @open-panel-det-area="handleOpenDetPanelArea" @close-panel-det-faja="handleCloseDetPanelFaja"/>
                    </template>
                    <template #zone-from-restorate-e4 >
                      <p class="text-sm text-gray-600">{{$t('map_app_acc2_content1')}}</p>
                    </template> 
                    <template #zone-from-restorate-e5 >
                      <p class="text-sm text-gray-600">{{$t('map_app_acc2_content2')}}</p>
                    </template> 
                    </UAccordion>
                  </div>
                </UCard>
              </template>
            </UTabs>
          </div>
          <div class="relative mx-1">
            <!-- <UPopover :popper="{ placement: 'top-start' }" v-model:open="open" class="rounded-md">
              <UButton color="white" label="" icon="i-heroicons-square-3-stack-3d-20-solid" />
              <template #panel>
                <div class="p-4">
                  <UCheckbox v-model="selected" name="limites" :label="$t('map_app_upop_item1')" :update:model-value="layerVisibility(selected )" />
                  <UCheckbox v-model="selectedFajas" name="fajas" :label="$t('map_app_upop_item2')" :update:model-value="fajasVisibility(selectedFajas )" />
                  <UCheckbox v-model="selectedAreasArest" name="areasDegradadas" :label="$t('map_app_upop_item3')" :update:model-value="areasArestisibility(selectedAreasArest )" />
                  <UCheckbox v-model="selectedDegradadas" name="areasDegradadas" :label="$t('map_app_upop_item4')" :update:model-value="degradadasVisibility(selectedDegradadas )" />
                  <UCheckbox v-model="selectedFotos" name="fotos" :label="$t('map_app_upop_item5')" :update:model-value="fotosVisibility(selectedFotos )" />
                  <UCheckbox v-model="selectedCaminos" name="caminos" :label="$t('map_app_upop_item6')" :update:model-value="caminosVisibility(selectedCaminos )" />
                  <UCheckbox v-model="selectedHidro" name="hidrografia" :label="$t('map_app_upop_item7')" :update:model-value="hidrografiaVisibility(selectedHidro )" />
                  <UCheckbox v-model="selectedFueraProy" name="hidrografia" :label="$t('map_app_upop_item8')" :update:model-value="fueraProyVisibility(selectedFueraProy )" /></div>
              </template>
            </UPopover> -->
            <div class="border border-gray-700 w-full rounded-md p-2">
              <UAccordion :items="itemsLayers" >
                  <template #layer-featured >
                    <UCheckbox class="mx-4" v-model="selected" name="limites" :label="$t('map_app_upop_item1')" :update:model-value="layerVisibility(selected )" />
                    <UCheckbox class="mx-4" v-model="selectedFajas" name="fajas" :label="$t('map_app_upop_item2')" :update:model-value="fajasVisibility(selectedFajas )" />
                    <UCheckbox class="mx-4" v-model="selectedAreasArest" name="areasDegradadas" :label="$t('map_app_upop_item3')" :update:model-value="areasArestisibility(selectedAreasArest )" />
                    <UCheckbox class="mx-4" v-model="selectedDegradadas" name="areasDegradadas" :label="$t('map_app_upop_item4')" :update:model-value="degradadasVisibility(selectedDegradadas )" />
                    <UCheckbox class="mx-4" v-model="selectedFotos" name="fotos" :label="$t('map_app_upop_item5')" :update:model-value="fotosVisibility(selectedFotos )" />
                    <UCheckbox class="mx-4" v-model="selectedCaminos" name="caminos" :label="$t('map_app_upop_item6')" :update:model-value="caminosVisibility(selectedCaminos )" />
                    <UCheckbox class="mx-4" v-model="selectedHidro" name="hidrografia" :label="$t('map_app_upop_item7')" :update:model-value="hidrografiaVisibility(selectedHidro )" />
                    <UCheckbox class="mx-4" v-model="selectedFueraProy" name="hidrografia" :label="$t('map_app_upop_item8')" :update:model-value="fueraProyVisibility(selectedFueraProy )" />
                  </template>
              </UAccordion>
            </div>
          </div>
        </div>
   </div>
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
  const isOpenDetArea = ref(false);
  const isOpenDetFaja = ref(false);
  const selectedDetID = ref('');
  const selectedAreaID = ref('');
  const selectedFajaID = ref('');
  const colorMode  = useColorMode();
  const idSeleccionado = ref('');
  const btnActivePanel = ref('null'); 
  const resetedMap = ref(false);
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
    isOpenDetArea.value=false;
    isOpenDetFaja.value=false;
    resetedMap.value=false;
    resetMapa();
  } else{
    selectedHidro.value=true;
    selectedFajas.value=true;
    selectedAreasArest.value=true;
    selectedDegradadas.value=false;
    selectedFueraProy.value=true;
    selectedFotos.value=false;
    //selectedPois.value=false;
    selectedCaminos.value=false;
    selectedHidro.value=false;
    isOpenDet.value=false;
    isOpenDetArea.value=false;
    resetedMap.value=false;
    resetMapa();
  }
}
 
  const itemsa = [{
  label: t('map_app_acc2_item1'),
  icon: 'i-heroicons-map',
  //content:"uno"
  slot: 'zone-restore'
}, {
  label: t('map_app_acc2_item2'),
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e1'
}, {
  label: t('map_app_acc2_item3'),
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e2'
}, {
  label: t('map_app_acc2_item4'),
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e3'
}, {
  label: t('map_app_acc2_item5'),
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e4'
}, {
  label: t('map_app_acc2_item6'),
  icon: 'i-heroicons-map-solid',
  //content:"dos"
  slot: 'zone-from-restorate-e5'
}
]
const itemscat = [{
  label:  t('map_app_acc1_item1'),
  icon: 'i-heroicons-sparkles',
  defaultOpen:true,
  //content:"uno"
  slot: 'jobs-featured'
}/*,
  {
  label: t('map_app_acc1_item2'),
  icon: 'i-heroicons-shield-check',
  //content:"uno"
  slot: 'jobs-security'
}, {
  label: t('map_app_acc1_item3'),
  icon: 'i-heroicons-globe-americas',
  //content:"dos"
  slot: 'jobs-restoration'
}
, {
  label: t('map_app_acc1_item4'),
  icon: 'i-heroicons-user-group',
  //content:"dos"
  slot: 'jobs-community'
}
, {
  label: t('map_app_acc1_item5'),
  icon: 'i-heroicons-computer-desktop',
  //content:"dos"
  slot: 'jobs-tech'
}*/
]

const itemsLayers = [{
  label:  t('map_app_acc3_item1'),
  icon: 'i-heroicons-square-3-stack-3d-20-solid',
  defaultOpen:true,
  slot: 'layer-featured'
}
]

const items = [{
  key: 'discover',
  label: t('map_app_tab_item1'),
  content: t('map_app_tab_title1')
}, {
  key:'planner',
  label: t('map_app_tab_item2'),
  disabled: false,
  content: t('map_app_tab_title2')
}]

// Función para recibir el ID y actualizar el estado
const recibirId = (ID: any) => {
  selectedDetID.value = ID;
};

 const resetMapa = () => {
  resetedMap.value = true;
}; 
/*const resetMapa = () => {
    if(zoom.value != 11) { zoom.value=11; } else{ }
};*/
const handleFalseReset = () =>{
  resetedMap.value = false;
}

const recibirAreaId = (ID: any) => {
  selectedAreaID.value = ID;
};

const recibirFajaId = (ID: any) => {
  selectedFajaID.value = ID;
};

const handlePropsDetalle = (ID:any) => {
  selectedDetID.value = ID;
  isOpenDetFaja.value = false;
  isOpenDetArea.value= false;
};

const handlePropsDetalleArea = (ID:any) => {
  selectedAreaID.value = ID;
  isOpenDetFaja.value = false;
  isOpenDet.value = false;
};

const handlePropsDetalleFaja = (ID:any) => {
  selectedFajaID.value = ID;
  isOpenDetArea.value= false;
  isOpenDet.value=false;
};


const handleOpenPanel = (value:any) => {
  isOpenDet.value = value;
  isOpenDetFaja.value = false;
  isOpenDetArea.value= false;
};

 const handleOpenPanelArea = (value:any) => {
  isOpenDetArea.value = value;
  isOpenDetFaja.value = false;
  isOpenDet.value = false;
}; 
const handleOpenPanelFaja = (value:any) => {
  isOpenDetFaja.value = value;
  isOpenDetArea.value= false;
  isOpenDet.value=false;
}; 

const handleCloseDetPanel = (value:any) => {
  isOpenDet.value = value;
  selectedDetID.value = '';
  idSeleccionado.value= '';
};
const handleCloseDetPanelArea = (value:any) => {
  isOpenDetArea.value = value;
  selectedAreaID.value = '';
  idSeleccionado.value= '';
};

const handleCloseDetPanelFaja = (value:any) => {
  isOpenDetFaja.value = value;
  selectedFajaID.value = '';
  idSeleccionado.value= '';
};

const handleOpenDetPanel = (value:any) => {
  isOpenDet.value=false;
  isOpenDet.value = value;
};
const handleOpenDetPanelArea = (value:any) => {
  isOpenDetArea.value=false;
  isOpenDetArea.value = value;
};
const handleOpenDetPanelFaja = (value:any) => {
  isOpenDetFaja.value=false;
  isOpenDetFaja.value = value;
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
#acco-area ::v-deep(button:nth-child(11)) {
  color: rgb(77, 65, 41);
}
</style>