<template>
    <div class="contador">
        <div class="color_fondo" :style="{ height: colorHeight }"></div>
        <div class="numero xs:text-4xl xs:leading-7 lg:text-6xl">{{ cantidad.toLocaleString() }} HECTAREAS </div>
    </div>
</template>

<script setup>
import { ref,onMounted, onBeforeUnmount, onActivated } from "vue"
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
/*
 onActivated(() => {
    cantidad.value = 0;
    colorHeight.value = '0%';
    iniciarContador();
  }); 

onBeforeUnmount(() => {
  clearInterval(intervalo);
});*/
</script>

<style scoped>
.contador {
  transform: rotate(180deg);
  margin: 0px;
  position: relative;
  height:4.1em;
}

.numero {
  height: 100%;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-family: sans-serif;
  color: #1c9577;
  position: absolute;
  transform: rotate(-180deg);
  mix-blend-mode: lighten;
    background-color: #e7f8f6;
  display: flex;
  justify-content: center;
  align-items: center;
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