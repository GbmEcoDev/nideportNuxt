<template>
    <div
        id="nav-inner-section-wrapper"
        :class="{'sticky-wrapper-active': isSticky}"
    >
        <AtomsContainer
        :class="{'is-sticky': isSticky, 'mb-2': isSticky}">
        <div class="flex items-center justify-start lg:items-center lg:justify-center gap-4 pb-2 w-full mb-2 overflow-x-auto whitespace-nowrap no-scrollbar z-50 bg-white rounded-md px-4">
            <AtomsLinkBtnProject 
                v-for="link in navLinks"
                :key="link.href"
                :href="link.href" 
                variant="custom" 
                customTextColor="text-primary"
                :customSpanClass="activeLink === link.href ? 'border-2 border-primary' : 'border-2 border-transparent'"
                @click.prevent="emit('handleLinkClick', link.href)"
            >{{ $t(link.textKey) }}</AtomsLinkBtnProject>
        </div>
        </AtomsContainer>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
      isSticky: boolean;
      activeLink: string;
      navLinks: Array<{ href: string; textKey: string }>;
    }>();

    const emit = defineEmits(['handleLinkClick']);
</script>

<style scoped>
.is-sticky {
    position: fixed;
    top: 15px;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    animation: slideDown 0.3s ease-out;
}
.sticky-wrapper-active { height: 120px; }
@keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>