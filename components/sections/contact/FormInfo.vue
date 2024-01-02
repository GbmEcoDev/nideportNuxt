<template>
  <AtomsContainer class="scroll-snap-align-start">
    <div class="mx-32 max-sm:mx-1">
      <AtomsTitleH4 texte="Contactar a un representante"></AtomsTitleH4>
      <p class="text-left text-base text-secondary my-4  dark:text-white">Completa tus datos</p>
    </div>
    <div class="mx-32 mt-8 max-sm:mx-1">
      <form @submit.prevent="submit(form)" class="px-8 pt-6 pb-8 mb-4 max-sm:px-0"><!--   -->
        <div class="mb-4">
          <label for="nombre" class="block text-secondary text-sm mb-2  dark:text-white">Tu nombre:</label>
          <input type="text" id="nombre" v-model="form.nombre" class="border-b border-secondary w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
  
        <div class="mb-4">
          <label for="empresa" class="block text-secondary text-sm mb-2  dark:text-white">Tu empresa:</label>
          <input type="text" id="empresa" v-model="form.empresa" class="border-b border-secondary w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
  
        <div class="mb-4">
          <label for="telefono" class="block text-secondary text-sm mb-2  dark:text-white">Tu teléfono:</label>
          <input type="tel" id="telefono" v-model="form.telefono" class="border-b border-secondary w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
  
        <div class="mb-4">
          <label for="email" class="block text-secondary text-sm mb-2  dark:text-white">Tu email:</label>
          <input type="email" id="email" v-model="form.email" class="border-b border-secondary w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
  
        <div class="mb-4">
          <label class="flex items-center">
            <input type="checkbox" v-model="form.terminos" class="mr-2 leading-tight">
            <span class="text-secondary text-sm  dark:text-white">
              Acepto los términos y condiciones
            </span>
          </label>
        </div>
  
        <div class="mb-6">
          <label class="flex items-center">
            <input type="checkbox" v-model="form.notificaciones" class="mr-2 leading-tight">
            <span class="text-secondary text-sm  dark:text-white">
              Acepto recibir notificaciones
            </span>
          </label>
        </div>
  
        <div class="flex items-center justify-center">
          <button type="submit" :disabled="waiting" class="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <template v-if="waiting">Enviando...</template>
          <template v-else>Enviar</template>
        </button>
          <p v-if="errors"> error.</p>
      
		      <p v-if="succsess"> envio!</p>
        </div>
      </form>
    </div>

  </AtomsContainer>
  </template>


<script setup>
import { ref } from 'vue';
//import { send } from './composables/email.js';

const form = ref({
  nombre: '',
  empresa: '',
  telefono: '',
  email: '',
  terminos: false,
  notificaciones: false,
});
const waiting = ref(false);
const errors = ref(false);
const success = ref(false);

async function submit() {
  try {
    waiting.value = true;
    await send({
      from: form.value.email,
      subject: 'Mensaje desde formulario de contacto',
      text: `Nombre: ${form.value.nombre}\nEmpresa: ${form.value.empresa}\nTeléfono: ${form.value.telefono}\nEmail: ${form.value.email}`,
    });
    success.value = true;
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    errors.value = true;
  } finally {
    waiting.value = false;
  }
}
</script>
  <style scoped>h2{
    text-align: left;
  }</style>