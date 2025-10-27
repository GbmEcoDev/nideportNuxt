<template>
  <div v-if="!pending && relatedPosts && relatedPosts.length > 0">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-t border-gray-200 pt-8">
      Artículos Relacionados
    </h3>
    <div class="flex-grid w-full">
      <BlogCard
        v-for="post in relatedPosts"
        :key="post._path"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
  currentPostPath: {
    type: String,
    required: true,
  },
});

const { locale } = useI18n();

const { data: relatedPosts, pending } = await useAsyncData(
  `related-${props.currentPostPath}`,
  () => queryContent(`/blog/${locale.value}`)
    .where({ tags: { $in: props.tags }, _path: { $ne: props.currentPostPath } })
    .only(['title', 'description', 'date', 'author', 'category', 'slug', '_path', 'image'])
    .sort({ date: -1 })
    .limit(4)
    .find()
);
</script>