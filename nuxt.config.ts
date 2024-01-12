//import { defineNuxtModule } from 'nuxt'


export default defineNuxtConfig({

  css: [
    '@/assets/css/main.css',
  ],
  modules:[
    '@nuxt/image',
    '@nuxt/devtools',
    //'@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content',
    //'@nuxtjs/color-mode',
    'vue3-carousel-nuxt',
    'nuxt-swiper',
    'nuxt3-leaflet',
    '@nuxt/ui',
  ],
  carousel: {
    prefix: 'MyPrefix'
  },
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    //classSuffix: '-mode',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  //buildModules: ['@nuxt/postcss8'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}, 
    },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    },
    customRoutes: 'config',   //config or disable custom route with page components
    pages: {
      index: {
        en: '/', 
        es: '/'     
      },
      about: {
        en: '/about', 
        es: '/sobre'     
      },
      projects: {
        en: '/projects', 
        es: '/proyectos'     
      },
      blog: {
        en: '/blog', 
        es: '/blog'     
      },
      contact: {
        en: '/contact', 
        es: '/contacto'     
      },
      map: {
        en: '/map', 
        es: '/mapa'     
      },
      tech: {
        en: '/tech', 
        es: '/tecno'     
      }
    },

    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales:[
      {
        code:"es",
        iso: "es-ES",
        name: "ES",
        file: "es.json"
      },
      {
        code:"en",
        iso: "en-US",
        name: "EN",
        file: "en.json"
      }
    ],
    defaultLocale: "es",
    
    /* fallbackLocale: "es", */
  },
/* */  
  runtimeConfig: {
      public: {
          wpEventos : process.env.WP_EVENT,
          wordpressUrl: process.env.WP_POST,
          url_base : process.env.BASE_URL,
          MAILHOST: process.env.MAILHOST,
          MAILPORT: process.env.MAILPORT,
          MAILUSER: process.env.MAILUSER,
          MAILPASSWORD: process.env.MAILPASSWORD,
          CONTACTMAIL: process.env.CONTACTMAIL
      }
  }
})