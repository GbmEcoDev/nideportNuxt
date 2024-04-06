<template>
<div v-if="error || !data">Error</div>
<div v-else>
    <ul>
        <li v-for="item in data">    {{ item.id }} <h2>{{ item.title.rendered }}</h2>
             {{ item.content.rendered }}</li>
    </ul>
</div>

  </template>
  
  <script setup lang="ts">
  import { ref, watch,computed } from 'vue';
  import axios from 'axios';
  import { useI18n } from 'vue-i18n';
  const colorMode = useColorMode();
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const { isMobile } = useDevice();
  const language = locale.value.toLowerCase();

  interface Posteos{
    id: ObjectId;
    title: String;
    content:String;
  }

  const {data, error} = await useFetch<Posteos[]>(config.public.wpPosteos)

</script>
