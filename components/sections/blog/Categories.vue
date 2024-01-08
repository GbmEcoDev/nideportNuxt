<!-- <template>
    <div class="w-full">
      <p class="font-bold text-primary mb-4 border-b border-gray-200 dark:text-white">Categorías</p>
        <NuxtLink
          v-for="category in categories"
          :key="(category as any).id"
          :to="`/categories/${(category as any).name}`"
          class="flex items-center justify-start py-2 px-4 rounded text-secondary shadow-md hover:shadow-lg duration-200 text-sm capitalize max-sm:justify-center"
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

  </script>
   -->
   <template>
    <div class="w-full">
      <p class="font-bold text-primary mb-4 border-b border-gray-200 dark:text-white">Categorías</p>
      <NuxtLink
        v-for="category in filteredCategoriesWithPosts"
        :key="category.id"
        :to="language === 'ES' ? `/categories/${category.slug}` : `/en/categories/${category.slug}`"
        class="flex items-center justify-start py-2 px-4 rounded text-secondary shadow-md hover:shadow-lg duration-200 text-sm capitalize max-sm:justify-center"
      >
        <span class="font-semibold">{{ category.name }}</span>
      </NuxtLink>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  //import { useFetch } from '@nuxt/http';
  
  const { locale, setLocale } = useI18n();
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
  
  const categories = ref(categoriesData || []);
  
  // Filtrar las categorías que tienen al menos un post vinculado
  /*const categoriesWithPosts = computed(() => {
    return categories.value.filter(category => category.posts.nodes.length > 0);
  });*/

  const filteredCategoriesWithPosts = computed(() => {
  return categories.value.filter((category: any) => {
    return category.posts.nodes.length > 0 && category.name !== 'Uncategorized';
  });
});
  </script>
  