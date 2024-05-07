<template>
    <section class="px-0 md:px-20 lg:px-20 py-3 md:py-20 lg:py-20  bg-primary bg-opacity-10 overflow-hidden">
           
                <div class="px-0 md:px-24 lg:px-24 gap-4 flex flex-col md:flex-row lg:flex-row">

                    <div class="h-72 w-full md:w-6/12 lg:w-6/12 flex-col md:flex-row lg:flex-row justify-evenly items-start text-center md:text-left lg:text-left">
                        <h2 class="font-semibold w-full lg:w-8/12 text-[24px] py-8 mt-8 md:mt-4 lg:mt-4 md:text-[36px] lg:text-[40px] text-secondary text-center sm:text-center md:text-center lg:text-left xs:leading-6 sm:leading-6 md:leading-8 lg:leading-10 text-[rgb(1,106,129) mb-2">
                                {{ $t('home_cta_contact') }}
                            </h2>
                        <div class="mt-12 md:mt-24 lg:mt-24 w-full h-48">
                            <div class="flex justify-center lg:items-start  pb-8 lg:w-72 sm:w-11/12 xs:11/12">
                                <AtomsLinkBtn :href="localePath({ name: 'contact' })" variant="cta" costumSpanClass="bg-cta" costumTextColor="text-white"  widthBtn="w-[320px]">
                                    {{$t('home_info_c2_btn2')}}
                                </AtomsLinkBtn>
                            </div>
                        </div>
                    </div>
                    <div class="p-0 md:p-3 lg:p-3 w-full md:w-6/12 lg:w-6/12 flex flex-col justify-center items-center">
                        <div class="h-48 m-2 rounded-[24px] bg-sixty p-4 w-11/12 max-sm:px-1  max-lg:px-0 " data-aos="zoom-out-right">
                            <AtomsTitleH4 :texte="$t('home_info_c1_title')" :color="'text-white'" :size="'text-[20px] leading-[18px]'"></AtomsTitleH4>
                            <div class="h-40 mt-2">
                                <p class="text-center text-white text-sm md:text-md lg:text-md px-0 mb-4  max-lg:mb-1  h-48 xs:px-2 max-sm:px-2 xs:h-auto ">
                                    {{$t('home_info_c1_phrase')}}</p>
                            </div>
                        </div>
                        <div class="h-48 m-2 rounded-[24px] bg-sixty p-4 w-11/12 max-sm:px-1  max-lg:px-0 " data-aos="zoom-out-left">
                            <AtomsTitleH4 :texte="$t('home_info_c2_title')" :color="'text-white'" :size="'text-[20px] leading-[18px]'"></AtomsTitleH4>
                            <div class="h-40 mt-2">
                                <p class="text-center text-white text-sm md:text-md lg:text-md px-0 mb-4 max-lg:mb-1 h-48 xs:px-2 max-sm:px-2 xs:h-aut">
                                    {{$t('home_info_c2_phrase')}}
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
