<template>
  <AtomsContainer class="scroll-snap-align-start">
    <div class="mx-32 max-sm:mx-1">
      <AtomsTitleH4 :texte="$t('contact_form_title')"></AtomsTitleH4>
      <p class="text-left text-base font-bold text-secondary my-4 ">{{$t('contact_form_legend')}}</p>
    </div>
    <div class="mx-32 mt-8 max-sm:mx-1">
   
        <div class="mb-8">
          <label for="nombre" class="block text-secondary text-sm">{{$t('contact_form_label1')}}</label>
          <input type="text" id="nombre" v-model="nombre" class="border-b border-secondary text-xl w-full px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline " required>

        </div>
  
        <div class="mb-8">
          <label for="empresa" class="block text-secondary text-sm">{{$t('contact_form_label2')}}</label>
          <input type="text" id="empresa" v-model="empresa" class="border-b border-secondary text-xl w-full px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>

        </div>
  
        <div class="mb-8">
          <label for="telefono" class="block text-secondary text-sm">{{$t('contact_form_label3')}}</label>
          <input type="tel" id="telefono" v-model="telefono" class="border-b border-secondary text-xl w-full px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
  
        </div>
  
        <div class="mb-8">
          <label for="email" class="block text-secondary text-sm">{{$t('contact_form_label4')}}</label>
          <input type="email" id="email" v-model="email" class="border-b border-secondary text-xl w-full px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline" required>
         
        </div>
  
        <div class="mb-6">
          <label class="flex items-center">
            <input type="checkbox" v-model="terminos" class="mr-2 leading-tight">
            <span class="text-secondary text-sm ">
              {{$t('contact_form_label5')}}
            </span>
          </label>
        </div>
  
        <div class="mb-6">
          <label class="flex items-center">
            <input type="checkbox" v-model="notificaciones" class="mr-2 leading-tight">
            <span class="text-secondary text-sm ">
              {{$t('contact_form_label6')}}
            </span>
          </label>
        </div>
  
        <div class="flex items-center justify-center">
          <button @click="sendEmail" class="bg-cta hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {{$t('contact_form_button')}}
          </button>

        </div>

    </div>
    
  </AtomsContainer>
  <div id="myModal" class="modal">
    <div class="modal-content rounded-lg mx-auto lg:w-1/2 xs:w-11/12 sm:w-11/12 xs:mt-36 sm:mt-36" >
      <span class="close">&times;</span>
        <div class="flex xs:flex-col sm:flex-col justify-center w-full ">
            <div class="flex justify-center w-full">
              <NuxtImg :src="`${urlImg}/images/imagonideport.svg`" width="224" class="max-w-none w-[10rem] h-auto max-sm:w-[124px] max-sm:h-[124px]" alt="Logo Nideport"/></div>
            <div class=" w-full md:px-10 col-span-2">
              <h6 class="mt-4 text-center text-primary  mb-2 text-4xl font-bold md:text-4xl xl:text-5x1 max-sm:text-center max-sm:mt-2">
                {{$t('contact_form_thank')}}
              </h6>
            </div>
        </div>
    </div>
  </div>
  </template>
<script setup>
import { ref , computed} from 'vue';
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
// Formulario de contacto
const nombre = ref('');
const empresa = ref('');
const telefono = ref('');
const email = ref('');
const terminos = ref(false);
const notificaciones = ref(false);

const checkOneChecked = computed(() => terminos.value || notificaciones.value)


const sendEmail = () => {
  if (!checkOneChecked.value) { alert('Debe seleccionar una opción');return; }

  Email.send({
    SecureToken: config.public.SMTPTOKEN,
    To: config.public.CONTACTMAILTO,
    From: config.public.CONTACTMAILFROM,
    Subject: "Contacto desde Nideport website",
    Body: `
      Nombre: ${nombre.value}<br>
      Empresa: ${empresa.value}<br>
      Teléfono: ${telefono.value}<br>
      Correo electrónico: ${email.value}<br>
      Solicita información para adquirir creditos: ${terminos.value ? 'Sí' : 'No'}<br>
      Solicita información sobre el manejo de tierras: ${notificaciones.value ? 'Sí' : 'No'}
    `
  //}).then(message => alert(message));
  }).then(message => {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    //reseteo input
    nombre.value=""; 
    empresa.value=""; 
    telefono.value=""; 
    email.value="";
    terminos.value=false;
    notificaciones.value=false;
});
}
</script>
<style scoped>
/* The Modal (background) */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;

  padding: 20px;
  border: 1px solid #888;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}


</style>