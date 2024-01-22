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
      <div v-else>
        <p class="font-bold text-primary mb-4 mt-8 text-[1.6em] flex ">
         <svg  width="32" height="32" id="Layer_4" class="icon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><title/><g id="Save_Nature"><path d="M144.5557,99.6506a1.7564,1.7564,0,0,0-2.4186-.5325L115.3613,115.951V86.4449L130.6342,76.76a1.7511,1.7511,0,1,0-1.8861-2.951l-13.3868,8.4891V66.0306a1.7512,1.7512,0,1,0-3.5023,0v49.7561L85.3446,99.1181a1.7512,1.7512,0,0,0-1.8862,2.9511l28.4006,17.8543v28.8858a59.4833,59.4833,0,0,1-20.7172-5.7351l12.19-10.0223A6.2225,6.2225,0,0,0,97.69,122.2567L46.9375,136.5751H36.7157v27.5331h71.47c13.8525,0,29.9-10.6053,29.9-10.6053a5.8746,5.8746,0,0,0,1.2947-8.9707,55.4134,55.4134,0,0,1-24.0191,4.4728V120.0878l28.6619-18.0186A1.7564,1.7564,0,0,0,144.5557,99.6506Z"/><path d="M146.5006,83.0233a38.939,38.939,0,1,0-74.9469,4.296,18.5317,18.5317,0,1,0,25.5307,26.8595L81.8428,104.597a4.7518,4.7518,0,0,1,5.0985-8.0187l21.9177,13.7788V66.0306c0-6.1534,9.5023-5.5714,9.5023,0V76.8431l8.7711-5.562c5.1054-3.2566,10.1766,4.9322,5.1084,8.0122l-13.88,8.8015v22.4267l22.16-13.9313c4.3082-2.9185,10.1307,4.19,5.0984,8.0187l-25.2024,15.8439a23.9194,23.9194,0,1,0,26.0831-37.4295Z"/></g></svg>
          {{ selectedCategory }}</p>
        <div class="flex-grid">
          <SectionsBlogPostGral v-for="post in data" :key="post.uri" :post="post"></SectionsBlogPostGral>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';

  const { locale } = useI18n()
  const config = useRuntimeConfig();
  const language = locale.value.toUpperCase();

  const defaultCategory = language === 'ES' ? 'Sustentabilidad' : 'sustainability-en';
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
      sourceUrl: node?.featuredImage?.node?.sourceUrl || '/images/imgdemo.jpg',
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