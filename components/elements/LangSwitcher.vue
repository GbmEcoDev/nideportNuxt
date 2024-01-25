<script setup lang="ts">
import ElementsIconsEngland from '@/components/elements/icons/England.vue';
import  ElementsIconsSpain from '@/components/elements/icons/Spain.vue';
const { locales, locale, setLocale } = useI18n();

const isOpen = ref(false);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const changeLanguage = (locale:any) => {
    
    setLocale(locale);
    isOpen.value = false; // Cerrar el menú después de seleccionar un idioma
};
</script>

<template>
    <div class="relative py-2">
        <button
            class="outline-none bg-transparent p-2.5 rounded-full text-gray-200 hover:text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="toggleDropdown">
            <span v-if="locale === 'es'">
                ES
            </span>
            <span v-if="locale === 'en'">
                EN
            </span>
        </button>
        <div v-if="isOpen" class="fixed inset-0 " @click="isOpen = false"></div>
        <transition
            enter-active-class="ease-out duration-300"
            enter-from-class="transition transform opacity-0 translate-y-6"
            enter-to-class="transition transform opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 translate-y-6">
            <div v-show="isOpen" class=" absolute border border-box-border shadow-md shadow-box-shadow z-40 top-full right-0 transition-all ease-linear p-2 rounded-xl w-14 bg-box-bg">
                <ul class="flex flex-col">
                    <li
                        v-for="item in locales"
                        :key="typeof item === 'object' ? item.code : item"
                        class="flex select-none cursor-pointer items-center gap-3 px-2 py-2 rounded-md transition hover:bg-gray-100 dark:hover-bg-gray-800 text-gray-600 dark:text-gray-200"
                        @click="changeLanguage(typeof item === 'object' ? item.code : item)">
                        <span v-if="item === 'es'">
                            ES
                        </span>
                        <span v-else-if="item === 'en'">
                           EN
                        </span>
                        {{ typeof item === 'object' ? item.name : item }}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>