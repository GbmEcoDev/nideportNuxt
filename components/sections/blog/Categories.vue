<template>
    <div class="w-full">
      <p class="font-bold text-primary mb-4 border-b border-gray-200 dark:text-white">Categorías</p>
      <NuxtLink
        v-for="category in filteredCategoriesWithPosts"
        :key="category.id"
        :to="`${pathcategory}${category.slug}`"
        class="flex items-center justify-start py-2 px-4 rounded text-secondary shadow-md hover:shadow-lg duration-200 text-sm capitalize max-sm:justify-center">
        <span class="font-semibold">{{ category.name }}</span>
      </NuxtLink>
    </div>
  </template>

<script setup lang="ts">
  import { ref, computed, onErrorCaptured } from 'vue';
  import { useI18n } from 'vue-i18n';
  //import { useFetch } from '@nuxt/http';

  const { t, locale, setLocale } = useI18n();
  const localePath = useLocalePath();
  const config = useRuntimeConfig();
  const language = locale.value.toUpperCase();

  const pathcategory = locale.value === 'en' ? `/${locale.value}/categories/` : '/categories/';

  // Wrap your asynchronous logic in a try-catch block
  let categoriesData;
  try {
    //console.log("try");
    const response = await useFetch(config.public.wordpressUrl, {
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
                  posts {
                    nodes {
                      id
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          language: language,
        },
      },
      transform(data: any) {
        return data.data.categories.edges.map((edge: any) => edge.node);
      },
    });

    categoriesData = response.data;
  } catch (error) {
    //console.error('Error fetching categories:', error);
    // Handle the error as needed, e.g., show a user-friendly message
  }

  // Initialize categories based on the result or an empty array if there was an error
  const categories = ref(categoriesData || []);

  // Define a computed property within the try-catch block to handle potential errors
  const filteredCategoriesWithPosts = computed(() => {
    try {
      return (categories.value || []).filter((category: any) => {
        return category.posts?.nodes?.length > 0 && category.name !== 'Uncategorized';
      });
    } catch (error) {
      console.error('Error filtering categories:', error);
      // Handle the error as needed, e.g., show a user-friendly message
      return [];
    }
  });

  // Use onErrorCaptured to catch errors in the component lifecycle
  onErrorCaptured((error) => {
    console.error('Error captured in component:', error);
    // Handle the error as needed
    return false; // Prevent the error from propagating further
  });
</script>