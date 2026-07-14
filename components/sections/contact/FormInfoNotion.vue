<template>
  <AtomsContainer class="scroll-snap-align-start">
    <div class="mx-32 max-sm:mx-1">
      <AtomsTitleH4 :texte="$t('contact_form_title')"></AtomsTitleH4>
      <p class="text-left text-base font-bold text-secondary my-4 ">{{$t('contact_form_legend')}}</p>
    </div>
    <form @submit.prevent="sendForm" class="mx-32 mt-8 max-sm:mx-1">
   
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
          <button 
            type="submit" 
            :disabled="isLoading"
            class="bg-cta hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isLoading ? 'Enviando...' : $t('contact_form_button') }}
          </button>
        </div>

    </form>
    
  </AtomsContainer>

  <!-- Modal de confirmación para Notion -->
  <div id="myModal" class="modal">
    <div class="modal-content rounded-lg mx-auto lg:w-1/2 xs:w-11/12 sm:w-11/12 xs:mt-36 sm:mt-36" >
      <span class="close">&times;</span>
      <div class="flex xs:flex-col sm:flex-col justify-center w-full ">
        <div class="flex justify-center w-full">
          <NuxtImg :src="`${urlImg}/images/imagonideport.svg`" width="224" class="max-w-none w-[10rem] h-auto max-sm:w-[124px] max-sm:h-[124px]" alt="Logo Nideport"/>
        </div>
        <div class=" w-full md:px-10 col-span-2">
          <h6 class="mt-4 text-center text-primary mb-2 text-4xl font-bold md:text-4xl xl:text-5x1 max-sm:text-center max-sm:mt-2">
            {{$t('contact_form_thank')}}
          </h6>
          <p class="text-center text-secondary text-sm mt-4">
            ✓ Tus datos fueron recibidos exitosamente por nuestro sistema
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de error -->
  <div id="errorModal" class="modal">
    <div class="modal-content rounded-lg mx-auto lg:w-1/2 xs:w-11/12 sm:w-11/12 xs:mt-36 sm:mt-36">
      <span class="close-error">&times;</span>
      <div class="flex xs:flex-col sm:flex-col justify-center w-full">
        <div class="flex justify-center w-full">
          <NuxtImg :src="`${urlImg}/images/imagonideport.svg`" width="224" class="max-w-none w-[10rem] h-auto max-sm:w-[124px] max-sm:h-[124px]" alt="Logo Nideport"/>
        </div>
        <div class=" w-full md:px-10 col-span-2">
          <h6 class="mt-4 text-center text-red-600 mb-2 text-2xl font-bold max-sm:text-center max-sm:mt-2">
            Error al enviar
          </h6>
          <p class="text-center text-secondary text-sm mt-4">
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const config = useRuntimeConfig();
const urlImg = config.public.url_base;

// Dev: Nitro (server/api). Producción estática (cPanel/Apache): PHP en public_html/api/
const contactNotionUrl = import.meta.dev
  ? '/api/contact-notion'
  : '/api/contact-notion.php';

// Estado del formulario
const nombre = ref('');
const empresa = ref('');
const telefono = ref('');
const email = ref('');
const terminos = ref(false);
const notificaciones = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const checkOneChecked = computed(() => terminos.value || notificaciones.value);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const sendForm = async () => {
  // Validaciones
  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  if (!nombre.value) { 
    alert('Debe ingresar un nombre');
    return; 
  }
  if (!empresa.value) { 
    alert('Debe ingresar una empresa');
    return; 
  }
  if (!telefono.value) { 
    alert('Debe ingresar un teléfono');
    return; 
  }
  if (!email.value) { 
    alert('Debe ingresar un email');
    return; 
  }
  if (!validateEmail(email.value)) { 
    alert('El email no es válido'); 
    return; 
  }
  if (!checkOneChecked.value) { 
    alert('Debe seleccionar una opción');
    return; 
  }

  isLoading.value = true;

  try {
    // Enviar datos a nuestro endpoint que se conecta con Notion
    const response = await fetch(contactNotionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre.value,
        empresa: empresa.value,
        telefono: telefono.value,
        email: email.value,
        terminos: terminos.value,
        notificaciones: notificaciones.value,
      }),
    });

    isLoading.value = false;

    const rawText = await response.text();
    let payload = {};
    try {
      payload = rawText ? JSON.parse(rawText) : {};
    } catch {
      payload = {};
    }

    const notionOk =
      response.ok &&
      payload.success === true &&
      typeof payload.notion_page_id === 'string';

    if (notionOk) {
      // Evento de conversión para GTM/GA4/Google Ads (envío exitoso del formulario)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        form_name: 'contact_form',
        form_destination: 'notion',
      });

      // Mostrar modal de éxito
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';

      // Lógica para cerrar el modal de éxito
      const span = document.getElementsByClassName('close')[0];
      span.onclick = () => { 
        modal.style.display = 'none';
        // Limpiar formulario después de cerrar
        nombre.value = '';
        empresa.value = '';
        telefono.value = '';
        email.value = '';
        terminos.value = false;
        notificaciones.value = false;
      };
      window.onclick = (event) => { 
        if (event.target == modal) { 
          modal.style.display = 'none';
          // Limpiar formulario
          nombre.value = '';
          empresa.value = '';
          telefono.value = '';
          email.value = '';
          terminos.value = false;
          notificaciones.value = false;
        } 
      };
    } else {
      // Mostrar modal de error
      errorMessage.value =
        payload.statusMessage ||
        (rawText && !payload.statusMessage ? rawText.slice(0, 200) : '') ||
        'Hubo un error al enviar el formulario. Por favor, intente de nuevo.';
      
      const errorModal = document.getElementById('errorModal');
      errorModal.style.display = 'block';

      const closeError = document.getElementsByClassName('close-error')[0];
      closeError.onclick = () => { errorModal.style.display = 'none'; };
      window.onclick = (event) => { 
        if (event.target == errorModal) { errorModal.style.display = 'none'; } 
      };
    }
  } catch (error) {
    isLoading.value = false;
    console.error('Error al enviar el formulario:', error);
    
    errorMessage.value = 'Hubo un problema de conexión. Por favor, verifique su red e intente de nuevo.';
    const errorModal = document.getElementById('errorModal');
    errorModal.style.display = 'block';

    const closeError = document.getElementsByClassName('close-error')[0];
    closeError.onclick = () => { errorModal.style.display = 'none'; };
    window.onclick = (event) => { 
      if (event.target == errorModal) { errorModal.style.display = 'none'; } 
    };
  }
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
.close, .close-error {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus,
.close-error:hover,
.close-error:focus {
  color: black;
  text-decoration: none;
}
</style>
