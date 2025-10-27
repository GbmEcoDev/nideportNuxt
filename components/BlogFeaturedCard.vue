<template>
  <article class="card">
      <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="w-[22rem] md:w-1/3 lg:w-1/3 max-sm:w-full relative rounded-2xl overflow-hidden max-sm:mb-4 h-[12em] lg:h-[18em]">
          <div class="rounded-lg transition-all hover:-translate-y-1 hover:scale-105">
              <NuxtImg  v-if="post.image" :src="post.image" width="1060" class="w-full aspect-square object-cover rounded-2xl h-[12em] lg:h-[18em]" />
              <div class="absolute w-full rounded-lg bottom-0 h-full inset-x-0 bg-gradient-to-t from-gray-900/[.9]  to-gray-900/[.1] grid content-end ">
                  <div class="w-full text-white font-bold text-left p-4">
                      <h2 class="font-bold shadow text-[18px] lg:text-2xl lg:leading-6 line-clamp-3">{{ post.title }}</h2>
                  </div>
                </div>
            </div>
        </NuxtLink>
    </article>
</template>

<script setup>
const localePath = useLocalePath()
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>
