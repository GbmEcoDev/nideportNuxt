<template>
    <section class="p-[80px] max-sm:px-1 scroll-snap-align-start">
    <AtomsContainer>
        <div class="flex flex-col items-center w-full">
            <NuxtImg src="/images/logo-ods.svg" alt="" class=" text-center w-[100px] pb-10"/>
            <AtomsTitleH2 :texte="$t('project_ods_title')" alignTxt="center" colorTxt="secondary" weightTxt="normal"/>

        <div class="flex flex-wrap justify-center max-sm:justify-center gap-3 mt-20 mb-50">
            <div class="max-sm:w-5/12 w-40 mb-4"><NuxtImg :src="`${urlImg}/images/ODS1.png`" alt="" /></div>
            <div class="max-sm:w-5/12 w-40 mb-4"><NuxtImg :src="`${urlImg}/images/ODS5.png`" alt="" /></div>
            <div class="max-sm:w-5/12 w-40 mb-4"><NuxtImg :src="`${urlImg}/images/ODS8.png`" alt="" /></div>
            <div class="max-sm:w-5/12 w-40 mb-4"><NuxtImg :src="`${urlImg}/images/ODS13.png`" alt="" /></div>
            <div class="max-sm:w-5/12 w-40 mb-4"><NuxtImg :src="`${urlImg}/images/ODS15.png`" alt="" /></div>
            <div class="max-sm:w-5/12 w-40 mb-4"><NuxtImg :src="`${urlImg}/images/ODS17.png`" alt="" /></div>
        </div>
        </div>
    </AtomsContainer>
    </section>
</template>

<script setup>
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
</script>

<style lang="scss" scoped>

</style>