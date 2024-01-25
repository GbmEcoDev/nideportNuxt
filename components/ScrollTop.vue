<template>
    <div>
        <button v-if="showButton" @click="scrollToTop" class="scroll-to-top-btn">
            <svg height="20" viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                <path d="M24 16l-12 12 2.83 2.83 9.17-9.17 9.17 9.17 2.83-2.83z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
        </button>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        showButton: false,
      }
    },
    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      },
      handleScroll() {
        if (window.pageYOffset > 100) {
          this.showButton = true;
        } else {
          this.showButton = false;
        }
      },
    },
    beforeMount() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  }
  </script>
  
  <style>
  .scroll-to-top-btn {
    position: fixed;
    bottom: 28px;
    right: 6px;
    padding: 10px;
    border-radius: 50%;
    background-color: rgb(0, 122, 119);
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  </style>