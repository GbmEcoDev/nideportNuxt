<template>
    <section class="pt-2 pb-25 md:pt-2 scroll-snap-align-start">
        <AtomsContainer>
            <div class="flex items-center justify-start lg:items-center lg:justify-center gap-4 pb-2 w-full mb-24 overflow-x-auto whitespace-nowrap no-scrollbar">
                <AtomsLinkBtn href="#pro" variant="primary-outlined">{{ $t('project_mn_btn_01') }}</AtomsLinkBtn>
                <AtomsLinkBtn href="#cer" variant="primary-outlined">{{ $t('project_mn_btn_02') }}</AtomsLinkBtn>
                <AtomsLinkBtn href="#bio" variant="primary-outlined">{{ $t('project_mn_btn_03') }}</AtomsLinkBtn>
                <AtomsLinkBtn href="#com" variant="primary-outlined">{{ $t('project_mn_btn_04') }}</AtomsLinkBtn>
                <AtomsLinkBtn href="#tec" variant="primary-outlined">{{ $t('project_mn_btn_05') }}</AtomsLinkBtn>
            </div>
        </AtomsContainer>
        <AtomsContainer>
        <div class="flex flex-col lg:flex-row items-start justify-center gap-16 w-[98%]">  
            <div class="w-full md:h-full lg:w-[45%] bg-white py-10">
                <h3 class="font-semibold w-full text-[18px] mt-8 md:mt-4 lg:mt-4 md:text-[22px] lg:text-[22px] text-center lg:text-left md:text-left  leading-5 sm:leading-6 md:leading-8 lg:leading-10 text-secondary  mb-2">{{ $t('project_gs1_phrase') }}</h3>
                <h2 class="font-semibold w-full text-[18px] mt-8 md:mt-4 lg:mt-4 md:text-[28px] lg:text-[28px] text-center lg:text-left md:text-left  leading-5 sm:leading-6 md:leading-8 lg:leading-10 text-secondary  mb-2">{{ $t('project_subtitle_gs1') }}</h2>
                <p class="text-center lg:text-left">{{ $t('project_data_gs1') }}</p>
                <div class="flex items-center justify-center lg:justify-start pt-6 gap-2 w-full">
                    <AtomsLinkBtn href="#map" variant="primary">{{ $t('project_databtn01_gs1') }}</AtomsLinkBtn>

                    <AtomsLinkBtn
                            v-if="language === 'ES'"
                            href="#tally-open=mD5vZE&tally-layout=modal&tally-hide-title=1&tally-overlay=1"
                            variant="primary-outlined"
                            icon="Download"
                            iconPosition="left"
                        >
                            {{ $t('project_databtn02_gs1') }}
                        </AtomsLinkBtn>
                        <AtomsLinkBtn
                            v-else
                            href="#tally-open=nrVeKv&tally-layout=modal&tally-hide-title=1&tally-overlay=1"
                            variant="primary-outlined"
                            icon="Download"
                            iconPosition="left"
                        >
                            {{ $t('project_databtn02_gs1') }}
                        </AtomsLinkBtn>

                </div>
            </div>
            <div class="w-full lg:w-[45%]">
                <NuxtImg :src="`${urlImg}/images/mapInProject.webp`" alt="ProjectInWorld" class="w-full"/>
            </div>
        </div>
        </AtomsContainer>
    </section>
</template>
<script setup  lang="ts">
    import { useI18n } from 'vue-i18n';
    const config = useRuntimeConfig();
    const { t, locale } = useI18n();
    const language = locale.value.toUpperCase();
    const urlImg = config.public.url_base;
    console.log(language);
</script>
<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Oculta la barra de desplazamiento en Chrome, Safari y Opera */
}

.no-scrollbar {
  -ms-overflow-style: none;  /* Oculta la barra de desplazamiento en Internet Explorer y Edge */
  scrollbar-width: none;  /* Oculta la barra de desplazamiento en Firefox */
}
</style>