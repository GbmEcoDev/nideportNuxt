<template>
     <div>
         <p v-if="color ? color === 'light' : $colorMode.value === 'light'">
            <NuxtImg :src="`${urlImg}/images/logo-nideport-dark.svg`" alt="Nideport" class="py-0 w-[150px] md:w-[185px] lg:w-[185px]"/>
             </p>
             <p v-if="color ? color === 'dark' : $colorMode.value === 'dark'">
            <NuxtImg :src="`${urlImg}/images/logo-nideport-dark.svg`" alt="Nideport" class="w-[150px] md:w-[185px] lg:w-[185px]"/>
             </p>
     </div>
</template>
<script setup>
const config = useRuntimeConfig()
const urlImg = config.public.url_base
const props = defineProps(['color'])
</script>
<style scope>
/*img {
    width:185px;
}*/
</style>