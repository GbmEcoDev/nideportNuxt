<template>
    <div class="relative overflow-hidden bg-cover bg-no-repeat lg:h-[41.5rem] md:h-[28rem] h-[12rem] z-0"style="
        background-position: 50%;
        background-image: url('/images/hero-project.webp');
        background-size: cover;
      ">
    <template v-if="showVideo">
      <SectionsHomeVideoBackground
        videoSrc='/video/Proyecto.mp4'
      />
    </template>
     <!--  <video
        autoplay
        loop
        muted
        preload="none"
        class="absolute z-0 lg:w-full lg:h-auto xs:w-auto sm:w-auto "
        poster="https://storage.googleapis.com/cdn-web-nideport/hero-project.webp"
        >
        <source
          src="https://storage.googleapis.com/cdn-web-nideport/proyecto.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video> -->
      <div
      class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden hero bg-fixed ">
        <div class="flex h-full items-center justify-center ">
          <AtomsContainer>
            <div class="grid grid-cols-1 gap-4 ">
                <div class="text-left text-white md:px-12 col-span-2 ">
                  <AtomsTitleH1 :texte="$t('project_title')"></AtomsTitleH1>
                </div>
            </div>
          </AtomsContainer>
        </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const { locale } = useI18n()
const localePath = useLocalePath()

const showVideo = ref(false);

onMounted(() => {
  setTimeout(() => {
    showVideo.value = true;
  }, 500);
});
</script>
<style scoped>
.hero{
    /*background: linear-gradient(90deg, rgba(0, 0, 0, 0.80) 30%, rgba(0, 0, 0, 0.00) 100%);*/
    background:  rgba(0, 0, 0, 0.40);
}
</style>