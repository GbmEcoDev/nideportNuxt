<template>
    <section class="p-20 xs:px-0 scroll-snap-align-start max-sm:p-2 max-sm:mt-16 max-sm:mb-16">
           
                <div class="flex items-center max-sm:flex-col max-sm:px-1 px-24 gap-4 max-lg:px-0">
                    <div class="h-48 rounded-[24px] bg-sixty p-9 w-1/2 max-sm:w-11/12 max-sm:px-1  max-lg:px-0 " data-aos="zoom-out-right">
                        <AtomsTitleH4 :texte="$t('home_info_c1_title')" :color="'text-white'" :size="'text-xl leading-4'"></AtomsTitleH4>
                        <div class="h-40 ">
                            <p class="text-center text-white text-base px-2 mb-4  max-lg:mb-1  h-48 xs:px-2 max-sm:px-2 xs:h-auto  dark:text-white ">
                                {{$t('home_info_c1_phrase')}}</p>
                        </div>
                        <!-- <div class="h-24 flex-col justify-end">
                            <div class="flex justify-center pb-3">
                                <AtomsLinkBtnLinear :href="localePath({ name: 'contact' })" variant="primary" widthBtn="w-11/12 max-lg:w-10/12">
                                    {{$t('home_info_c1_btn1')}}
                                </AtomsLinkBtnLinear>
                            </div>
                             <div class="flex justify-center pb-3">
                                <AtomsLinkBtn :href="localePath({ name: 'contact' })" variant="primary" widthBtn="w-11/12 max-lg:w-10/12">
                                    {{$t('home_info_c1_btn2')}}
                                </AtomsLinkBtn>
                            </div>
                        </div> -->
                    </div>
                    <div class="h-48 rounded-[24px] bg-sixty p-9 w-1/2 max-sm:w-11/12 max-sm:px-1  max-lg:px-0 " data-aos="zoom-out-left">
                        <AtomsTitleH4 :texte="$t('home_info_c2_title')" :color="'text-white'" :size="'text-xl leading-4'"></AtomsTitleH4>
                        <div class="h-40">
                            <p class="text-center text-white text-base px-2 mb-4 max-lg:mb-1 h-48 xs:px-2 max-sm:px-2 xs:h-auto dark:text-white">
                                {{$t('home_info_c2_phrase')}}
                            </p>
                        </div>
                        <!-- <div class="h-24 flex-col justify-end">
                            <div class="flex justify-center pb-3">
                                <AtomsLinkBtnLinear :href="localePath({ name: 'contact' })" variant="primary" widthBtn="w-11/12 max-lg:w-10/12">
                                    {{$t('home_info_c2_btn1')}}
                                </AtomsLinkBtnLinear>
                            </div>
                            <div class="flex justify-center pb-3">
                                <AtomsLinkBtn :href="localePath({ name: 'contact' })" variant="primary" widthBtn="w-11/12 max-lg:w-10/12">
                                    {{$t('home_info_c2_btn2')}}
                                </AtomsLinkBtn>
                            </div>
                        </div> -->
                    </div>
            </div>
            <div class="flex items-center justify-center mt-24 w-full">
                <div class="flex justify-center pb-3 lg:w-1/2 sm:w-11/12 xs:11/12">
                    <AtomsLinkBtn :href="localePath({ name: 'contact' })" variant="cta" costumSpanClass="bg-cta" costumTextColor="text-white"  widthBtn="xs:w-full sm:w-full w-11/12 max-lg:w-10/12">
                        {{$t('home_info_c2_btn2')}}
                    </AtomsLinkBtn>
                </div>
            </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
