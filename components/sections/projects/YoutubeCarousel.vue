<template>
  <div v-if="videos.length"><!-- :per-page="1"  -->
    <Carousel :items-to-show="carouselItemsToShow1" :wrap-around="true" :starting-from="1" :snap-align="'center'" :loop="true" :navigation="true" class="mt-14">
      <Slide v-for="(video, index) in videos" :key="index" class="rounded-lg mx-3">
        <iframe
          width="90%"
          height="315"
          :src="`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?rel=0&controls=0&showinfo=0&modestbranding=0`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Slide>
      <template #addons>
        <Pagination />
      </template> 
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

// Configura el ID de tu playlist y tu API Key de YouTube
const PLAYLIST_ID = 'PLAYhApVgF1B2kPmJ-ecvRxt1w0vhGRuAk'
const API_KEY = 'AIzaSyAWw13mXfGcHrFzsZhw28XcpenHuDaCTn0'

const videos = ref([])

const carouselItemsToShow1 = ref(1.1);

// Define breakpoints
const breakpoints = {
  mobile: 767,
};

const updateItemsToShow = () => {
  carouselItemsToShow1.value = window.innerWidth >= breakpoints.mobile ? 2.4 : 1.1;
};



const fetchVideos = async () => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
  )
  const data = await response.json()
  videos.value = data.items
}

onMounted(fetchVideos)

// Update on window resize
onMounted(() => {
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemsToShow);
});
</script>

<style scoped>
.carousel__item {
  display: flex;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}
.carousel__slide {
  scroll-snap-stop: auto;
  flex-shrink: 0;
  margin: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);
}
iframe{
  border-radius:14px;
}
</style>
