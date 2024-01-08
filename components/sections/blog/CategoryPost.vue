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
        
          <div class="text-sm text-gray-700 dark:text-white">Se encontraron {{ dataSizeRef }} post relacionados</div>
          <div class="flex flex-wrap grid-row-2 w-full">
            <SectionsBlogPostsCategory 
            v-for="(post, index) in data" 
            :key="post.uri" 
            :post="post" 
            :isFirstPost="index === 0" ></SectionsBlogPostsCategory>
          </div>
          <!--<div>  <ElementsPagination @change="refetch" :totalPages="dataSizeRef/3" :currentPage="page" /> </div>-->
          
      </div> 
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { categorySel } = defineProps(['categorySel']);
const { locale } = useI18n();
const config = useRuntimeConfig();
const language = locale.value.toUpperCase();

const selectedCategory = ref(categorySel);
const postsCount = ref(100);
//const page = ref(1);
console.log(language,"idioma");
console.log(selectedCategory.value, "cat");
const { data, error, pending } = await useFetch(config.public.wordpressUrl, {
    lazy: true,
    method: 'post',
    body: {
      query: `
        query posts($language: LanguageCodeFilterEnum!, $category: String!, $count: Int!) {
          posts(where: { language: $language, categoryName: $category }, first: $count ) {
            pageInfo {
              hasNextPage
              startCursor
              endCursor
              }
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
        category: selectedCategory.value,
        count: postsCount.value
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
  
  //const dataSize = ref(data.value.length);
  const dataSizeRef = computed(() => data.value.length);
/* function refetch(pageNumber:any){
  dataSize.value = dataSizeRef.value;
  page.value = pageNumber;
  refresh();
} */
</script>
<style scoped>
.post {
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}
.is-first-post {
  font-size: 2.2em; /* Tamaño de fuente más grande */
  /* Otros estilos que desees aplicar al primer post */
}
</style>