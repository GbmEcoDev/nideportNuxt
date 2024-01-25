<script lang="ts" setup>
    const { texte, colorBg = "", href } = defineProps<{
        texte: string,
        colorBg?: string;
        href: string
    }>();
        let colClass = "";
    if (colorBg !== "") {
        colClass = `text-[${colorBg}]`;
    }
</script>
<template>
    <li class="lg:inline-flex">
        <NuxtLink class="lg:inline-flex transition hover:text-primary ease-linear text-lg" rel="next" :to="href" :class="`${colClass}`">
            {{ texte }}
        </NuxtLink>
    </li>
</template>