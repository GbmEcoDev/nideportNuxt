<template>
  <div class="pl-6 mt-12">
    <!-- Título traducido -->
    <p class="font-bold text-primary mb-4 border-b border-gray-200">
      {{ $t('blog_title_more_event') }}
    </p>

    <!-- Lista de eventos -->
    <div
      v-for="(event, index) in filteredEvents"
      :key="event.id"
      @click="isMobile ? viewContent(index) : null"
      :class="{ 'border-b-2 border-gray-400': onViewContent[index] }"
      class="card h-auto transition-height ease-in-out w-full mt-6 mb-6 flex-col rounded-lg p-3 bg-gradient-to-l from-slate-50 hover:shadow-lg duration-200"
    >
      <!-- Cabecera -->
      <div
        class="header"
        @touchstart="onViewContent[index] = true"
        @touchend="onViewContent[index] = false"
        @mouseover="!isMobile ? (onViewContent[index] = true) : null"
        @mouseleave="onViewContent[index] = false"
      >
        <div class="containerImg mr-3">
          <NuxtImg
            :src="event.image.trim()"
            alt="Cover"
            class="w-full rounded-full border aspect-ratio-square"
          />
        </div>
        <div class="containerHead">
          <div class="flex flex-row items-end justify-between">
            <p class="text-xs text-gray-600">{{ formatDate(event.startTime) }}</p>
            <span class="p-1 text-[#0f5f60e9]">
              <i class="i-heroicons-chevron-down-20-solid"></i>
            </span>
          </div>
          <p class="font-bold text-secondary text-md leading-5">
            {{ event.title }}
          </p>
          <p class="text-xs text-gray-600">{{ event.speaker }}</p>
        </div>
      </div>

      <!-- Contenido expandido -->
      <div
        class="content w-full p-1 text-[14px] text-gray-800 px-2"
        :class="{ 'block opacity-100': onViewContent[index] }"
        v-html="event.content.trim()"> 
    </div>

    </div>

    <!-- Mensaje si no hay eventos -->
    <p v-if="filteredEvents.length === 0" class="text-center py-4">
      {{ $t('blog_title_not_event') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Datos estáticos
const rawData = [
  {
    id: 5714,
    title: 'COP28',
    speaker: 'Marcelo Taboada',
    startTime: '12/12/2023',
    content:
      '<p>UN Conference on Climate Change &#8211; United Arab Emirates</p>\n<p><a href="https://unfccc.int/es/cop28" target="_blank" rel="noopener">Visit link</a></p>\n',
    link: 'https://blog.nideport.com/event/cop28-en/',
    language: 'EN',
    image: '/event-img/cop28_logo.png',
  },
  {
    id: 5392,
    title: 'Congreso Forestal 2023',
    speaker: 'Tomás González Arata',
    startTime: '27/03/2023',
    content:
      '<p>Estuvimos en <strong>Mendoza Mercados de Carbono</strong>: una oportunidad para el sector forestal en Argentina y Latinoamérica en el Congreso Forestal 2023.<br />\n<a href="https://congresoforestal2023.org.ar/" target="_blank" rel="noopener">Visitar enlace</a></p>\n',
    link: 'https://blog.nideport.com/event/charla-sobre-incendios-forestales/',
    language: 'ES',
    image: '/event-img/evento1-mendoza.jpg',
  },
  {
    id: 5391,
    title: 'Argentina Carbon Fórum',
    speaker: 'Tomás Gónzalez Arata',
    startTime: '27/06/2023',
    content:
      '<p>Estuvimos en Argentina Carbon Fórum en la Bolsa de Comercio de Buenos Aires Grandes tendencias del Mercado Global del Carbono: Soluciones basadas en la Naturaleza, El potencial del sector agrícola y forestal Nacional, Experiencias destacadas y perspectivas.</p>\n<p><a href="https://www.argentinacarbon.com/edicion-2023">Visitar enlace</a></p>\n',
    link: 'https://blog.nideport.com/event/activa-tu-naturaleza/',
    language: 'ES',
    image: '/event-img/evento2-bsas.webp',
  },
  {
    id: 21,
    title: 'Agro y mercados de carbono. Presente y futuro en Argentina y la región',
    speaker: 'Tomás González Arata',
    startTime: '24/07/2023',
    content:
      '<p>Estuvimos en la Exposición Rural de Buenos Aires: Mercados de carbono en Argentina: contexto actual, experiencias y oportunidades para el sector agroforestal<br />\n– Charla gratuita en La Rural: Agro y mercados de carbono – Presente y futuro en Argentina y la región</p>\n<p><a href="https://afoa.org.ar/24-7-charla-gratuita-en-la-rural-agro-y-mercados-de-carbono-presente-y-futuro-en-argentina-y-la-region/" target="_blank" rel="noopener">Visitar enlace</a></p>\n<p>&nbsp;</p>\n',
    link: 'https://blog.nideport.com/event/talk-on-native-forest-restoration/',
    language: 'ES',
    image: '/event-img/evento3-bsas.jpg',
  },
  {
    id: 19,
    title: 'COP28',
    speaker: 'Marcelo Taboada',
    startTime: '12/12/2023',
    content:
      '<p>Conferencia de la ONU sobre Cambio Climático &#8211; Emiratos Árabes Unidos<br />\n<a href="https://unfccc.int/es/cop28" target="_blank" rel="noopener">Visitar enlace</a></p>\n<p>&nbsp;</p>\n',
    link: 'https://blog.nideport.com/event/cop28/',
    language: 'ES',
    image: '/event-img/cop28_logo.png',
  },
]

// Composables
const { locale } = useI18n()
const { isMobile } = useDevice()

// Estado reactivo
const events = ref(rawData)
const onViewContent = ref<boolean[]>([])

// Lenguaje actual en mayúsculas: 'ES' o 'EN'
const currentLang = computed(() => locale.value.toUpperCase())

// Eventos filtrados por idioma
const filteredEvents = computed(() => {
  const filtered = events.value.filter((event) => event.language === currentLang.value)
  // Resetear el array de visibilidad cuando cambia el filtro
  onViewContent.value = Array(filtered.length).fill(false)
  return filtered
})

// Formatear fecha de "dd/mm/yyyy" a formato legible
const formatDate = (dateStr: string) => {
  // Asumimos formato "dd/mm/yyyy"
  const [day, month, year] = dateStr.split('/').map(Number)
  const date = new Date(year, month - 1, day) // Mes es 0-indexado

  return date.toLocaleDateString(locale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Mostrar contenido en móvil
const viewContent = (index:any) => {
  onViewContent.value[index] = !onViewContent.value[index]
}
</script>

<style scoped>
.aspect-ratio-square {
  aspect-ratio: 1/1;
}
.header {
  display: flex;
  width: 100%;
}
.content {
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.containerImg {
  width: 25%;
}
.containerHead {
  width: 75%;
}
.card:hover :deep(.content),
.card:deep(.content.block) {
  display: block;
  opacity: 1;
}
.card:hover :deep(span) {
  transform: rotate(180deg);
}
.content :deep(a) {
  margin-top: 12px;
  color: #3182ce;
  text-decoration: underline;
  padding: 5px;
  border-radius: 12px;
}
.content :deep(a::before) {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1 h-1 mt-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>');
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
  margin-top: 12px;
}
.content :deep(a:hover) {
  color: #2c5282;
}
</style>