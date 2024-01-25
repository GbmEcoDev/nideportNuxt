<script lang="ts" setup>
const { href, variant, costumSpanClass = "", costumBorderColor = "", widthBtn = ""  } = defineProps<{
    href: string;
    variant: "primary" | "primary-outlined" | "secondary" | "secondary-outlined" | "custom";
    costumSpanClass?: string;
    costumBorderColor?: string;
    widthBtn?: string;
}>();

let spanClass: string = "";
let wClass: string = "";
let borderColor: string = "";
if (variant === "primary") {
    spanClass = "bg-transparent border-2";
    borderColor = "border-[#02A327]";
} else if (variant === "primary-outlined") {
    spanClass = "bg-transparent border-2";
    borderColor = "border-primary";
} else if (variant === "secondary") {
    spanClass = "bg-transparent border-2";
    borderColor = "border-primary";
} else if (variant === "custom") {
    spanClass = costumSpanClass;
    borderColor = costumBorderColor || "border-primary";
}
if (widthBtn != "")
{
    wClass= widthBtn;
}
</script>

<template>
    <NuxtLink :to="href" rel="next" class="px-6 md:px-5 py-3 max-lg:px-2 rounded relative group" :class="`${wClass}`">
        <span v-if="variant !== 'custom'" class="absolute inset-0 rounded-xl group-hover:scale-105 origin-center transition-all ease-in-out" :class="`${spanClass} ${borderColor}`"></span>
        <span class="relative text-[#02A327] flex items-center justify-center" :class="borderColor">
            <slot/>
        </span>
    </NuxtLink>
</template>
