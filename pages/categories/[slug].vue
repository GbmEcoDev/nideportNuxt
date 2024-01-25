<template>
    <SectionsBlogHeroCategory :categorySel="`${ categoryName }`"/>
    <div class="px-28 max-sm:px-3 flex max-sm:flex-col gap-8 mt-6">
      <div class="w-3/12 max-sm:w-full">
          <SectionsBlogCategories/>
          <hr>
          <SectionsBlogEvent/>
        </div>
      <div class="w-8/12  max-sm:w-full flex-col">
        <div class="my-4 px-6 max-sm:px-2">
          <NuxtLink to="/blog" class="text-blue-500 hover:underline">Noticias</NuxtLink>
          <span class="mx-2  text-gray-600">/</span>
          <span class=" text-gray-600 dark:text-white">{{ categoryName }}</span>
        </div>
          <div class="w-full max-sm:w-full">
            <main class="container mx-auto mt-6 px-6 rounded-lg max-sm:px-2">
            <SectionsBlogCategoryPost :categorySel="`${ categoryName }`"/>
        </main>
          </div>
        </div>
  </div>
  <ScrollTop />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

  const { locale } = useI18n();
  const language = locale.value.toUpperCase();
  const router = useRouter()
  const currentRoute = router.currentRoute.value.path
  const routeParts = currentRoute.split('/')
  const categoryName = language === "ES" ? routeParts[2] : routeParts[3]

  useHead({
    title: categoryName,
    meta: [
      {
        name: 'description',
        content: 'Enterate de las últimas novedades en materia de ' + categoryName,  
      },
    ],
  });
</script>