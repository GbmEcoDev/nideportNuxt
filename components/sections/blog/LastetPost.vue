<template>
      <div class="w-full">
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
        <div v-else class="flex-grid w-full">
          <SectionsBlogPostGral v-for="post in data" :key="post.uri" :post="post" ></SectionsBlogPostGral>
        </div>
      </div>
    </template>
    
    <script setup>
    import { ref, onMounted, watch } from 'vue';
  
    const { locale } = useI18n()
    const config = useRuntimeConfig();
    const language = locale.value.toUpperCase();
    let data, error, pending;
  try {
    ({ data, error, pending } = await useFetch(config.public.wordpressUrl, {
      lazy: true,
      method: 'post',
      body: {
        query: `
          query posts($language: LanguageCodeFilterEnum!) {
            posts(where: { language: $language }, first: 8) {
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
          language: language
        }
      },
      transform(data) {
        return data?.data?.posts?.edges?.map((edge) => transformPost(edge?.node)) || [];
      }
    }));
  
  } catch (e) {
      console.error('Error fetching data:', e);
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