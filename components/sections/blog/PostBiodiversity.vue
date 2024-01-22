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
         <svg  width="32" height="32" id="Layer_3" class="icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M136,87.5V56a8,8,0,0,0-16,0V87.5a98.7,98.7,0,0,1,8,12.7A98.7,98.7,0,0,1,136,87.5Z"/><path d="M231.4,50.4C227.7,45.6,220.7,40,208,40c-16.7,0-38.1,11.3-57.2,30.3A144.2,144.2,0,0,0,136,87.5V172a8,8,0,0,1-16,0V87.5a144.2,144.2,0,0,0-14.8-17.2C86.1,51.3,64.7,40,48,40c-12.7,0-19.7,5.6-23.4,10.4-6.8,8.7-12.2,24.1-.4,71.5,6.6,26.3,22,34.9,33.5,37.5a40,40,0,1,0,70.3,38,40,40,0,1,0,70.3-38c11.5-2.6,26.9-11.2,33.5-37.5S243.6,66,231.4,50.4Z"/></svg>
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

  const defaultCategory = language === 'ES' ? 'Biodiversidad' : 'Biodiversity-en';
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