<template>
  <div v-if="!pending && posts && posts.length > 0" class="py-16 bg-gray-50">
    <AtomsContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogFeaturedCard
          v-for="post in posts"
          :key="post._path"
          :post="post"
        />
      </div>
    </AtomsContainer>
  </div>
</template>

<script setup>
const { locale } = useI18n()
// Fetch featured posts by category
const { data: posts, pending } = await useAsyncData(`featured-posts-${locale.value}`, () =>
  queryContent(`/blog/${locale.value}`)
    .where({ category: { $contains: locale.value === 'en' ? 'Featured' : 'Destacadas' } })
    .sort({ date: -1 })
    .limit(3)
    .find()
)
</script>