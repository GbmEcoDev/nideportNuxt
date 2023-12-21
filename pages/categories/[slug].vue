<template>
    <SectionsBlogHeroCategory :categorySel="`${ categoryName }`"/>
    <AtomsContainer>
      <div class="my-4 px-40 max-sm:px-2">
        <NuxtLink to="/Noticias" class="text-blue-500 hover:underline">Noticias</NuxtLink>
        <span class="mx-2  text-gray-600">/</span>
        <span class=" text-gray-600">{{ categoryName }}</span>
      </div>
        <main class="container mx-auto mt-6 px-40 rounded-lg max-sm:px-2">
            <SectionsBlogCategoryPost :categorySel="`${ categoryName }`"/>
        </main>
    </AtomsContainer>   
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const currentRoute = router.currentRoute.value.path
  const routeParts = currentRoute.split('/')
  const categoryName = routeParts[2]
</script>