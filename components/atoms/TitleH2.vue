<template>
    <h2 :class="`${spanClassTxt} ${sClass} ${cClass} ${wClass}`" >
        {{ texte }}
    </h2>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
//const { texte } = defineProps<{texte:string}>()


const { texte, alignTxt, sizeTxt = "", colorTxt = "", weightTxt = ""   } = defineProps<{
    texte:string;
    alignTxt: "left" | "center" | "right";
    colorTxt: "primary" | "secondary" | "fivety" | "white";
    sizeTxt?: string;
    weightTxt: "normal" | "bold" | "italic"
}>();

let spanClassTxt: string = "";
let cClass: string = "";
let wClass: string = "";
let sClass: string = "text-2xl  md:text-3xl";

if (alignTxt === "left") {
    spanClassTxt = "lg:text-left md:text-left text-center";
} else if (alignTxt === "center") {
    spanClassTxt = "text-center";
} else if (alignTxt === "right") {
    spanClassTxt = "text-right";
}
if (sizeTxt != "") {
    sClass= sizeTxt;
}

if (colorTxt === "primary") {
    cClass = "text-primary";
} else if (colorTxt === "secondary") {
    cClass = "text-secondary ";
} else if (colorTxt === "fivety") {
    cClass = "text-[#016A81]";
} else if (colorTxt === "white") {
    cClass = "text-white";
}

if (weightTxt === "normal") {
    wClass = "font-normal";
} else if (weightTxt === "bold") {
    wClass = "font-bold";
} else if (weightTxt === "italic") {
    wClass = "font-italic";
}
</script>
<style scoped>
</style>