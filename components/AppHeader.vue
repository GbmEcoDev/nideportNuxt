<template>
  <header class="inset-x-0 top-0 py-4 dark:bg-body sticky bg-black-10 " :class="{
                'scrollUp translate-y-[-100px] !visible': scrollY > 0,
                'scrollDown translate-y-0 ': scrollY === 0
                }">
      <AtomsContainer class="relative">
          <nav class="z-100 flex items-center justify-between w-full relative py-0 ">
              <!-- app logo -->
              <div class="inline-flex relative py-0 logo" :class="{
                'scrollUp': scrollY > 0,
                'scrollDown  translate-y-0': scrollY === 0
                }">
                <NuxtLink :to="localePath({ name: 'index' })" class=" flex items-center gap-0 py-0" >
                    <Logo />
                </NuxtLink> 
              </div>
              <div 
                  class="menu absolute top-full px-5 sm:px-4 md:px-12 lg:px-0 z-50 right-1
                  lg:pt-0 lg:top-0 invisible opacity-40 lg:opacity-100 bg-body rounded-xl border border-box-border shadow-lg shadow-box-shadow 
                  lg:border-none lg:shadow-none lg:rounded-none
                  lg:bg-transparent w-full lg:w-max py-1 lg:py-0 lg:visible lg:relative flex 
                  transition-all duration-300 ease-linear origin-top translate-y-6 lg:translate-y-0 max-lg:w-1/3 max-sm:w-1/2 " 
                  :class="{
                      'scrollUp ': scrollY > 0,
                       'scrollDown': scrollY === 0,
                       '!visible !opacity-100 !translate-y-0': navIsOpen
                       }">
                  <ul class="text-white max-sm:text-secondary max-md:text-secondary max-lg:text-secondary dark:text-gray-100 w-full flex lg:items-center gap-y-4 lg:gap-x-8 flex-col lg:flex-row lg:h-20">
                    <li class="border-b-4-hidden lg:h-20 flex items-center"><NuxtLink rel="next" class="lg:inline-flex transition hover:text-primary ease-linear text-lg" :to="localePath({ name: 'index' })">{{ $t('nav_home') }}</NuxtLink></li> 
                    <li class="border-b-4-hidden lg:h-20 flex items-center"><NuxtLink rel="next" class="lg:inline-flex transition hover:text-primary ease-linear text-lg" :to="localePath({ name: 'about' })">{{ $t('nav_about') }}</NuxtLink></li>
                    <li class="border-b-4-hidden lg:h-20 flex items-center"><NuxtLink rel="next" class="lg:inline-flex transition hover:text-primary ease-linear text-lg" :to="localePath({ name: 'projects' })">{{ $t('nav_projects') }}</NuxtLink></li>
                    <li class="border-b-4-hidden lg:h-20 flex items-center"><NuxtLink rel="next" class="lg:inline-flex transition hover:text-primary ease-linear text-lg" :to="localePath({ name: 'blog' })">{{ $t('nav_blog') }}</NuxtLink></li>
                    <li class="border-b-4-hidden lg:h-20 flex items-center"><NuxtLink rel="next" class="lg:inline-flex transition hover:text-primary ease-linear text-lg" :to="localePath({ name: 'contact' })">{{ $t('nav_contact') }}</NuxtLink></li>
                  </ul>
              </div>

              <div class="flex items-center bg-inherit gap-1 lg:gap-3 min-w-max tools z-60" :class="{
                'scrollUp': scrollY > 0,
                'scrollDown': scrollY === 0
                }">
                       <AtomsLinkBtn :href="localePath({ name: 'projects' })" variant="cta" class="max-[640px]:hidden">
                        {{$t('home_hero_btn_join')}}
                      </AtomsLinkBtn> <!---->
                  <ElementsLangSwitcher />
                 <!--  <ElementsThemeSwitcher /> -->
                  <div class="flex lg:hidden border-l border-box-border pl-2">
                      <button @click="toggleNav" class="outline-none w-7 h-auto flex flex-col relative  text-gray-200 hover:text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" alt="toogle menu" aria-label="toogle menu">
                          <span
                              class="w-6 h-0.5 rounded-full bg-gray-200 dark:bg-gray-200 transition-all duration-300 ease-linear"
                              :class="navIsOpen ? 'translate-y-1.5 rotate-[40deg] scale-x-100 ' : ' scale-x-50 origin-left'"></span>
                          <span
                              class="w-6 origin-center  mt-1 h-0.5 rounded-full bg-gray-200 dark:bg-gray-200 transition-all duration-300 ease-linear"
                              :class="navIsOpen ? 'scale-x-0 opacity-0' : ''"></span>
                          <span
                              class="w-6 mt-1 h-0.5 rounded-full bg-gray-200 dark:bg-gray-200 transition-all duration-300 ease-linear"
                              :class="navIsOpen ? '-translate-y-1.5 -rotate-[40deg] scale-x-100 ' : ' scale-x-75 origin-left'"></span>
                      </button>
                  </div>
              </div>
          </nav>
      </AtomsContainer>
  </header>
</template>
<script lang="ts" setup>
import { onMounted, ref,watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const scrollY = ref(0);
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  watch(
    () => router.currentRoute.value,
    () => {
      navIsOpen.value = false;
    }
  );
});

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const navIsOpen = useState('navIsOpen', () => false)
function toggleNav(event: MouseEvent): void {
    event.preventDefault()
    navIsOpen.value = !navIsOpen.value
}
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()

</script>

<style scoped>
/* Agrega el borde inferior y ocúltalo por defecto */
.border-b-4-hidden {
  border-bottom: 4px solid transparent;
  transition: border-color 0.3s ease;
}

/* Establece el color del borde en el hover */
.border-b-4-hidden:hover {
  border-color: #0e9e6e;
}

/* Añade las transiciones según sea necesario */
.transition-transform {
  transition: transform 400ms ease;
}

/* Aplica la animación cuando el menú está fijo */
.sticky {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
}

.logo.scrollUp {
  transform: translateY(-100%) scaleX(3);
  transition: transform 200ms ease-in;
}
.logo.scrollDown {
  transform: translateY(0);
  transition: transform 200ms ease-in;
}
.scrollUp.menu {
  transform: translateY(-200%);
}
.scrollDown.menu {
  transform: translateY(0);
}
.scrollUp.tools {
  transform: translateY(-200%);
  transition: transform 200ms ease-in;
}
.scrollDown.tools {
  transform: translateY(0);
  transition: transform 200ms ease-in;
}
</style>