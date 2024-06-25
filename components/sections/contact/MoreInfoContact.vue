<template>
    <section class="p-20 xs:px-0 scroll-snap-align-start max-sm:p-2 max-sm:mt-16 max-sm:mb-16 overflow-visible">
           
        <div class="flex items-center max-sm:flex-col max-sm:px-1 px-24 gap-4 max-lg:px-1">
                    <div class="h-48 rounded-[24px] bg-sixty p-4 w-1/2 max-sm:w-11/12 max-sm:px-1  max-lg:px-0 ">
                        <AtomsTitleH4 :texte="$t('home_info_c1_title')" :color="'text-white'" :size="'text-[18px] md:text-[20px] lg:text-[20px] leading-3'" class="mt-5"></AtomsTitleH4>
                        <div class="h-36 mt-6">
                            <p class="text-center text-white text-sm md:text-base lg:text-base px-0 mb-4  max-lg:mb-1  xs:px-2 max-sm:px-2 xs:h-auto   ">
                                {{$t('home_info_c1_phrase')}}</p>
                        </div>
                    </div>
                    <div class="h-48 rounded-[24px] bg-sixty p-4 w-1/2 max-sm:w-11/12 max-sm:px-1  max-lg:px-0 " >
                        <AtomsTitleH4 :texte="$t('home_info_c2_title')" :color="'text-white'" :size="'text-[18px] md:text-[20px] lg:text-[20px] leading-3'" class="mt-5"></AtomsTitleH4>
                        <div class="h-36 mt-6">
                            <p class="text-center text-white text-sm md:text-base lg:text-base px-0 mb-4 max-lg:mb-1 xs:px-2 max-sm:px-2 xs:h-auto ">
                                {{$t('home_info_c2_phrase')}}
                            </p>
                        </div>
                    </div>
            </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
