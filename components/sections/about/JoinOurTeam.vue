<template>
    <section class="px-3 md:px-20 lg:px-20 bg-primary bg-opacity-10 overflow-visible pb-8 md:pb-0 lg:pb-0">
            <div class="py-3 md:py-20 lg:py-20  w-full md:w-6/12 lg:w-8/12 flex-col md:flex-row lg:flex-row justify-evenly items-start text-center md:text-left lg:text-left">
                <h2 class="font-semibold w-full lg:w-8/12 text-[24px] py-6 mt-8 md:mt-4 lg:mt-4 md:text-[36px] lg:text-[40px] text-secondary text-center sm:text-center md:text-center lg:text-left xs:leading-6 sm:leading-6 md:leading-8 lg:leading-10 text-[rgb(1,106,129) mb-2 md:mb-0 lg:mb-0">{{ $t('about_join_our_team') }}</h2>
                <p class="text-secondary text-[16px] md:text-[24px] lg:text-[24px]"> {{ $t('about_join_our_team_desc') }}</p>
                <div class="mt-8 md:mt-8 lg:mt-8 w-full">
                    <div class="flex justify-center lg:items-start lg:w-72 sm:w-11/12 xs:11/12">
                        <AtomsLinkBtn :href="'https://notion.so'" rel="external" target="_blank" variant="cta" costumSpanClass="bg-cta" costumTextColor="text-white"  widthBtn="w-[320px]">
                            {{$t('about_join_our_team_btn')}}
                        </AtomsLinkBtn>
                    </div>
                </div>
            </div>    
    </section>
</template>
<script setup lang="ts">
const localePath = useLocalePath()
</script>
