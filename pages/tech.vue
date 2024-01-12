<template>
    <div class="relative w-screen h-screen z-0">
        
      <div class="absolute z-0 w-screen h-screen"><MapTech/></div>
      <div class="absolute top-0 left-8 h-18 w-48">
        <NuxtLink :to="localePath({ name: 'index' })" class=" relative z-1000" ><Logo color="dark"/></NuxtLink>
      </div>
      <div class="absolute z-55 bottom-4 left-4">
        <UButton label="Open" @click="isOpen = true" />

        <USlideover v-model="isOpen" :transition="false">
            <div class="p-4 flex-1">
            <listEvento />
            <UVerticalNavigation :links="links" />
            </div>
        </USlideover>
        </div>
   </div>
  </template>
  <script setup lang="ts">
 
  const route = useRoute();
  const { t, locale, setLocale } = useI18n()
  const localePath = useLocalePath()
  const isOpen = ref(false);
  useHead({
    title: 'Nideport - Tech',
    meta: [
      { name: 'description', content: 'Tecnologias...' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo-nideport.svg' }
    ],
  })
  
  definePageMeta({
    layout: 'application'
  })

  const links = [{
  label: 'Profile',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  badge: 100
}, {
  label: 'Installation',
  icon: 'i-heroicons-home',
  to: '/getting-started/installation'
}, {
  label: 'Vertical Navigation',
  icon: 'i-heroicons-chart-bar',
  to: '/navigation/vertical-navigation'
}, {
  label: 'Command Palette',
  icon: 'i-heroicons-command-line',
  to: '/navigation/command-palette'
}]
  </script>