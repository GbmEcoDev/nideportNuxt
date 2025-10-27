<!-- components/ListCategories.vue -->
<script setup>
  const { locale } = useI18n()

defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['category-selected'])
</script>

<template>
  <div class="pl-6">
    <p class="font-bold text-primary mb-4 border-b border-gray-200">{{ $t('categories.title') }}</p>
    <div class="flex flex-wrap gap-2">
      <!-- Botón "Todas" -->
      <button
        :class="[
          'px-3 py-1 rounded-full text-sm transition-colors',
          !selectedCategory ? 'bg-primary-600 text-white' : 'bg-gray-400 text-gray-700 hover:bg-gray-300'
        ]"
        @click="$emit('category-selected', '')"
      >
        {{ $t('categories.all') }}
      </button>

      <!-- Categories -->
      <button v-for="category in categories" :key="category" :class="[
        'px-3 py-1 rounded-full text-sm transition-colors',
        selectedCategory === category ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]" @click="$emit('category-selected', category)">
        {{ category }}
      </button>
    </div>
  </div>
</template>