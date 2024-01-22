<template>
    <div class="mx-16 max-sm:mx-1">
      <div class="mt-5 w-full flex items-center justify-center ">
        <div v-if="pending" class="flex items-start justify-center w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 200 200">
          <circle fill="#0FAEA9" stroke="#0FAEA9" stroke-width="15" r="15" cx="40" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
          </circle>
          <circle fill="#0FAEA9" stroke="#0FAEA9" stroke-width="15" r="15" cx="100" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
          </circle>
          <circle fill="#0FAEA9" stroke="#0FAEA9" stroke-width="15" r="15" cx="160" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
          </circle>
        </svg>
        </div>
        <div v-else-if="error || !data">
          <h2>Error </h2>
        </div>
        <div v-else class="w-full">
          <div class="flex items-start justify-center w-full max-sm:flex-col max-sm:mx-0 max-sm:px-0" data-aos="fade-up">
            <SectionsBlogPost v-for="post in data" :key="post.uri" :post="post"></SectionsBlogPost>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup >
  const { locale } = useI18n()
  const config = useRuntimeConfig();
  const language = locale.value.toUpperCase();
  const defaultCategory = language === 'ES' ? 'Destacadas' : 'highlights-en';
  const selectedCategory = ref(defaultCategory);

  let data, error, pending;
try {
  ({ data, error, pending } = await useFetch(config.public.wordpressUrl, {
  lazy: true,
  method: 'post',
  body: {
    query: `
    query posts($language: LanguageCodeFilterEnum!, $category: String!)  {
        posts(where: { language: $language, categoryName: $category }, first:3) {
          edges {
            node {
              id
              excerpt
              title
              date
              uri
              slug
              featuredImage {
                node {
                  id
                  sourceUrl
                }
              }
              language {
                code
                locale
              }
              categories(first:100) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      language: language,
      category: selectedCategory.value
    }
  },
  transform(data) {
    return data?.data?.posts?.edges?.map((edge) => transformPost(edge?.node)) || [];
  }
}));

} catch (e) {
    console.error('Error fetching data:', e);
    // Handle the error as needed
    error = true;
    pending = false;
    data = null;
  }

function transformPost(node) {
  return {
    id: node?.id || '',
    excerpt: node?.excerpt || '',
    title: node?.title || '',
    date: node?.date || '',
    uri: node?.uri || '',
    slug: node?.slug || '',
    sourceUrl: node?.featuredImage?.node?.sourceUrl || '/images/imgdemo.jpg',
    language: node?.language || '',
    categories: node?.categories?.nodes?.map((category) => category?.name).join(', ') || '',
  };
}
</script>