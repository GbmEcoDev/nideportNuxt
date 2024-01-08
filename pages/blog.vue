<template>
  <div class="relative w-full">
    <SectionsBlogHeroBlog/>
    <div class="absolute w-full bottom-[-3em] max-sm:bottom-0 h-48 max-sm:h-[640px] max-sm:relative"><SectionsBlogFeactures/></div>
  </div>
  <section class="p-28 max-lg:p-12 max-lg:pt-28 max-sm:p-3 flex max-sm:flex-col gap-8">
      <div class="w-3/12 max-sm:w-full">
          <SectionsBlogCategories/>
          <SectionsBlogEvent/>
        </div>
      <div class="w-8/12  max-sm:w-full flex-col">
       
        <p class="font-bold text-primary mb-4 border-b border-gray-200 dark:text-white">Últimas Noticias</p>
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