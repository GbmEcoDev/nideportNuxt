<template>
    <div class="video-background">
      <div class="video-foreground">
        <iframe
          :src="vimeoSrc"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
          ref="iframe"
          @load="onLoad"
          class="video-iframe"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    videoId: {
      type: String,
      required: true
    }
  });

  const vimeoSrc = ref(`https://player.vimeo.com/video/${props.videoId}?background=1&autoplay=1&loop=1&byline=0&title=0`);
  const iframe = ref(null);
  
  const onLoad = () => {
    // Perform any additional actions when the iframe has loaded
  };
  
  onMounted(() => {
    // Ensure the video is loaded only when the component is mounted
  });
  </script>
  
  <style scoped>
  .video-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
  }
  
  .video-foreground {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* Default 16:9 aspect ratio */
    overflow: hidden;
  }
  
  .video-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  
  @media (max-width: 768px) {
    .video-foreground {
      padding-bottom: 177.78%; /* 9:16 aspect ratio for mobile */
    }
  }
  </style>
  