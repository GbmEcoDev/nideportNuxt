<template>
    <div class="absolute inset-0 z-0 overflow-hidden">
      <video
        autoplay
        muted
        loop
        playsinline
        :src="videoSrc"
        class="w-full h-full object-cover"
      ></video>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    videoPath: {
      type: String,
      required: true
    }
  });
  
  const videoSrc = ref(`https://storage.googleapis.com/your-bucket-name/${props.videoPath}`);
  </script>
  
  <style scoped>
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  