export default defineNuxtConfig({
  /* ssr: true, */

  nitro: {
    compressPublicAssets: {
      brotli: true,
    },
    prerender: {
      failOnError: true,
    },
  },
  generate: {
    exclude: ["robots.txt", "sitemap.xml"],
  },

  hooks: {
    async "prerender:routes"(ctx) {
      // Usaremos 'globby' para encontrar los archivos de forma segura
      // Asegúrate de instalarlo: npm install -D globby
      const { globby } = await import("globby");
      const perPage = 10; // El mismo valor que en tus componentes
      const locales = ["es", "en"]; // Tus idiomas
      const defaultLocale = "es"; // Tu idioma por defecto

      for (const locale of locales) {
        // Obtener el total de posts para cada idioma
        const files = await globby(`content/blog/${locale}/*.md`);
        const totalPosts = files.length;
        const totalPages = Math.ceil(totalPosts / perPage);

        // Agregar las rutas de paginación al prerender
        for (let page = 2; page <= totalPages; page++) {
          const path = `/blog/page/${page}`;
          const route = locale === defaultLocale ? path : `/${locale}${path}`;
          // Añadir la ruta al set de rutas a pre-renderizar
          ctx.routes.add(route);
          console.log(`Añadiendo ruta para prerender: ${route}`);
        }
      }
    },
  },

  css: [
    '@/assets/css/main.css',
  ],
  colorMode: {
    preference: 'light'
  },
  modules: [
    ['@nuxt/image', {
      image: {
        quality: 70,
      }
    }], 
    '@nuxt/devtools', 
    '@nuxtjs/i18n', 
    '@nuxt/content', 
    'vue3-carousel-nuxt', 
    'nuxt-swiper', 
    'nuxt3-leaflet', 
    '@nuxt/ui', 
    '@nuxtjs/device',
    '@pinia/nuxt',
  ],
  content: {
    locales: ['es', 'en'],

        // https://content.nuxtjs.org/api/configuration
        highlight: {
            theme: 'github-dark',
            preload: ['java','javascript']
        },
        markdown: {
            // https://github.com/rehypejs/rehype-external-links
            rehypePlugins: [
                [
                    'rehype-external-links',
                    {
                        target: '_blank',
                        rel: 'noopener noreferer'
                    }
                ]
            ]
        }
    },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}, 
    },
  },
  routeRules: {
    '/': { prerender: true },
/**/     '/blog': { isr: 3600 },
    '/blog/**': { isr: true },
    '/en/blog/**': { isr: true }, 
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    customRoutes: 'config',
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
  },
  runtimeConfig: {
   /*  // Estas variables solo estarán disponibles en el servidor
    // Nuxt las leerá automáticamente de tu archivo .env
    CONTACTMAILTO: '',
    CONTACTMAILFROM: process.env.CONTACT_MAIL_FROM,
    CONTACTMAILSUBJECT: process.env.CONTACT_MAIL_SUBJECT,
    SMTPTOKEN: process.env.SMTP_SERVER_SECURITY_TOKEN,
    // Las claves públicas también se declaran aquí */
    public: {
       url_base: process.env.BASE_URL,
      CONTACTMAILTO: process.env.CONTACTMAILTO,
      CONTACTMAILFROM: process.env.CONTACTMAILFROM,
      SMTPTOKEN: process.env.SMTP_SERVER_SECURITY_TOKEN,
      /* gtmContainerId: process.env.NUXT_PUBLIC_GTM_CONTAINER_ID, */
      adsContainerId: process.env.NUXT_PUBLIC_ADS_CONTAINER_ID,
      gaTrackingId: process.env.NUXT_PUBLIC_GA_CONTAINER_ID,
      hotjarId: process.env.CODE_HOTJAR_ID,

    }
  },
  plugins: ['~/plugins/nuxt-helpers.js'], 
   devtools: {
    timeline: {
      enabled: true
    }
  } 
});