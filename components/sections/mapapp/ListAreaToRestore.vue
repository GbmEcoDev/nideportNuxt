<template>
    <div class="bg-transparent">
        <!-- <p class="font-bold text-primary mb-2 border-b border-gray-200 dark:text-white">Discovering</p> -->
        <div class="h-56 overflow-auto"><span class="text-sm text-right w-full text-gray-600">({{ areafiltered.length }} {{$t('map_app_acc_label2')}})</span>
          <div v-for="areafiltrada in areafiltered" :key="areafiltrada.ID" class="w-full mt-1 mb-1 flex justify-between p-1 border-b border-gray-700">
              <p v-if="areafiltrada.Name" class="text-md text-gray-100 dark:text-gray-100 px-2"> {{ areafiltrada.Name }}</p>
              <UButton @click="goMapAreaId(areafiltrada.ID)" label="" activeClass="bg-yellow-500" size="2xs" icon="i-heroicons-cursor-arrow-ripple-20-solid" class=" active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"/> 
              <div v-if="!areafiltered.length" class="text-xs text-gray-500 px-2">
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
  const { namefilter }  = defineProps<{namefilter:string}>()
  const areas = ref<Array<{ ID: string; Name: string; etapa: string }>>([]);
  const areafiltered = computed(() => areas.value.filter((item) => item.etapa === namefilter));
  const openPanelDetArea = ref(false)
  const isOpenDetFaja = ref(false);
  const closeCpanel = ref(false);
onMounted(async () => {
  try {
    const { data } = await axios.get(`${config.public.url_base}/capas/areas_arestaurar24_32.geojson`);
    if (data.features) {
      areas.value = data.features.map((feature: any) => feature.properties) || [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
  //get data item    
  const emit = defineEmits(['go-map-area-id','open-panel-det-area', 'close-panel-det-faja','close-cpanel']);
  const goMapAreaId = (ID: string) => {
    emit('go-map-area-id', ID);
    emit('open-panel-det-area',openPanelDetArea.value=true);
    emit('close-panel-det-faja',isOpenDetFaja.value=false);
    emit('close-cpanel', closeCpanel.value=false);
  };
</script>