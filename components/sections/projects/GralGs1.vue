<template>
    <section class="pt-2 pb-25 md:pt-2 scroll-snap-align-start">
        <AtomsContainer class="pt-16">
        <div class="flex flex-col lg:flex-row items-start justify-center gap-16 w-[98%]">  
            <div class="w-full md:h-full lg:w-[45%] bg-white"><!--  py-10 -->
                <h3 class="font-semibold w-full text-[18px] mt-8 md:mt-4 lg:mt-4 md:text-[22px] lg:text-[22px] text-center lg:text-left md:text-left leading-4 sm:leading-5 md:leading-6 lg:leading-7 text-secondary  mb-2">{{ $t('project_gs1_phrase') }}</h3>
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

</script>
<style scoped>

</style>