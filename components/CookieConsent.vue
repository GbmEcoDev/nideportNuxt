<template>
  <!-- Mostramos el banner solo si el usuario aún no ha tomado una decisión -->
  <div v-if="showBanner" class="cookie-banner">
    <div class="cookie-banner__content">
      <p>
        {{ $t('cookie.banner.text') }}
        <a href="/politica-de-privacidad">{{ $t('cookie.banner.readMore') }}</a>.
      </p>
      <div class="cookie-banner__actions">
        <button @click="handleConsent(false)">{{ $t('cookie.banner.reject') }}</button>
        <button @click="handleConsent(true)" class="primary">{{ $t('cookie.banner.acceptAll') }}</button>
        <!-- Opcional: Botón para preferencias granulares -->
        <!-- <button @click="showPreferences = true">Preferencias</button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useConsent } from '~/composables/useConsent';

// Obtenemos el estado global del consentimiento
const { consentState } = useConsent();

// Cookie para persistir la elección del usuario (dura 1 año)
const consentCookie = useCookie<boolean | undefined>('user-consent', {
  maxAge: 60 * 60 * 24 * 365, // 1 año en segundos
  path: '/',
  sameSite: 'lax',
});

// Estado local para controlar la visibilidad del banner
const showBanner = ref(false);

// Función para manejar la decisión del usuario
const handleConsent = (hasConsented: boolean) => {
  // Actualizamos el estado global
  consentState.value = hasConsented;
  // Guardamos la elección en la cookie
  consentCookie.value = hasConsented;
  // Ocultamos el banner
  showBanner.value = false;
};

// Lógica que se ejecuta solo en el cliente
onMounted(() => {
  // Sincronizamos el estado global con el valor de la cookie al cargar
  consentState.value = consentCookie.value;

  // Si la cookie no existe (es la primera visita o ha expirado), mostramos el banner
  if (consentCookie.value === undefined) {
    showBanner.value = true;
  }
});
</script>
<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  }
  
.cookie-banner__content {
  max-width: 900px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.cookie-banner__content {
  max-width: 900px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  max-width: 900px; /* Asegura que el contenido no se extienda demasiado en pantallas grandes */
}

.cookie-banner__content p {
  margin: 0;
  flex-grow: 1;
}

.cookie-banner__content a {
  color: #42b983;
  text-decoration: underline;
}

.cookie-banner__actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.cookie-banner__actions button {
  padding: 0.5rem 1rem;
  border: 1px solid #42b983;
  background-color: transparent;
  color: #42b983;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

.cookie-banner__actions button:hover {
  background-color: #42b983;
  color: white;
}

.cookie-banner__actions button.primary {
  background-color: #42b983;
  color: white;
}
</style>