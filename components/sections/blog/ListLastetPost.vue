<template>
  <div class="w-full">
    <div v-if="pending" class="flex items-start justify-center">
      <!-- Loader -->
    </div>
    <div v-else-if="error || !data">
      <h2>Error</h2>
    </div>
    <div v-else class="flex-grid w-full">
      <SectionsBlogPostGral v-for="post in paginatedPosts" :key="post.uri" :post="post" ></SectionsBlogPostGral>
      <div class="flex justify-center mt-4">
        <button @click="previousPage" :disabled="page === 1" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" :class="{ 'opacity-50 cursor-not-allowed': page === 1 }">
          Página anterior
        </button>
        <button @click="nextPage" :disabled="page * 4 >= totalPosts" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :class="{ 'opacity-50 cursor-not-allowed': page * 4 >= totalPosts }">
          Página siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const { locale } = useI18n()
const config = useRuntimeConfig();
const language = locale.value.toUpperCase();

let data = [];
let error = false;
let pending = true;
let page = ref(1);
let totalPosts = 0;

onMounted(async () => {
  try {
    const response = await axios.post(config.public.wordpressUrl, {
      query: `
        query posts($language: LanguageCodeFilterEnum!, $first: Int!, $skip: Int!) {
          posts(where: { language: $language }, first: $first, skip: $skip) {
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
        first: 4, // Mostrar 4 posteos por página
        skip: 0 // Empezar desde el primer post
      }
    });

    data = response.data?.data?.posts?.edges?.map((edge) => transformPost(edge?.node)) || [];
    totalPosts = response.data?.data?.posts?.edges?.length || 0;
    pending = false;
  } catch (e) {
    console.error('Error fetching data:', e);
    error = true;
    pending = false;
  }
});

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

function nextPage() {
  if (page.value * 4 < totalPosts) {
    page.value++;
    fetchData();
  }
}

function previousPage() {
  if (page.value > 1) {
    page.value--;
    fetchData();
  }
}

function fetchData() {
  pending = true;
  axios.post(config.public.wordpressUrl, {
    query: `
      query posts($language: LanguageCodeFilterEnum!, $first: Int!, $skip: Int!) {
        posts(where: { language: $language }, first: $first, skip: $skip) {
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
      first: 4, // Mostrar 4 posteos por página
      skip: (page.value - 1) * 4 // Calcular cuántos posteos omitir
    }
  }).then(response => {
    data = response.data?.data?.posts?.edges?.map((edge) => transformPost(edge?.node)) || [];
    pending = false;
  }).catch(e => {
    console.error('Error fetching data:', e);
    error = true;
    pending = false;
  });
}

const paginatedPosts = computed(() => {
  const start = (page.value - 1) * 4;
  return data.slice(start, start + 4);
});
</script>
