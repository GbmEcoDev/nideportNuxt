<template>
    <div v-if="photoDetails" class="h-full">
        <UCard class="lg:w-[350px] lg:h-full xs:w-full xs:h-1/3">
            <template #header class="relative">
                {{ id }}
                <UButton @click="closeDetalle"
                    icon="i-heroicons-x-mark-20-solid"
                    size="md"
                    color="gray" variant="ghost"
                    class="absolute top-1 right-1"
                    />
            </template>
            <div class="flex gap-2">
                <div class="lg:w-full xs:w-2/6 border">
                    <NuxtImg :src="`${config.public.url_base}/images/rgs1_nov_23/${ photoDetails.foto }`" class="w-full aspect-ratio-square object-cover" />
                </div>
                <div class="lg:w-full xs:w-4/6"><!--<h2>{{ photoDetails.titulo }}</h2> --><p>{{ photoDetails.Date }}</p></div>
            </div>

            <template #footer>
            
                
            </template>
        </UCard>
     
    </div>
    <div v-else>
      <!-- Mensaje o contenido por defecto si no hay detalles disponibles -->
      <p>No se encontraron detalles para el ID proporcionado.</p>
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
  const props = defineProps(['id','fotoId']);
  const discover = ref<Array<{ ID: string; foto: string; Date: string; titulo: string }>>([]);
  const photoDetails = ref<{ foto: string; Date: string } | null>(null);
  const closePanel = ref(true);

  //const idToShow = ref(props.fotoId);
  console.log(props.fotoId,"lo que mando view");
  onMounted(async () => {
    try {
      const { data } = await axios.get(`${config.public.url_base}/capas/fotos.geojson`);
      if (data.features) {
        discover.value = data.features.map((feature: any) => feature.properties) || [];
        // Cargar los detalles de la foto al recibir el ID
        if(props.id != ''){
        loadPhotoDetails(props.id);
        }
        else if(props.fotoId){
        loadPhotoDetails(props.fotoId);
        }
        else{}
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  
  // Actualizar los detalles de la foto cuando cambia el ID
  watch(() => props.id, (newID) => {
    loadPhotoDetails(newID);
  });
  
  const loadPhotoDetails = (id: string) => {
    // Buscar los detalles de la foto con el ID proporcionado
    const details = discover.value.find((photo) => photo.ID === id);
  
    // Actualizar el estado con los detalles encontrados o null si no se encuentra la foto
    photoDetails.value = details || null;
  };

  const emit = defineEmits(['close-det-panel']);
  const closeDetalle = () => {

    emit('close-det-panel', closePanel.value=false);
  };
  </script>
  <style scoped>
  .aspect-ratio-square {
    aspect-ratio: 1 / 1; /* Establece la relación de aspecto cuadrada */
  }
 </style>
 