<template>
    <div class="w-full">
      <p class="font-bold text-primary mb-4 border-b border-gray-200 dark:text-white">Categorías</p>
<!--       <ul>
      <li v-for="category in categories" :key="category.id" @click="selectCategory(category)" class="text-gray-600  dark:text-white border rounded-lg p-2 mb-1 hover:-translate-x-1">
          {{ category.name }} 
        </li>
      </ul> -->
        <NuxtLink
          v-for="category in categories"
          :key="(category as any).id"
          :to="`/categories/${(category as any).name}`"
          class="flex items-center justify-center py-2 px-4 rounded text-primary shadow-md hover:shadow-lg duration-200 text-sm uppercase"
        >
          <span class="font-semibold">{{ (category as any).name }}</span>
        </NuxtLink>


    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  const { locale } = useI18n()
  const config = useRuntimeConfig();
  const language = locale.value.toUpperCase();

  const { data: categoriesData } = await useFetch(config.public.wordpressUrl, {
    lazy: true,
    method: 'post',
    body: {
      query: `
        query categories($language: LanguageCodeFilterEnum!) {
          categories(where: { language: $language }) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      `,
      variables: {
        language: language
      }
    },
    transform(data: any) {
      return data.data.categories.edges.map((edge: any) => edge.node);
    }
  });
  
const categories = ref(categoriesData || []);

/*
  const selectCategory = (category:any) => {
    
    console.log('Categoría seleccionada:', category.name);
       
  };  */
  </script>
  