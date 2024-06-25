<template>
    <div>
      <p  class="font-bold text-primary mb-4 border-b border-gray-200 ">{{$t('blog_title_more_event')}}</p>
      
      <div v-for="(event, index) in filteredEvents" :key="event.id" @click="isMobile ? viewContent(index) : null" :class="{ 'border-gray-400': onViewContent[index] }" class="card h-auto transition-height ease-in-out w-full mt-6 mb-6 flex-col rounded-lg p-3 bg-gradient-to-l from-slate-50 hover:shadow-lg duration-200 ">
          <div class="w-full header"
            @touchstart="onViewContent[index] = true"
            @touchend="onViewContent[index] = false"
            @mouseover="onViewContent[index] = true"
            @mouseleave="onViewContent[index] = false"
            >
            <div class="containerImg mr-3" :class="{ 'w-full': onViewContent[index] }"><NuxtImg :src="`${ event.acf.imagen }`" alt="Cover" class="w-full rounded-full border aspect-ratio-square" /></div>
            <div class="containerHead"  :class="{ 'w-full': onViewContent[index] }">
               <div class="flex flex-row items-end">
                  <p class="text-xs text-gray-600 w-full">{{ event.acf.start_time }}</p>
                  <span class="p-1 text-[#0f5f60e9] text-center flex justify-center items-center"><i class="i-heroicons-chevron-down-20-solid"></i></span>
                </div>
                <h2 class="font-bold text-secondary text-md leading-5">{{ event.title.rendered }} </h2> 
                <p class="text-xs text-gray-600">{{ event.acf.speaker }}</p> 
            </div>
          </div>
          <div class="content w-full p-1 text-sm text-gray-800 px-2"  :class="{ 'block opacity-100': onViewContent[index] }" v-html="event.content.rendered"></div>
      </div>
    </div>
    <p v-if="filteredEvents"></p>
    <p v-else class="flex justify-center items-center h-screen">{{$t('blog_title_not_event')}}</p>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import axios from 'axios';
  import { useI18n } from 'vue-i18n';
  const colorMode = useColorMode();
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const { isMobile } = useDevice();
  const language = locale.value.toUpperCase();
  
  const { data: events } = await axios.get(config.public.wpEventos);

  const eventos = ref(events || []);
  const filteredEvents = computed(() => {
  return eventos.value.filter((event: any) => {
    return event.acf.language === language;
  });
}); 
let onViewContent = ref(Array(filteredEvents.value.length).fill(false));

function formatDate(fullDate:any) {
  const date = new Date(fullDate);
  // Formatea la fecha como desees, aquí se usa el formato "YYYY-MM-DD"
  const formattedDate = `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
  return formattedDate;
}

function padNumber(number:any) {
  return number.toString().padStart(2, '0');
}

const viewContent  = (index: number) => {
  onViewContent.value[index] = true;
}

</script>
<style scoped>
  .aspect-ratio-square{
    aspect-ratio: 1/1;
  }
  .header{
    width: 100%;
    display: flex;
  }
  .content {
    display: none;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  }
  .containerImg{
    width:25%;
    height:auto;
  }
  .containerHead{
    width:78%;
    height:auto;
  }
  .card:hover :deep(.content) {
    display: block;
    opacity: 1;
  }
/*   .card:hover :deep(.containerImg) {
    width: 25%;
  }
  .card:hover :deep(.containerHead) {
    width: 100%;
  } */
  .card:hover :deep(span) {
    transform: rotate(180deg);
  }
  .content :deep(a) {
    margin-top:12px;
    color: #3182ce;
    text-decoration: underline;
    padding: 5px;
    border-radius:12px;
  }
  .content :deep(a::before) {
    content:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1 h-1 mt-2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg> ');
    display: inline-block; /* Asegura que el elemento se comporte como un bloque en línea */
    width: 1rem; /* Ancho deseado */
    height: 1rem; /* Alto deseado */
    margin-right: 0.25rem;
    margin-top:12px;
  }
  .content :deep(a:hover) {
    color: #2c5282;
  }
</style>