<template>
    <div class="relative overflow-hidden bg-cover bg-no-repeat lg:h-[41.5rem] md:h-[28rem] h-[14rem] z-0" style="
        background-position: 50%;
        background-image: url('/images/hero-contact.webp');
        background-size: cover;
      ">
    <div
      class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden hero bg-fixed">
        <div class="flex h-full items-end md:items-center lg:items-center justify-center mb-8 ">
          <AtomsContainer>
            <div class="">
                <div class="text-left text-white md:px-12 ">
                  <div class="flex items-end sm:justify-center xs:justify-center lg:justify-start w-9/12 mt-4 max-sm:w-full " data-aos="fade-up">
                    <p class="text-[2.25rem] max-sm:text-base lg:text-left xs:text-center sm:text-center">{{ $t('contact_subtitle') }}</p>
                  </div>
                </div>
            </div>
          </AtomsContainer>
        </div>
    </div>
  </div>
</template>
<script setup>
const localePath = useLocalePath()
</script>

<style scoped>
.hero {
    /*background: linear-gradient(90deg, rgba(0, 0, 0, 0.80) 30%, rgba(0, 0, 0, 0.00) 100%);*/
    background:  rgba(0, 0, 0, 0.40);
}
</style>