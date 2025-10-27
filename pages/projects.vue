<template>
  <SectionsProjectsHeroProject/>
  <SectionsProjectsDataMenuReserve class="section_space_esp"/>
  <SectionsProjectsInnerNav :is-sticky="isSticky" :active-link="activeLink" :nav-links="navLinks" @handle-link-click="handleLinkClick" />
  <SectionsProjectsGralGs1 class="pb-150 pt-10" id="pro"/>
  <SectionsHomeMapReserve class="mt-16"/>
  <SectionsProjectsCreditCarbon id="cer" />
  <SectionsProjectsOds class="" id="ods"/>
  <SectionsProjectsThematicAxesBio id="bio" @open-modal="openModal" />
  <SectionsProjectsThematicAxesCom id="com" @open-modal="openModal" />
  <SectionsProjectsThematicAxesTec id="tec" @open-modal="openModal" />
  <SectionsProjectsCta />
  <ScrollTop />

  <!-- Modal centralizado -->
  <div v-if="isModalOpen" @click="closeModal" class="fixed top-0 bottom-0 left-0 right-0 inset-0 z-[5070] bg-black bg-opacity-80 flex items-center justify-center">
    <div class="p-4 h-full overflow-hidden relative flex items-center justify-center">
      <div class="relative max-h-full">
        <button @click="closeModal" class="absolute top-0 right-0 z-1060 text-gray-500 hover:text-gray-700 bg-white rounded-full p-3" aria-label="cerrar modal"><IconsCloseIco /></button>
        <NuxtImg format="webp" :src="`${urlImg}${selectedImage}`" alt="Selected Image" class="max-sm:h-auto max-sm:w-auto h-screen w-auto z-60" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const route = useRoute();

useHead({
    title: 'Explora Nuestros Proyectos de Créditos de Carbono en Acción',
    meta: [
      {
        name: 'description',
        content: 'Descubre cómo contribuimos al mercado de carbono y combatimos el cambio climático a través de la tecnología de captura de carbono y soluciones basadas en la naturaleza.' 
      },
    ], /*  */
   script: [
    {
      src: 'https://tally.so/widgets/embed.js', 
      crossorigin: '',
    },
  ],
  });

const navLinks = [
  { href: '#pro', textKey: 'project_mn_btn_01' },
  { href: '#cer', textKey: 'project_mn_btn_02' },
  { href: '#bio', textKey: 'project_mn_btn_03' },
  { href: '#com', textKey: 'project_mn_btn_04' },
  { href: '#tec', textKey: 'project_mn_btn_05' },
];

const activeLink = ref(navLinks[0].href);
const isSticky = ref(false);
const isProgrammaticScroll = ref(false); // Nueva bandera
let observer: IntersectionObserver;
let navWrapper: HTMLElement | null = null;
let navWrapperOffsetTop = 0;

// --- Lógica del Modal Centralizada ---
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const selectedImage = ref('');
const isModalOpen = ref(false);

const openModal = (image: string) => {
  selectedImage.value = image;
  isModalOpen.value = true;
};
const closeModal = () => isModalOpen.value = false;
// --- Fin Lógica del Modal ---

const handleLinkClick = (href: string) => {
  activeLink.value = href;
  const element = document.querySelector(href);
  if (element) {
    const offset = 150; // Espacio para la barra de navegación pegajosa
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    
    isProgrammaticScroll.value = true; // Activar la bandera antes del scroll

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Desactivar la bandera después de un tiempo, asumiendo que el scroll ha terminado
    // El tiempo puede necesitar ajuste dependiendo de la velocidad de scroll
    setTimeout(() => {
      isProgrammaticScroll.value = false;
    }, 800); // 800ms es un valor razonable para un scroll suave
  }
};

const handleScroll = () => {
  if (navWrapperOffsetTop > 0 && window.scrollY > navWrapperOffsetTop) {
    isSticky.value = true;
  } else {
    isSticky.value = false;
  }
};

onMounted(() => {
  navWrapper = document.getElementById('nav-inner-section-wrapper');
  if (navWrapper) {
    navWrapperOffsetTop = navWrapper.offsetTop;
  }

  window.addEventListener('scroll', handleScroll);

  const options = {
    rootMargin: '-150px 0px 0px 0px',
    threshold: 0
  };

  observer = new IntersectionObserver((entries) => {
    console.log('--- Callback del Observer ---');
    if (isProgrammaticScroll.value) return;

    // Filtra las secciones que están actualmente en la vista
    const visibleSections = entries.filter(entry => entry.isIntersecting);
    
    // Log para ver qué secciones están intersectando
    console.log('Secciones visibles detectadas:', visibleSections.map(e => e.target.id));

    if (visibleSections.length > 0) {
      // De las secciones visibles, elige la última (la que está más abajo en la página pero visible en la parte superior del viewport)
      const currentSection = visibleSections[visibleSections.length - 1];
      
      // Log para ver el ID de la sección que se va a activar
      console.log('ID de la sección a activar:', currentSection.target.id);
      
      activeLink.value = `#${currentSection.target.id}`;
      
      // Log para confirmar el nuevo valor de activeLink
      console.log('activeLink actualizado a:', activeLink.value);
    }
  }, { rootMargin: '-150px 0px -50% 0px' }); // Ajustamos el rootMargin para detectar mejor la sección "actual"

  navLinks.forEach(link => {
    const section = document.querySelector(link.href);
    if (section) {
      observer.observe(section);
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  if (observer) {
    observer.disconnect();
  }
});
</script>
<style>
  .section_space{
    margin-top:6rem;
  }
  .section_space_esp{
    margin-top:2rem;
  }
</style>