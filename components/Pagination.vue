<template>
  <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <!-- Prev button -->
          <NuxtLink
            v-if="currentPage > 1"
            :to="getPageLink(currentPage - 1)"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">{{ $t('pagination.previous') }}</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 00-1.06.02l-4.5 4.25a.75.75 0 000 1.08l4.5 4.25a.75.75 0 001.04-1.08L8.832 10l3.938-3.71a.75.75 0 00.02-1.06z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>

          <!-- Page numbers -->
          <template v-for="page in pages" :key="page">
            <NuxtLink
              v-if="page !== '...'"
              :to="getPageLink(page)"
              :class="[
                'pagination-item',
                page === currentPage ? 'active text-gray-900 ring-1 ring-inset  px-4 py-2 ring-gray-300 bg-gray-300' : ' text-gray-900 ring-1 ring-inset px-4 py-2 ring-gray-300 bg-gray-100'
              ]"
            >
              {{ page }}
            </NuxtLink>
            <span
              v-else
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            >
              ...
            </span>
          </template>

          <!-- Next button -->
          <NuxtLink
            v-if="currentPage < totalPages"
            :to="getPageLink(currentPage + 1)"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">{{ $t('pagination.next') }}</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})

const localePath = useLocalePath()

// Genera los números de página (puedes mejorar esto para mostrar ... si hay muchas páginas)
const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= props.totalPages; i++) arr.push(i)
  return arr
})

// Genera el enlace para cada página usando el helper de i18n para respetar la estrategia de rutas
function getPageLink(page) {
  // Si es la primera página, el enlace es a la ruta raíz del blog
  if (page === 1) {
    return localePath('/blog')
  }
  return localePath(`/blog/page/${page}`)
}
</script>