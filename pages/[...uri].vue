<template>
    <div class="relative bg-cover bg-no-repeat h-[44rem] z-1" 
        style="background-position: top center;"
        :style="{ backgroundImage: `url('${data.featuredImage?.node?.sourceUrl || '/images/imgdemo.jpg'}')` }" 
        :class="{
                'transition opacity-20': scrollY > 0,
                'transition opacity-100 ': scrollY === 0
                }"
        ><!-- style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.60) 10%, rgba(0, 0, 0, 0.00) 100%);" -->
      <div class="absolute top-0 w-full h-full  bg-gradient-to-b from-gray-900" ></div><!-- style="background:linear-gradient(0deg, rgba(255, 255, 255, 1) 65%, rgba(255, 255, 255, 0.00) 100%);" -->
      <div class="absolute bottom-0 w-full h-[24em] " :class="bglinear"></div>
    </div>
   <div class="relative mt-[-18em] z-2" >
    
      <AtomsContainer>
      <div class="my-4 px-40 max-sm:px-2">
        <NuxtLink to="/" class="text-blue-500 hover:underline">Inicio</NuxtLink>
        <span class="mx-2  text-gray-600 dark:text-slate-300">/</span>
        <NuxtLink to="/blog" class="text-blue-500 hover:underline">Noticias</NuxtLink>
        <span class="mx-2  text-gray-600 dark:text-slate-300">/</span>
        <span class=" text-gray-600 dark:text-slate-300">{{ data.title }}</span>
      </div>
        <main class="container mx-auto mt-6 px-40 rounded-lg max-sm:px-2">
          <h1 class="text-6xl font-bold text-gray-600 dark:text-slate-300">{{ data.title }}</h1>
          <div class="flex items-center justify-between text-xs mt-4 pt-3 pb-3 border-t text-gray-600 border-b border-b-gray-200 dark:text-slate-300 border-t-gray-500">
            <div class="w-1/2">
              <span>{{ new Date(data.date).toLocaleDateString() }}</span>
              <span class="mx-2">-</span>
              <span>{{ formatCategories(data.categories) }} </span>
            </div>
            <div class="w-1/2 text-xs flex items-center justify-end text-gray-600 dark:text-slate-300"><span class="mr-3">Compartir en:</span>
            <button @click="shareOnTwitter" class="mr-2"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
            </svg></button>
            <button @click="shareOnFacebook"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
              </svg>
            </button>
            </div>
          </div>
          
          <article class="mt-4 space-y-2 text-gray-600 dark:text-slate-300 border-b border-b-gray-200 mb-3" v-html="data.content"></article>
          <!-- <div v-for="image in postImages" :key="image.src" class="border-2">
           <img :src="image.src" :alt="image.alt" />
          </div> -->
          <UBadge variant="outline" v-if="hashtags" v-for="(tag, index) in hashtags" :key="index" class="m-2">{{tag}}</UBadge>
          <GalleryPicture v-if="images.length > 0" :images="images"/>
          <SectionsBlogRelationPost :categoryRel="formatCategories(data.categories)"/>
        </main>
      </AtomsContainer>
  </div>
    <ScrollTop />
  </template>
  
  <script setup>
  import GalleryPicture from '@/components/GalleryPicture.vue';
  import {ref} from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const uri = route.params.uri.join('/');
  const config = useRuntimeConfig();
  const color = useColorMode();
  const bglinear = color.value === 'light' ? 'bg-gradient-to-t from-white via-white' : 'bg-gradient-to-t from-gray-900 ';

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


// Función para extraer imágenes del contenido del post
const extractImages = (content) => {
  const imageRegex = /<div class="wp-block-image">.*?<img[^>]+src=['"]([^'"]+)['"][^>]*>.*?<\/div>/gs;
  const hashtagRegex = /#[^\s#]+/g;
  const images = [];
  const hashtags = [];
  let match;
  // Extraer imagenes. ojo formato buscado en wp, modificar lo requerido en wp
  while ((match = imageRegex.exec(content)) !== null) {
    const [, src] = match;
    images.push(src);
  }
  // Extraer palabras con #. Atencion en wp tienen que ponerle <pre>
  const hashtagMatches = content.match(hashtagRegex);
  if (hashtagMatches) {
    hashtags.push(...hashtagMatches);
  }
  return {images, hashtags};
};

// Construye el array de objetos con la información de las imágenes
//console.log(data.value.content,"content")
const  { images, hashtags }  = extractImages(data.value.content);
//console.log(hashtags,"hashtags");

</script>
  <style scoped>
  article >>> .wp-block-image, article >>> pre {
    /*float: left;
    margin: 0 20px 20px 0; */
    display:none;
  }
  
  article::after {
    content: '';
    display: table;
    clear: both;
  }
</style>