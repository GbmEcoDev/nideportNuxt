<template>
  <div v-if="post">
    <div class="relative bg-cover bg-no-repeat h-[30rem] md:h-[36rem] lg:h-[36rem] z-1"
      style="background-position: center center;"
      :style="{ backgroundImage: `url('${post.yoast_head_json?.og_image?.[0]?.url}')` }">
      <div class="absolute top-0 w-full h-full bg-slate-900/[.4]"></div>
    </div>
    <div class="relative mt-[2em] z-2 flex justify-center">
      <div class="lg:w-[1024px] lg:mx-24 md:w-[1024px] md:mx-24 w-full mx-3">
        <div class="my-4 px-0 max-sm:px-2 text-left">
          <NuxtLink :to="`${localePrefixPath}/`" class="text-blue-500 hover:underline">{{$t('blog_breadcrumbs_home')}}</NuxtLink>
          <span class="mx-2 text-gray-600 dark:text-slate-300">/</span>
          <NuxtLink :to="`${localePrefixPath}/blog`" class="text-blue-500 hover:underline">{{$t('blog_breadcrumbs_blog')}}</NuxtLink>
          <span class="mx-2 text-gray-600 dark:text-slate-300">/</span>
          <span class="text-gray-600 dark:text-slate-300">{{ post.title?.rendered }}</span>
        </div>
        <main class="container mx-auto mt-6 px-40 rounded-lg max-sm:px-2">
          <AtomsTitleH2b colorTxt="secondary" sizeTxt="text-[24px] md:text-[42px] lg:text-[42px]" alignTxt="left" weightTxt="bold" :texte="post.title?.rendered"></AtomsTitleH2b>
          <div class="flex items-center justify-between text-xs mt-4 pt-3 pb-3 border-t text-gray-600 border-b border-b-gray-200 dark:text-slate-300 border-t-gray-500">
            <div class="w-1/2">
              <span>{{ formatDate(post.date) }}</span>
              <span class="mx-2">-</span>
              <span>{{ categoryNames }}</span>
            </div>
            <div class="w-1/2 text-xs flex items-center justify-end text-gray-600 dark:text-slate-300">
              <span class="mr-3">Compartir en:</span>
              <button aria-label="shared twitter" @click="shareOnTwitter" class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                </svg>
              </button>
              <button aria-label="shared facebook" @click="shareOnFacebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                </svg>
              </button>
            </div>
          </div>
          <article class="mt-4 space-y-2 text-gray-600 dark:text-slate-300 border-b border-b-gray-200 mb-3" v-html="post.content?.rendered"></article>
          <UBadge variant="outline" v-for="tag in post.tags" :key="tag.id" class="m-2">{{ tag.name }}</UBadge>
          <GalleryPost v-if="images.length > 0" :images="images" />
          <SectionsBlogRelationPost :categoryRel="categoryNames" />
        </main>
      </div>
    </div>
    <ScrollTop />
  </div>
  <div v-else><Loading /></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const config = useRuntimeConfig();
const { locale } = useI18n();
const language = locale.value;
const localePrefixPath = language === 'en' ? '/en' : '';

const zone = language === "es" ? "es-ES" : "en-EN";
const slug = route.params.slug;

const post = ref(null);
const images = ref([]);
const categoryNames = ref('');


watch(() => route.params.slug, async (newSlug) => {
  slug.value = newSlug;
  await fetchPostData();
});

onMounted(async () => {
  await fetchPostData();
});


async function fetchPostData() {
  try {
    const response = await axios.get(`config.public.wpPosteos?slug=${route.params.slug}`);
    post.value = response.data[0] || {};
    images.value = extractImages(post.value.content?.rendered || '');
    await fetchCategoryNames(post.value.categories || []);
    updateHead();
  } catch (error) {
    console.error('Error fetching post data:', error);
  }
}

async function fetchCategoryNames(categoryIds) {
  try {
    const response = await axios.get(config.public.wpCategories, {
      params: {
        include: categoryIds.join(',')
      }
    });
    categoryNames.value = response.data.map(category => category.name).join(', ');
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

function shareOnTwitter() {
  const tweetText = encodeURIComponent(`${post.value.title.rendered} - ${window.location.href}`);
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

function extractImages(content) {
  const imageRegex = /<img[^>]+src=['"]([^'"]+)['"][^>]*>/g;
  const images = [];
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  return images;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(zone, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function updateHead() {
  useHead({
    title: post.value.title.rendered,
    meta: [
      {
        name: 'description',
        content: post.value.excerpt.rendered.replace(/(<([^>]+)>)/gi, '')
      },
    ],
  });
}

</script>

<style scoped>
article :deep(.wp-block-image) {
  display: none;
}

article :deep(pre) {
  display: none;
}

article::after {
  content: '';
  display: table;
  clear: both;
}
</style>
