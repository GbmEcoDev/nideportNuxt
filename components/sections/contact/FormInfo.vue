<template>
  <AtomsContainer class="scroll-snap-align-start">
    <div class="mx-32 max-sm:mx-1">
      <AtomsTitleH4 :texte="$t('contact_form_title')"></AtomsTitleH4>
      <p class="text-left text-base text-secondary my-4  dark:text-white">{{$t('contact_form_legend')}}</p>
    </div>
    <div class="mx-32 mt-8 max-sm:mx-1">
      <form @submit.prevent="submit(form)" class="px-8 pt-6 pb-8 mb-4 max-sm:px-0"><!--   -->
        <div class="mb-4">
          <label for="nombre" class="block text-secondary text-sm mb-2  dark:text-white">{{$t('contact_form_label1')}}</label>
          <input type="text" id="nombre" v-model="form.nombre" class="border-b border-secondary text-2xl w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
  
        <div class="mb-4">
          <label for="empresa" class="block text-secondary text-sm mb-2  dark:text-white">{{$t('contact_form_label2')}}</label>
          <input type="text" id="empresa" v-model="form.empresa" class="border-b border-secondary text-2xl w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
  
        <div class="mb-4">
          <label for="telefono" class="block text-secondary text-sm mb-2  dark:text-white">{{$t('contact_form_label3')}}</label>
          <input type="tel" id="telefono" v-model="form.telefono" class="border-b border-secondary text-2xl w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
  
        <div class="mb-4">
          <label for="email" class="block text-secondary text-sm mb-2  dark:text-white">{{$t('contact_form_label4')}}</label>
          <input type="email" id="email" v-model="form.email" class="border-b border-secondary text-2xl w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
  
        <div class="mb-4">
          <label class="flex items-center">
            <input type="checkbox" v-model="form.terminos" class="mr-2 leading-tight">
            <span class="text-secondary text-sm  dark:text-white">
              {{$t('contact_form_label5')}}
            </span>
          </label>
        </div>
  
        <div class="mb-6">
          <label class="flex items-center">
            <input type="checkbox" v-model="form.notificaciones" class="mr-2 leading-tight">
            <span class="text-secondary text-sm  dark:text-white">
              {{$t('contact_form_label6')}}
            </span>
          </label>
        </div>
  
        <div class="flex items-center justify-center">
      <button aria-label="Send" type="submit"  :disabled="waiting" class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        <template v-if="waiting">{{$t('contact_form_button_act')}}</template>
        <template v-else>{{$t('contact_form_button')}}</template>
      </button>
      <p v-if="errors">error</p>
      <p v-if="success">ok</p>
    </div>
      </form>
    </div>
    <button  @click="SendEmail" class="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">test</button>
  </AtomsContainer>
  </template>


<script setup>
import { ref, onMounted } from 'vue';
const config = useRuntimeConfig();
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

const msg = {
  personalizations: [
    {
      to: [
        {
          email: "register@gbm.eco",
          name: "gestor"
        }
      ]
    }
  ],
  from: {
    email: "arielorobles@gmail.com",
    name: "My app"
  },
  subject: "Test message!",
  content: [
    {
      type: "text/plain",
      value: "Test message"
    },
    {
      type: "text/html",
      value: "<h1>Test message!</h1>"
    }
  ]
};
const SendEmail = async () => {
  try {
    
    const response = await fetch(`${config.public.url_base}/api/sendgrid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });

    if (response.ok) {
      success.value = true;
      console.log("Correo electrónico enviado correctamente");
    } else {
      errors.value = true;
      console.error("Error1 al enviar el correo electrónico");
    }
  } catch (error) {
    errors.value = true;
    console.error("Error al enviar el correo electrónico:", error);
  }
};


</script>
  <style scoped>h2{
    text-align: left;
  }</style>