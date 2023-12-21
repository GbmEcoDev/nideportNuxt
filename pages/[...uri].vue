<template>
    <div class="relative bg-cover bg-no-repeat h-[44rem] z-1" 
        style="background-position: top center;"
        :style="{ backgroundImage: `url('${data.featuredImage?.node?.sourceUrl || '/images/imgdemo.jpg'}')` }" 
        :class="{
                'transition opacity-20': scrollY > 0,
                'transition opacity-100 ': scrollY === 0
                }"
        >
      <div class="absolute top-0 w-full h-full" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.80) 20%, rgba(0, 0, 0, 0.00) 100%);"></div><div class="absolute bottom-0 w-full h-[24em]" style="background: linear-gradient(0deg, rgba(255, 2555, 255, 1) 50%, rgba(255, 255, 255, 0.00) 100%);"></div>
    </div>
   <div class="relative mt-[-18em] z-2" >
    
      <AtomsContainer>
      <div class="my-4 px-40 max-sm:px-2">
        <NuxtLink to="/" class="text-blue-500 hover:underline">Inicio</NuxtLink>
        <span class="mx-2  text-gray-600">/</span>
        <NuxtLink to="/Noticias" class="text-blue-500 hover:underline">Noticias</NuxtLink>
        <span class="mx-2  text-gray-600">/</span>
        <span class=" text-gray-600">{{ data.title }}</span>
      </div>
        <main class="container mx-auto mt-6 px-40 rounded-lg max-sm:px-2">
          <h1 class="text-6xl font-bold text-gray-600">{{ data.title }}</h1>
          <div class="flex items-center text-xs mt-4 border-b text-gray-600 border-gray-200">
            <span>{{ new Date(data.date).toLocaleDateString() }}</span>
            <span class="mx-2">-</span>
            <span>{{ formatCategories(data.categories) }}</span>
          </div>
          <article class="mt-4 space-y-2 text-gray-600" v-html="data.content"></article>
            <div class="mt-4 text-xs border-t border-gray-200 pt-3 text-right">Compartir en:
            <button @click="shareOnTwitter" class="mr-2"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
            </svg></button>
            <button @click="shareOnFacebook"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
              </svg>
            </button>
            </div>
        </main>
      </AtomsContainer>
    
  </div>
    <ScrollTop />
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const uri = route.params.uri.join('/');
  const config = useRuntimeConfig();
  const { data, pending, error } = await useFetch(config.public.wordpressUrl, {
    method: 'get',
    query: {
      query: `
        query MyQuery3($uri: String!) {
          nodeByUri(uri: $uri) {
            ... on Post {
              id
              title
              date
              content
              categories {
                nodes {
                  name
                }
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      `,
      variables: {
        uri: uri,
      },
    },
    transform(data) {
      return data.data.nodeByUri;
    },
  });
  
  function formatCategories(categories) {
    if (categories && categories.nodes && categories.nodes.length > 0) {
        return categories.nodes.map(category => category.name).join(', ');
    }
    return '';
    }

  useHead({
    title: data.value.title,
  });

  function shareOnTwitter() {
    const tweetText = encodeURIComponent(`${data.title} - ${window.location.href}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    openShareWindow(tweetUrl);
    }

    function shareOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    openShareWindow(facebookUrl);
    }

    function openShareWindow(url) {
    window.open(url, '_blank', 'width=600,height=400');
    }


const scrollY = ref(0);
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  scrollY.value = window.scrollY;
};
  </script>
  <style scoped>
  .wp-block-image {
    float: left;
    margin: 0 20px 20px 0; 
  }
  
  article::after {
    content: '';
    display: table;
    clear: both;
  }
</style>