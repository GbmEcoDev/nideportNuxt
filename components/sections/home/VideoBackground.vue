<template>
  <div class="video-background w-full h-full">
    <video class="video-foreground bg-cover z-0 w-screen" autoplay
      muted
      loop
      playsinline
      preload="none">
      <source :src="videoSrc" type="video/mp4">
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
  videoSrc: {
    type: String,
    required: true
  }
});
</script>
<style scoped>
  .video-background {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: -1;
  }
  
  .video-foreground {
    position: relative;
    width: 100%;
    height: 100%;
    /*padding-bottom: 56.25%;  Default 16:9 aspect ratio */
    overflow: hidden;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    .video-foreground {
      padding-bottom: 0%; /* 9:16 aspect ratio for mobile */
    }
  }
</style>
  