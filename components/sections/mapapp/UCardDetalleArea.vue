<template>
    <div v-if="areaDetails" class="h-full">
        <UCard class="lg:w-[380px] m-1 lg:h-full xs:w-full xs:h-1/3">
            <template #header class="relative">
            <h2 class="text-4xl">{{ areaDetails.Name }}</h2>
                <UButton @click="closeDetalleArea"
                    icon="i-heroicons-x-mark-20-solid"
                    size="md"
                    color="gray" variant="ghost"
                    class="absolute top-1 right-1"
                    />
            </template>
            <div class="flex gap-2">
                <div class="lg:w-full xs:w-full"><p class="border-t border-b border-gray-300 text-gray-300 text-sm mb-8"><span>{{ areaDetails.etapa }} - {{ areaDetails.__rea_ha_ }} Hectareas</span></p> <p class=" text-gray-300 text-sm">{{ areaDetails.description }}</p></div>
            </div>
            <template #footer>
            </template>
        </UCard>
    </div>
    <div v-else>
      <!-- Mensaje o contenido por defecto si no hay detalles disponibles -->
      <p>No se encontraron detalles del area.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import { useI18n } from 'vue-i18n';
  
  const colorMode = useColorMode();
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const language = locale.value.toUpperCase();

  const props = defineProps(['id','areaId']);
  const discover = ref<Array<{ ID: string; Name: string; description: string; __rea_ha_: string; etapa: string }>>([]);
  const areaDetails = ref<{ Name: string; description: string; __rea_ha_: string; etapa: string } | null>(null);
  const closePanelArea = ref(true);

  onMounted(async () => {
    try {
      const { data } = await axios.get(`${config.public.url_base}/capas/areas_arestaurar24_32.geojson`);
      if (data.features) {
        discover.value = data.features.map((feature: any) => feature.properties) || [];
        // Cargar los detalles de la foto al recibir el ID
        if(props.id != ''){
        loadareaDetails(props.id);
        }
        else if(props.areaId){
        loadareaDetails(props.areaId);
        }
        else{}
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  
  // Actualizar los detalles de la foto cuando cambia el ID
  watch(() => props.id, (newID) => {
    loadareaDetails(newID);
  });
  
  const loadareaDetails = (id: string) => {
    // Buscar los detalles de la foto con el ID proporcionado
    const details = discover.value.find((area) => area.ID === id);
  
    // Actualizar el estado con los detalles encontrados o null si no se encuentra la foto
    areaDetails.value = details || null;
  };

  const emit = defineEmits(['close-det-panel-area']);
  const closeDetalleArea = () => {
    emit('close-det-panel-area', closePanelArea.value=false);
  };
  </script>
  <style scoped>
  .aspect-ratio-square {
    aspect-ratio: 1 / 1; /* Establece la relación de aspecto cuadrada */
  }
 </style>
 