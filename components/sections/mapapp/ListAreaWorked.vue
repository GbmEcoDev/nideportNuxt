<template>
    <div class="border-b border-gray-200 mb-6">
        <!-- <p class="font-bold text-primary mb-2 border-b border-gray-200 dark:text-white">Discovering</p> -->
        <div class="h-56 overflow-auto"><span class="text-sm text-right w-full text-gray-600">({{ discover.length }} {{$t('map_app_acc_label')}})</span>
          <div v-for="disco in discover" :key="disco.id" class="w-full mt-1 mb-1 flex justify-between p-1 border-b border-gray-700">
              <span v-if="disco.nombre" class="text-xs text-gray-100 dark:text-gray-100 px-2"> {{ disco.nombre }}</span>
              <UButton @click="goMapFajaId(disco.id)" label="" color="primary" size="2xs" icon="i-heroicons-cursor-arrow-ripple-20-solid" class=" active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"/>
              <div v-if="!discover.length" class="text-xs text-gray-500 px-2">
                No areas found.
              </div>
          </div>
        </div>
    </div>
</template>
  
<script setup lang="ts" >
  import { ref, computed} from 'vue';
  import axios from 'axios';
  import { useI18n } from 'vue-i18n';
  const colorMode = useColorMode();
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const language = locale.value.toUpperCase();
  const discover = ref<Array<{ id: string; nombre: string }>>([]);
  const openPanelDetFaja = ref(false);
  const isOpenDetArea = ref(false);
  const closeCpanel = ref(false);
onMounted(async () => {
  try {
    const { data } = await axios.get(`${config.public.url_base}/capas/reforestacion_fajas.geojson`);
    if (data.features) {
      discover.value = data.features.map((feature: any) => feature.properties) || [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
  //get data item    
  const emit = defineEmits(['go-map-faja-id','open-panel-det-faja','close-panel-det-area','close-cpanel']);

  const goMapFajaId = (id: string) => {
    emit('go-map-faja-id', id);
    emit('open-panel-det-faja',openPanelDetFaja.value=true);
    emit('close-panel-det-area',isOpenDetArea.value=false);
    emit('close-cpanel', closeCpanel.value=false);
  };
</script>