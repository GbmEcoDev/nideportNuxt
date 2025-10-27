<template>
    <section class="bg-gradient-to-b from-[#4AADA2] to-[#007454] p-24 max-sm:px-1 scroll-snap-align-start">
    <AtomsContainer>
        <div class="flex flex-col items-center w-full pt-8 px-36 max-sm:px-4">
            <AtomsTitleH2 :texte="$t('project_ods_title')" alignTxt="left" colorTxt="white" weightTxt="normal"/>
            <div class="flex flex-wrap justify-center max-sm:justify-center gap-10 mt-16 mb-50">
                <div class="w-20 lg:w-40 mb-4 shadow-inner"><NuxtImg :src="`${urlImg}/images/project/ODS1-${language}.svg`" class="w-full shadow-inner border-6 border-[#007454] rounded-[8px]" alt="ODS1" /></div>
                <div class="w-20 lg:w-40 mb-4 shadow-inner"><NuxtImg :src="`${urlImg}/images/project/ODS2-${language}.svg`" class="w-full shadow-inner border-6 border-[#007454] rounded-[8px]" alt="ODS2" /></div>
                <div class="w-20 lg:w-40 mb-4 shadow-inner"><NuxtImg :src="`${urlImg}/images/project/ODS4-${language}.svg`" class="w-full shadow-inner border-6 border-[#007454] rounded-[8px]" alt="ODS4" /></div>
                <div class="w-20 lg:w-40 mb-4 shadow-inner"><NuxtImg :src="`${urlImg}/images/project/ODS5-${language}.svg`" class="w-full shadow-inner border-6 border-[#007454] rounded-[8px]" alt="ODS5" /></div>
                <div class="w-20 lg:w-40 mb-4 shadow-inner"><NuxtImg :src="`${urlImg}/images/project/ODS8-${language}.svg`" class="w-full shadow-inner border-6 border-[#007454] rounded-[8px]" alt="ODS8" /></div>
                <div class="w-20 lg:w-40 mb-4 shadow-inner"><NuxtImg :src="`${urlImg}/images/project/ODS13-${language}.svg`" class="w-full shadow-inner border-6 border-[#007454] rounded-[8px]" alt="ODS13" /></div>
                <div class="w-20 lg:w-40 mb-4 shadow-inner"><NuxtImg :src="`${urlImg}/images/project/ODS15-${language}.svg`" class="w-full shadow-inner border-6 border-[#007454] rounded-[8px]" alt="ODS15" /></div>
                <div class="w-20 lg:w-40 mb-4 shadow-inner"><NuxtImg :src="`${urlImg}/images/project/ODS17-${language}.svg`" class="w-full shadow-inner border-6 border-[#007454] rounded-[8px]" alt="ODS17" /></div>
            </div>
        </div>
    </AtomsContainer>

    </section>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  const config = useRuntimeConfig();
  const urlImg = config.public.url_base;
  const { locale } = useI18n();
  
  const language = computed(() => locale.value.toUpperCase());
  </script>
  
  <style scoped></style>
  