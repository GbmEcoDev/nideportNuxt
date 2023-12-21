<template>
  <SectionsBlogHeroBlog/>
  
  <SectionsBlogFeactures/>
  <section class="p-28 max-sm:p-3 flex gap-8">
    
      <div class="w-2/12">
          <SectionsBlogCategories/>
        </div>
      <div class="w-8/12 flex-col">
        <p class="font-bold text-primary mb-4 border-b border-gray-200 dark:text-white">Categorías</p>
          <div class="w-full max-sm:w-full">
            <SectionsBlogPostBiodiversity />
          </div>
          <div class="w-full max-sm:w-full">
            <SectionsBlogPostCommunity/>
          </div>
          <div class="w-full max-sm:w-full">
            <SectionsBlogPostSecurity/>
          </div>
          <div class="w-full max-sm:w-full">
            <SectionsBlogPostTechnology/>
          </div>
        </div>
     
    
  </section>
  <ScrollTop />
</template>
<script setup lang="ts">
const route = useRoute()
useHead({
  title: 'Nideport - Noticias',
  meta: [
    { name: 'description', content: 'Soluciones naturales...' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/logo-nideport.svg' }
  ],
})
</script>