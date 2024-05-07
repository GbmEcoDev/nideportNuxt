<template>
    <!-- <h1 class="text-base text-left md:text-6xl max-sm:text-5xl max-sm:text-center dark:text-white font-bold"></h1> -->
    <h1 class="text-base text-center hidden md:text-6xl md:text-left md:block  lg:text-6xl lg:text-left lg:block xl:text-6xl xl:text-left xl:block font-bold">
        {{ texte }}
    </h1>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { texte } = defineProps<{texte:string}>()
</script>
<style scoped>
h1{
    color :#f2f2f2;
}
</style>