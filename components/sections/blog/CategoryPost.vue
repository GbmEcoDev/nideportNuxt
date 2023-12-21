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
      <div v-else class="flex">
             
        <SectionsBlogPostsCategory v-for="post in data" :key="post.uri" :post="post"></SectionsBlogPostsCategory>
        <!-- Botón "Ver más" -->
        <div class="flex justify-center pb-3">
          <button v-if="hasMore" @click="loadMore" class="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Ver más
          </button>
        </div>
      </div> 
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue';
import { useI18n } from 'vue-i18n';


const { categorySel } = defineProps(['categorySel']);
const { locale } = useI18n();
const config = useRuntimeConfig();
const language = locale.value.toUpperCase();

const selectedCategory = ref(categorySel);

const posts = ref([]);
const visiblePosts = ref([]);
const perPage = 4;
const increment = 3;
let page = 1;
let hasMore = true;

const { data, error, pending } = await useFetch(config.public.wordpressUrl, {
    lazy: true,
    method: 'post',
    body: {
      query: `
        query posts($language: LanguageCodeFilterEnum!, $category: String!, $perPage: Int!, $page: Int!) {
          posts(where: { language: $language, categoryName: $category }, first: ${perPage}, page: ${page} ) {
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
              pageInfo {
                    hasNextPage
                    endCursor
                  }
              }
            }
          }
        }
      `,
      variables: {
        language: language,
        category: selectedCategory.value,
        perPage: perPage,
        page: page
      }
    },
    transform(data: any) {
      //return data.data.posts.edges.map((edge: any) => edge.node);
      return data?.data?.posts?.edges?.map((edge: any) => transformPost(edge?.node)) || [];
    }
  });
  
  function transformPost(node: any) {
    return {
      id: node?.id || '',
      excerpt: node?.excerpt || '',
      title: node?.title || '',
      date: node?.date || '',
      uri: node?.uri || '',
      slug: node?.slug || '',
      sourceUrl: node?.featuredImage?.node?.sourceUrl || '/images/imgdemo.jpg',
      language: node?.language || '',
      categories: node?.categories?.nodes?.map((category: any) => category?.name).join(', ') || '',
    };
  }
  watch(data, (newData) => {
  // Cuando los datos cambian, actualizamos la lista completa de posts y la lista visible
  posts.value = newData;
  visiblePosts.value = posts.value.slice(0, perPage);
  hasMore = posts.value.length > perPage;
});

function loadMore() {
  // Incrementa la página y agrega más posts a la lista visible
  page++;
  const endIndex = page * perPage;
  visiblePosts.value = posts.value.slice(0, endIndex);
  hasMore = endIndex < posts.value.length;
}
</script>

<style scoped>
  /* Estilos específicos del componente si es necesario */
</style>
