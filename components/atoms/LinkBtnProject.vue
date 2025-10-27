<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
const props = defineProps<{
    href: string,
    variant: "primary" | "primary-outlined" | "secondary" | "custom" | "cta" | "secondary-outlined",
    customSpanClass?: string,
    customTextColor?: string,
    widthBtn?: string;
    rel?: string;
    target?: string;
    icon?: string; // Nombre del icono o componente
    iconPosition?: 'left' | 'right'; // Posición del icono
}>()

const wClass = computed(() => props.widthBtn || 'rounded-full');

const spanClass = computed(() => {
    switch (props.variant) {
        case "primary":
            return "bg-primary border-2 border-transparent";
        case "primary-outlined":
            return "border-2 border-primary";
        case "secondary":
            return "bg-primary/5";
        case "cta":
            return "bg-cta";
        case "custom":
            return props.customSpanClass || '';
        default:
            return '';
    }
});

const textCl = computed(() => {
    if (props.variant === 'custom') return props.customTextColor;
    if (props.variant === 'primary' || props.variant === 'cta') return 'text-white';
    return 'text-primary';
});

const camelCaseIcon = computed(() => {
  return props.icon ? defineAsyncComponent(() => import(`@/components/elements/icons/${props.icon}.vue`)) : null;
})
</script>
<template>
    <NuxtLink :to="href" :rel="rel" :target="target" class="px-3 md:px-7 max-lg:px-2 py-3 relative group lg:m-1" :class="wClass">
        <!-- Capa de fondo: aplica el color y la transición -->
        <span class="absolute inset-0 rounded-full origin-center transition-all ease-in-out duration-300" :class="[spanClass, variant !== 'custom' ? 'group-hover:bg-primary-100 group-hover:border-primary' : '']"></span>
        <!-- Capa de contenido: aplica el color del texto y lo mantiene centrado -->
        <span class="relative flex items-center justify-center text-center text-nowrap white-space-nowrap overflow-hidden text-ellipsis transition-colors duration-300" :class="textCl">
            <component :is="camelCaseIcon" v-if="camelCaseIcon && iconPosition === 'left'" class="mr-2" />
            <slot class="text-wrap" />
            <component :is="camelCaseIcon" v-if="camelCaseIcon && iconPosition === 'right'" class="ml-2" />
        </span>
    </NuxtLink>
</template>