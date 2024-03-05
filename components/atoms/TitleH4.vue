<template>
    <h2 class="text-base text-center md:text-3xl max-sm:text-2xl dark:text-white font-bold text-secondary" :class="`${onColor} ${onSize}`">
        {{ texte }}
    </h2>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { texte, color = "", size = "" } = defineProps<{texte:string, color?:string, size?:string}>()
let onColor: string = "";
let onSize: string = "";

if (color != "")
{
    onColor= color;
}
if (size != "")
{
    onSize= size;
}
</script>
