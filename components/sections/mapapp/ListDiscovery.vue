<template>
    <div class="mb-2">
        <div class="  overflow-auto grid grid-cols-4 grid-rows-3 gap-1">
          <div v-for="disco in discover" :key="disco.ID" class="aspect-ratio-square">
              <div class="w-full h-full relative aspect-ratio-square">
                <NuxtImg :src="`${config.public.url_base}/images/rgs1_nov_23/${ disco.foto }`" alt="Area" class="w-full h-full object-cover aspect-ratio-square rounded-lg" format="webp"/>
                <UButton @click="goMapId(disco.ID)" activeClass="bg-yellow-500" size="2xs" icon="i-heroicons-cursor-arrow-ripple-20-solid" class="absolute bottom-1 right-1 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"/>
              </div>
          </div>
        </div>
    </div>
</template>
  
<script setup lang="ts" >
  import { ref, onMounted} from 'vue';
  import axios from 'axios';
  import { useI18n } from 'vue-i18n';
  const colorMode = useColorMode();
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const language = locale.value.toUpperCase();
  const discover = ref<Array<{ ID: string; foto: string; Date: string }>>([]);
  const openPanelDet = ref(false);
  const closeCpanel = ref(false);
   /*const scrollTop = () => {
    window.scrollTo(0,0);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }); 
    console.log("toTop3");
  };*/

  onMounted(async () => {
    try {
      const { data } = await axios.get(`${config.public.url_base}/capas/fotos.geojson`);
      if (data.features) {
        discover.value = data.features.map((feature: any) => feature.properties) || [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  //get data item    
  const emit = defineEmits(['go-map-id','open-panel-det','close-cpanel']);
  const goMapId = (id: string) => {
    emit('go-map-id', id);
    emit('open-panel-det',openPanelDet.value=true);
    emit('close-cpanel', closeCpanel.value=false);
  };
</script>
<style scoped>
.aspect-ratio-square {
  aspect-ratio: 1 / 1; /* Establece la relación de aspecto cuadrada */
}
</style>