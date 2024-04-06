<template>
  <div class="relative w-full">
    <SectionsBlogHeroBlog/>
    <div class="absolute w-full bottom-[-3em] max-sm:bottom-0 h-48 max-sm:h-[640px] max-sm:relative"><!-- <SectionsBlogFeactures/> --></div>
  </div>
  <section class="xl:p-36 lg:p-24 md:p-24 sm:p-3 flex max-sm:flex-col gap-8 mt-11">
        <div class="w-8/12  max-sm:w-full flex-col">
          <p class="font-bold text-primary mb-4 border-b border-gray-200 dark:text-white">{{$t('blog_lasted')}}</p>
          <SectionsBlogListLastetPost class="p-2" />
          </div>
          <div class="w-4/12 max-sm:w-full">
            <SectionsBlogEvent/>
          </div>
     
  </section>
  <ScrollTop />
</template>
<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
useHead({
    title: 'Mantente al Día con las Últimas Novedades sobre Créditos de Carbono',
    meta: [
      {
        name: 'description',
        content: 'Lee nuestras noticias sobre compensación de carbono y cómo estamos generando un triple impacto en el medio ambiente, la sociedad y la economía.' 
      },
    ],
  });
  definePageMeta({
  layout: 'blog'
})
</script>