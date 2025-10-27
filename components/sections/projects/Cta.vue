<template>
  <section class="relative bg-white scroll-snap-align-start flex items-center justify-center z-0">
    <AtomsContainer>
      <div class="flex items-center justify-center w-full">
        <AtomsLinkBtn
          :href="localePath({ name: 'contact' })"
          variant="cta"
          widthBtn="w-[320px]"
        >
          {{ $t('projects_credit_btn_cta') }}
        </AtomsLinkBtn>
      </div>
    </AtomsContainer>
  </section>
</template>

<script setup lang="ts">

const { t, locale } = useI18n();
const localePath = useLocalePath()
</script>

<style scoped>
/* Puedes dejarlo vacío o ajustar si necesitas algo específico */
</style>