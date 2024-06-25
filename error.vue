<template>
<div class="relative overflow-hidden bg-cover bg-no-repeat h-screen" style="
        background-position: 50%;
        background-image: url('/images/hero-contact.webp');
        background-size: cover;
      ">
    <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-screen overflow-hidden hero bg-fixed ">
        <div class="container flex items-center justify-center px-5 text-gray-300 h-screen ">
                <div class="w-full lg:w-1/2 mx-8">
                    <div v-if="error" class="text-7xl text-green-500  font-extrabold mb-8">{{ error.statusCode}}</div>
                <p class="text-2xl md:text-3xl font-light leading-normal mb-8">
                    Sorry we couldn't find the page you're looking for
                </p>
                <p v-if="error" class="text-2xl md:text-3xl font-light leading-normal mb-8">
                    {{ error.statusMessage}}
                </p>
                <button @click="handleError">Clear errors</button>
            </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
<style scoped>
.hero{
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.80) 40%, rgba(0, 0, 0, 0.2) 100%);
}
</style>