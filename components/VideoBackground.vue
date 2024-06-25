<template>
    <div class="relative overflow-hidden bg-cover bg-no-repeat h-[43rem] z-0">
      <div class="absolute top-0 left-0 w-full h-full ">
        <iframe
          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/vSZC_hVBzr0?autoplay=1&mute=1&loop=1&playlist=vSZC_hVBzr0&controls=0&showinfo=0&modestbranding=1&rel=0"
          frameborder="0"
          allow="fullscreen"
          allowfullscreen
        ></iframe>
      </div>
      <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden hero bg-fixed">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <style scoped>
  .iframe-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  