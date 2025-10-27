<!-- components/ListTags.vue -->
<script setup>
  const { locale } = useI18n()

defineProps({
  tags: {
    type: Array,
    required: true
  },
  selectedTag: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['tag-selected'])
</script>

<template>
  <div class="pl-6">
    <p class="font-bold text-primary mb-4 border-b border-gray-200">{{ $t('tags.title') }}</p>
    <div class="flex flex-wrap gap-2">
      <!-- Botón "Todos" -->
      <button
        :class="[
          'px-3 py-1 rounded-full text-sm transition-colors',
          !selectedTag
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
        ]"
        @click="$emit('tag-selected', '')"
      >
        {{ $t('tags.all') }}
      </button>

      <!-- Tags -->
      <button
        v-for="tag in tags"
        :key="tag"
        :class="[
          'px-3 py-1 rounded-full text-sm transition-colors',
          selectedTag === tag
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
        @click="$emit('tag-selected', tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>