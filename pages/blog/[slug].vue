<template>
  <div class="py-32">
    <div class="container-custom mx-4">
      <div v-if="pending" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p class="mt-2 text-gray-500">loading</p>
      </div>

      <article v-else-if="post" class="max-w-4xl mx-auto">
        <!-- Back to blog link 
        <div class="mb-8">
          <NuxtLinkLocale to="/blog" class="inline-flex items-center text-primary-600 hover:text-primary-800">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            backTo
          </NuxtLinkLocale>
        </div>-->
        <!-- Post header -->
        <header class="mb-12">
          <div class="flex items-center mb-4">
            <time :datetime="post.date" class="text-sm text-gray-500">
              {{ formatDate(post.date) }}
            </time>
            <div v-if="post.category" class="ml-auto">
              <span class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {{ Array.isArray(post.category) ? post.category.join(' - ') : post.category }}
              </span>
            </div>
          </div>
          
          <h1 class="text-3xl md:text-4xl font-bold text-secondary mb-6">
            {{ post.title }}
          </h1>
           <!-- Imagen principal del post -->
        <img
          v-if="post.image"
          :src="post.image"
          :alt="`Imagen de portada para ${post.title}`"
          class="w-full h-auto object-cover rounded-lg mb-8 max-h-96"
        />
        <!-- <p v-if="post.description" class="text-xl text-gray-600 leading-relaxed">
            {{ post.description }}
          </p>
          
          <div v-if="post.author" class="flex items-center mt-8 pt-8 border-t border-gray-200">
            <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <p class="font-medium text-gray-900">{{ post.author }}</p>
              <p class="text-sm text-gray-500">published {{ formatDate(post.date) }}</p>
            </div>
          </div> -->
        </header>

        <!-- Post content -->
        <div class="prose max-w-none mx-1">
          <ContentRenderer :value="post" />
        </div>

        <!-- Related Posts -->
        <div v-if="post.tags && post.tags.length > 0">
          <RelatedPosts :tags="post.tags" :current-post-path="post._path" />
        </div>

        <!-- Post footer -->
        <footer class="mt-16 pt-8 border-t border-gray-200">
          <div class="flex flex-col sm:flex-row justify-between items-center">
            <div class="mb-4 sm:mb-0">
              <NuxtLinkLocale to="/blog" class="btn-secondary">
                ← Volver al blog
              </NuxtLinkLocale>
            </div>
            
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-500">Compartir:</span>
              <button @click="shareOnX" class="text-gray-400 hover:text-primary-600" aria-label="Compartir en X">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.184L18.901 1.153zm-1.61 19.931h2.5l-10.8-14.656H6.858l10.432 14.656z"/>
                </svg>
              </button>
              <button @click="shareOnLinkedIn" class="text-gray-400 hover:text-primary-600" aria-label="Compartir en LinkedIn">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </article>

      <div v-else class="text-center py-12">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Post no encontrado</h1>
        <p class="text-gray-600 mb-8">El post que buscas no existe o ha sido removido.</p>
        <NuxtLinkLocale to="/blog" class="btn-primary">
          Volver al blog
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const siteUrlBase = config.public.url_base

// Fetch the specific post
const { data: post, pending } = await useAsyncData(
  `post-${route.params.slug}`,
  () => queryContent(`/blog/${locale.value}`).where({ slug: route.params.slug }).findOne()
    .catch(() => null)
)
const fullUrl = siteUrlBase + route.fullPath

// SEO: Esperamos a que 'post' tenga datos para definir las metaetiquetas.
// Esto evita "race conditions" durante el renderizado en servidor (SSR).
watch(post, (newPost) => {
  if (!newPost) return

  useSeoMeta({
    title: `${newPost.title} | Nideport`,
    description: newPost.description || 'Descripción no disponible.',
    ogTitle: newPost.title,
    ogDescription: newPost.description || 'Descripción no disponible.',    
    ogUrl: fullUrl,
    ogType: 'article',
    ogImage: newPost.image ? `${siteUrlBase}${newPost.image}` : `${siteUrlBase}/ogNideport.webp`,
    twitterCard: 'summary_large_image',
    twitterTitle: newPost.title,
    twitterDescription: newPost.description || 'Descripción no disponible.',
    twitterImage: newPost.image ? `${siteUrlBase}${newPost.image}` : `${siteUrlBase}/ogNideport.webp`,
  })
}, { immediate: true })

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(locale.value === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareOnX = () => {
  if (post.value) {
    const postUrl = window.location.href;
    const postTitle = post.value.title;
    const tweetText = encodeURIComponent(postTitle);
    const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${tweetText}`;
    // Abrir en una ventana emergente para una mejor experiencia de usuario
    window.open(tweetUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
  }
}

const shareOnLinkedIn = () => {
  if (post.value) {
    const postUrl = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  }
}

// Handle 404
if (!pending.value && !post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post no encontrado' })
}

definePageMeta({
  layout: 'blog'
})
</script>
<style scoped>
.prose :where(a):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
    color: rgb(0 122 119 / 1)!important;
    text-decoration: none!important;
    font-weight: 500;
}
</style>