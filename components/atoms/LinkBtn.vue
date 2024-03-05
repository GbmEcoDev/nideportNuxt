<script lang="ts" setup>
const { href, variant, costumSpanClass="", costumTextColor="", widthBtn = ""  } = defineProps<{
    href:string,
    variant:"primary"|"primary-outlined"|"secondary"|"costum"|"cta"|"secondary-outlined",
    costumSpanClass?:string,
    costumTextColor?:string,
    widthBtn?: string;
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
</script>
<template>
    <NuxtLink :to="href" rel="next" class="px-3 md:px-7 max-lg:px-2 py-3 rounded relative group" :class="`${wClass}`">
        <span v-if="variant!=='costum'" class="absolute inset-0 rounded-xl group-hover:scale-105 origin-center transition-all ease-in-out" :class="`${spanClass}`"></span>
        <span class="relative flex items-center justify-center text-center" :class="`${textCl}`">
            <slot/>
        </span>
    </NuxtLink>
</template>