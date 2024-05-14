<template>
    <div class="relative overflow-hidden bg-cover bg-no-repeat h-[24rem]" style="
        background-position: 50%;
        background-image: url('/images/bg-blog.webp');
        background-size: cover;
      ">
    <div
      class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden hero bg-fixed">
        <div class="flex h-full items-center justify-center">
          <AtomsContainer>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <div class="text-left text-white md:px-12 col-span-2">
                  <p class="text-left max-sm:text-center">Conoce nuestras actividades en</p>
                  <AtomsTitleH1 :texte="`${ categorySel }`"></AtomsTitleH1>
                </div>
            </div>
          </AtomsContainer>
        </div>
    </div>
  </div>
</template>
<script setup>
  const { locale } = useI18n();
  const { categorySel } = defineProps(['categorySel'])
</script>

<style scoped>
.hero{
    /*background: linear-gradient(90deg, rgba(0, 0, 0, 0.80) 30%, rgba(0, 0, 0, 0.00) 100%);*/
    background:  rgba(0, 0, 0, 0.40);
}
</style>