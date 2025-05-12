<script lang="ts" setup>
import { ref, computed, defineAsyncComponent } from 'vue'
const { href, variant, costumSpanClass="", costumTextColor="", widthBtn = "", rel="", target="", icon="", iconPosition=""  } = defineProps<{
    href: string,
    variant: "primary" | "primary-outlined" | "secondary" | "costum" | "cta" | "secondary-outlined",
    costumSpanClass?: string,
    costumTextColor?: string,
    widthBtn?: string;
    rel?: string;
    target?: string;
    icon?: String; // Nombre del icono o componente
    iconPosition?: 'left' | 'right'; // Posición del icono
}>()

let spanClass:string = "";
let wClass: string = "";
let textCl:string = ""
if (variant === "primary") {
    spanClass = "bg-primary border-2 border-transparent"
    textCl = "text-white"
}else if(variant === "primary-outlined"){
    spanClass = "border-2 border-primary"
    textCl = "text-primary"
}
else if(variant === "secondary"){
    spanClass = "bg-primary/5"
    textCl = "text-primary"
}
else if(variant === "cta"){
    spanClass="bg-cta"
    textCl = "text-white"
}
else if(variant === "costum"){
    spanClass=costumSpanClass
    textCl = costumTextColor
}
if (widthBtn != "")
{
    wClass= widthBtn;
}

const camelCaseIcon = computed(() => {
  return icon ? defineAsyncComponent(() => import(`@/components/elements/icons/${icon}.vue`)) : null;
})
</script>
<template>
    <NuxtLink :to="href" :rel="rel" :target="target" class="px-3 md:px-7 max-lg:px-2 py-3 rounded relative group lg:m-1 " :class="`${wClass}`">
        <span v-if="variant!=='costum'" class="absolute inset-0 rounded-xl origin-center transition-all ease-in-out hover:bg-primary-700" :class="`${spanClass}`"></span>
        <span class="relative flex items-center justify-center text-center text-nowrap  white-space-nowrap overflow-hidden text-ellipsis" :class="`${textCl}`">
           <component :is="camelCaseIcon" v-if="camelCaseIcon && iconPosition === 'left'" class="mr-2" />
            <slot class=" text-wrap" />
            <component :is="camelCaseIcon" v-if="camelCaseIcon && iconPosition === 'right'" class="ml-2" />
        </span>
    </NuxtLink>
</template>