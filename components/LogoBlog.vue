<template>
     <div>
         <p v-if="color ? color === 'light' : $colorMode.value === 'light'">
            <NuxtImg :src="`${urlImg}/images/nideport-by-gbm-color.svg`" alt="Nideport by GBM" class="py-0 w-[150px] md:w-[185px] lg:w-[185px]"/>
             </p>
             <p v-if="color ? color === 'dark' : $colorMode.value === 'dark'">
            <NuxtImg :src="`${urlImg}/images/nideport-by-gbm.svg`" alt="Nideport by GBM" class="w-[150px] md:w-[185px] lg:w-[185px]"/>
             </p>
     </div>
</template>
<script setup>
const config = useRuntimeConfig()
const urlImg = config.public.url_base
const props = defineProps(['color'])
</script>