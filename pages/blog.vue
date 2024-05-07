<template>
  <div class="mb-8 w-full">
    <SectionsBlogHeroBlog/>
    <SectionsBlogFeactures/>
  </div>
  <AtomsContainer>
        <div class="flex flex-col lg:flex-row md:flex-row gap-3">
          <div class="md:w-8/12 lg:w-8/12  w-full">
            <p class="font-bold text-primary mb-4 border-b border-gray-200 ">{{$t('blog_lasted')}}</p>
             <SectionsBlogLastetPost class="p-2" />
           <!-- <SectionsBlogListLastetPost class="p-2" />-->
          </div>
          <div class="md:w-4/12 lg:w-4/12 w-full">
              <SectionsBlogEvent/>
              <!-- <SectionsBlogTags/> -->
          </div>
        </div>
  </AtomsContainer>
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