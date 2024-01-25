<template>
    <div class="border-b border-gray-200 mb-6">
        <!-- <p class="font-bold text-primary mb-2 border-b border-gray-200 dark:text-white">Discovering</p> -->
        <div class="h-56 overflow-auto">
          <div v-for="disco in discover" :key="disco.id" class="w-full mt-1 mb-1 flex p-1 border-b border-gray-700">
              <span class="w-8 h-8 mr-3 rounded-full aspect-square border-2 border-green-800"></span>
              <span v-if="disco.nombre_pol" class="text-xs text-gray-100 dark:text-gray-100 px-2"> {{ disco.nombre_pol }}</span>
               
              <!-- <div class="h-4">
                <UButton @click="goMapId(disco.id)" label="view" color="primary" size="2xs" icon="i-heroicons-cursor-arrow-ripple-20-solid"/>
              </div>  -->
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
  const discover = ref<Array<{ id: string; nombre_pol: string }>>([]);

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
  const emit = defineEmits(['go-map-id']);
  const goMapId = (id: string) => {
    emit('go-map-id', id);
  };
</script>