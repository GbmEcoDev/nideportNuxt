<template>
    <div class="bg-white md:bg-transparent lg:bg-transparent relative z-500">
        <div class="flex justify-center items-center md:items-start lg:items-start gap-0 md:gap-4 lg:gap-8 mt-[-120px] md:mt-[-120px] lg:mt-[-120px] flex-col sm:flex-col md:flex-row lg:flex-row h-auto md:h-52 lg:h-60 p-0 m-0">
              <div class="p-0 m-0">
                  <div class="rounded-[32px] bg-white shadow-md p-8 flex-col items-center w-full md:w-[16rem] lg:w-[22.5rem] lg:h-full h-[18rem] md:h-full px-3 sm:px-3
                  hover:text-gray-500 ">
                      <div class="w-full max-sm:mt-0">
                          <NuxtImg :src="`${urlImg}/images/objetive-1.svg`" :alt="$t('project_data_c1_title')" class="w-16 pb-0 mx-auto md:pb-1 lg:pb-1"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c1_title')" alignTxt="center" sizeTxt="text-[18px]" colorTxt="secondary" weightTxt="bold" class="leading-none"/>
                      <p class="text-[16px] text-center text-gray-500 mx-8 lg:mx-11">{{$t('project_data_c1_parag')}}</p>
                    </div>
              </div>
              <div class="p-0 m-0">
                <div class="rounded-[32px] bg-white shadow-md p-8 flex-col items-center w-full md:w-[16rem] lg:w-[22.5rem] lg:h-full h-[18rem] md:h-full px-3 sm:px-3
                  hover:text-gray-500 ">
                      <div class="w-full max-sm:mt-0">
                          <NuxtImg :src="`${urlImg}/images/objetive-2.svg`" :alt="$t('project_data_c2_title')" class="w-16 pb-0 mx-auto md:pb-1 lg:pb-1"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c2_title')" alignTxt="center" sizeTxt="text-[18px]"  colorTxt="secondary" weightTxt="bold" class="leading-none" />
                      <p class="text-[16px] text-center text-gray-500 mx-8 lg:mx-11">{{$t('project_data_c2_parag')}}</p>
                  </div>
              </div>
              <div class="p-0 m-0">
                <div class="rounded-[32px] bg-white shadow-md p-8 flex-col items-center w-full md:w-[16rem] lg:w-[22.5rem] lg:h-full h-[16rem] md:h-full px-3 sm:px-3
                  hover:text-gray-500 ">
                      <div class="w-full max-sm:mt-0">
                          <NuxtImg :src="`${urlImg}/images/objetive-3.svg`" :alt="$t('project_data_c3_title')" class="w-16 pb-0 mx-auto md:pb-1 lg:pb-1"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c3_title')" alignTxt="center" sizeTxt="text-[18px]"  colorTxt="secondary" weightTxt="bold" class="leading-none" />
                      <p class="text-[16px] text-center text-gray-500 mx-6 lg:mx-8">{{$t('project_data_c3_parag')}}</p>
                  </div>
              </div>
        </div>
    </div>
  </template>
  <script lang="ts" setup>
    const config = useRuntimeConfig();
    const urlImg = config.public.url_base;
  </script>