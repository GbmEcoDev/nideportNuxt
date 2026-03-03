// ~/plugins/gtm.client.ts
import { watch } from 'vue';
import { useConsent } from '~/composables/useConsent';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('vue:setup', () => {
    const {
      public: { gtmContainerId },
    } = useRuntimeConfig();

    const { consentState } = useConsent();
    let gtmLoaded = false;

    const loadGtm = () => {
      if (!gtmContainerId || gtmLoaded) return;
      gtmLoaded = true;

      useHead({
        script: [
          {
            children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmContainerId}');`,
            tagPriority: 'high',
          },
        ],
        noscript: [
          {
            children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmContainerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            tagPosition: 'bodyOpen',
          },
        ],
      });
    };

    // Si ya había consentimiento al cargar la app, inyectamos GTM
    if (consentState.value === true) {
      loadGtm();
    }

    // Observamos cambios en el consentimiento (cuando el usuario acepta en el banner)
    watch(
      consentState,
      (value) => {
        if (value === true) {
          loadGtm();
        }
      },
      { immediate: false }
    );
  });
});