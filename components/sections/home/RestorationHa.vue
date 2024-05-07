<template>
    <div class="contador">
        <div class="color_fondo" :style="{ height: colorHeight }"></div>
        <div class="numero text-4xl xs:leading-9 sm:text-3xl sm:leading-9 md:text-[64px] lg:text-[64px]">{{ cantidad.toLocaleString() }} {{$t('home_pillar_ha')}} </div>
    </div>
</template>

<script setup>
import { ref,onMounted, onBeforeUnmount, onActivated } from "vue"
const { t, locale, setLocale } = useI18n()
const colorHeight = ref('0%');
const cantidad = ref(0);
let tiempo;

const iniciarContador = () => {
  
  tiempo = setInterval(() => {
    cantidad.value += 354321;
    colorHeight.value = `${(cantidad.value / 45000000) * 95}%`;
    if (cantidad.value >= 45000000) {
      cantidad.value = 45000000;
      clearInterval(tiempo);
    }
  }, 50);
};
onMounted(() => {
  
    iniciarContador();
});
</script>

<style scoped>
.contador {
  transform: rotate(180deg);
  margin: 0px;
  position: relative;
  height:4.9em;
}

.numero {
  height: 100%;
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-family: "Nunito";
  color: #1c9577;
  position: absolute;
  transform: rotate(-180deg);
  mix-blend-mode: lighten;
    background-color: #e7f8f6;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
}

.color_fondo {
  transition: 0.2s;
  transform-origin: bottom;
  position: absolute;
  display: block;
  height: 0%;
  width: 100%;
  height:3.9em;
  background-color: rgba(10, 190, 46, 0.796);
}
</style>