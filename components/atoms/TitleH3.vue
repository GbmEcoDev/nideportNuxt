<template>
    <h2 class="text-2xl text-left md:text-5xl  font-bold">
        {{ texte }}
    </h2>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { texte } = defineProps<{texte:string}>()
</script>
<style scoped>
h2{
    color :rgba(0, 122, 119, 1);
}
</style>