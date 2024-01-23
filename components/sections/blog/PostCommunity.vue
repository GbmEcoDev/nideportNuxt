<template>
    <div class="">
      <div v-if="pending" class="flex items-start justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 200 200">
          <circle fill="#0FAEA9" stroke="#0FAEA9" stroke-width="15" r="15" cx="40" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
          </circle>
          <circle fill="#0FAEA9" stroke="#0FAEA9" stroke-width="15" r="15" cx="100" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
          </circle>
          <circle fill="#0FAEA9" stroke="#0FAEA9" stroke-width="15" r="15" cx="160" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
          </circle>
        </svg>
      </div>
      <div v-else-if="error || !data">
        <h2>Error</h2>
      </div>
      <div v-else class="flex-grid">
        <p class="font-bold text-primary mb-4 mt-8 text-[1.6em] flex ">
         <svg  width="32" height="32" data-name="Layer 1" id="Layer_1" class="icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title/><path d="M11.34351,50.22852a4,4,0,1,0-4.687,0A3.9147,3.9147,0,0,0,4,53.92712V60H14V53.92712A3.9147,3.9147,0,0,0,11.34351,50.22852Z"/><circle cx="32" cy="13" r="5"/><rect height="4" width="2" x="31" y="2"/><rect height="4" width="2" x="31" y="20"/><rect height="2" width="4" x="21" y="12"/><rect height="2" width="4" x="39" y="12"/><rect height="1.99979" transform="translate(6.72561 29.14623) rotate(-45)" width="4.1142" x="36.48831" y="5.4547"/><rect height="1.99979" transform="translate(-6.36522 23.72383) rotate(-45)" width="4.1142" x="23.39749" y="18.54552"/><rect height="4.1142" transform="translate(2.89139 19.88962) rotate(-45)" width="1.99979" x="24.4547" y="4.39749"/><rect height="4.11489" transform="translate(-2.53291 32.9734) rotate(-44.99039)" width="1.99979" x="37.54552" y="17.48748"/><path d="M13,33.834A4.50418,4.50418,0,0,0,10,32l-.001,2a3.34648,3.34648,0,0,1,1.59375,1.28027,1.73532,1.73532,0,0,0,2.81348.001A3.35314,3.35314,0,0,1,16,34V32A4.50418,4.50418,0,0,0,13,33.834Z"/><path d="M18,32l-.001,2a3.34648,3.34648,0,0,1,1.59375,1.28027,1.73532,1.73532,0,0,0,2.81348.001A3.35314,3.35314,0,0,1,24,34V32a4.50418,4.50418,0,0,0-3,1.834A4.50418,4.50418,0,0,0,18,32Z"/><path d="M5.18457,39.11816l1.98633-.23632A24.45107,24.45107,0,0,1,7,36,23.99478,23.99478,0,0,1,17.56055,16.11328L16.43945,14.457A25.99153,25.99153,0,0,0,5,36,26.56191,26.56191,0,0,0,5.18457,39.11816Z"/><path d="M31,60a23.95892,23.95892,0,0,1-12.47949-3.49512l-1.041,1.707A26.06876,26.06876,0,0,0,38.2793,60.9668l-.5586-1.91992A24.027,24.027,0,0,1,31,60Z"/><path d="M51.16016,22.544l1.67968-1.0879a25.97562,25.97562,0,0,0-7.27929-7.42968l-1.1211,1.65625A23.9777,23.9777,0,0,1,51.16016,22.544Z"/><path d="M18.40625,41.28125A3.35314,3.35314,0,0,1,20,40V38a4.50418,4.50418,0,0,0-3,1.834A4.50418,4.50418,0,0,0,14,38l-.001,2a3.34648,3.34648,0,0,1,1.59375,1.28027,1.73532,1.73532,0,0,0,2.81348.001Z"/><path d="M55.80981,28.28308a5.1648,5.1648,0,0,0-9.61962,0A5.15325,5.15325,0,0,0,41,33.18182a4.57848,4.57848,0,0,0,1.00348,2.83973,4.815,4.815,0,0,0-.17017,1.25116,4.95518,4.95518,0,0,0,5,4.90911A10.945,10.945,0,0,0,50,41.628v9.38934c-5.05322.17383-9,1.69538-9,4.98267,0,2.76141,4.47717,5,10,5s10-2.23859,10-5c0-2.59259-3.94678-4.72382-9-4.97473V41.628a10.945,10.945,0,0,0,3.16669.55383,4.95518,4.95518,0,0,0,5-4.90911,4.815,4.815,0,0,0-.17017-1.25116A4.57848,4.57848,0,0,0,61,33.18182,5.15325,5.15325,0,0,0,55.80981,28.28308ZM49,55.5H45v-1h4Zm7,0v1H52v-1Z"/></svg>
          {{ selectedCategory }}</p>
        <SectionsBlogPostGral v-for="post in data" :key="post.uri" :post="post"></SectionsBlogPostGral>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';

  const { locale } = useI18n()
  const config = useRuntimeConfig();
  const language = locale.value.toUpperCase();

  const defaultCategory = language === 'ES' ? 'Comunidades' : 'Communities-en';
  const selectedCategory = ref(defaultCategory);

  let data, error, pending;
try {
  ({ data, error, pending } = await useFetch(config.public.wordpressUrl, {
    lazy: true,
    method: 'post',
    body: {
      query: `
        query posts($language: LanguageCodeFilterEnum!, $category: String!) {
          posts(where: { language: $language, categoryName: $category }, first: 3) {
            edges {
              node {
                id
                excerpt
                title
                date
                uri
                slug
                featuredImage {
                  node {
                    id
                    sourceUrl
                  }
                }
                language {
                  code
                  locale
                }
                categories(first:100) {
                nodes {
                  name
                }
              }
              }
            }
          }
        }
      `,
      variables: {
        language: language,
        category: selectedCategory.value
      }
    },
    transform(data) {
      //return data.data.posts.edges.map((edge) => edge.node);
      return data?.data?.posts?.edges?.map((edge) => transformPost(edge?.node)) || [];
    }
  }));

} catch (e) {
    console.error('Error fetching data:', e);
    // Handle the error as needed
    error = true;
    pending = false;
    data = null;
  }
  
  function transformPost(node) {
    return {
      id: node?.id || '',
      excerpt: node?.excerpt || '',
      title: node?.title || '',
      date: node?.date || '',
      uri: node?.uri || '',
      slug: node?.slug || '',
      sourceUrl: node?.featuredImage?.node?.sourceUrl,
      language: node?.language || '',
      categories: node?.categories?.nodes?.map((category) => category?.name).join(', ') || '',
    };
  }

  </script>
    <style scoped>
    svg.icon{
      background-color: rgb(0,119,112);
      fill:white;
      padding:6px;
      border-radius: 100%;
      margin-right: 10px;
    }
    </style>