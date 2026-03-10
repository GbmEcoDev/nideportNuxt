<template>
  <div class="iframe-container">
    <iframe
      :src="`/api/notion-proxy`"
      title="Gantt Dashboard"
      allow="fullscreen"
      loading="lazy"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.iframe-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
