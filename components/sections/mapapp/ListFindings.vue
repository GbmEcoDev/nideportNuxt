<template>
    <div>
        <p class="font-bold text-primary mb-4 border-b border-gray-200 dark:text-white">Hallazgos</p>
        <div v-for="find in filteredFinds" :key="find.id" class="w-full mt-6 mb-6 flex border border-gray-300 rounded-lg p-3 bg-gradient-to-l from-slate-50 hover:shadow-lg duration-200 dark:from-gray-950">
            <div class="w-12 h-12 mr-3"><NuxtImg :src="`${ find.acf.imagen }`" alt="Cover" class="w-12 h-12 rounded-full border" /></div>
            <div class="w-52">
                <h2 class="font-bold text-secondary text-lg leading-5 dark:text-gray-400">{{ find.post_title }}</h2><!-- -->
            <span class="text-xs text-gray-600 border border-gray-300 rounded-full px-2 dark:text-gray-400">{{ find.acf.fecha }}</span>     
            <span v-if="find.acf.denominacion" class="text-xs text-gray-600 dark:text-gray-400 px-2">Presenta: {{ find.acf.denominacion }}</span>
            <button aria-label="Go map">go map</button><!-- @click="setSelectedEvent(find)" -->
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts" >
    import { ref, computed } from 'vue';
    import axios from 'axios';
    import { useI18n } from 'vue-i18n';
    //import { injectEventData, useEventData } from '@/composables/useEventData';
/* 
    const { emit } = defineEmits<{
    (event: 'item-clicked', payload: { itemId: number, itemGeo: string }): void;
    }>();
    
    const setSelectedEvent = (find:any) => {
    emit.('item-clicked',  { itemId: find.id, itemGeo:find.geodata });

    }; */

    const colorMode = useColorMode();
    const { locale } = useI18n();
    const config = useRuntimeConfig();
    const language = locale.value.toUpperCase();
    

    const { data: findings } = await axios.get(config.public.wpFindings);

    const finds = ref(findings || []);
    const filteredFinds = computed(() => {
    return finds.value.filter((find:any) => {
        return find.acf.language === language;
    });
    }); 
</script>