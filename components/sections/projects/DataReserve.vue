<template>
    <div class=" relative z-500">
        <div class="flex justify-center items-center gap-0 md:gap-4 lg:gap-8 mt-[-120px] md:mt-[-1260px] lg:mt-[-160px]
        flex-col sm:flex-col md:flex-row lg:flex-row
        h-auto md:h-72 lg:h-72
        p-0 m-0
        ">
              <div class="p-0 m-0">
                  <div class="rounded-[32px] bg-white p-8 flex-col items-center w-full md:w-[16rem] lg:w-[22.5rem] lg:h-full h-[18rem] md:h-full
                  max-sm:p-4 
                  max-sm:w-full 
                  max-sm:h-[12rem]
                  max-lg:p-4 
                  max-lg:w-full 
                  max-lg:h-[28,75rem]
                  xs:px-3 sm:px-3
                  hover:text-gray-500">
                      <div class="w-full max-sm:mt-0">
                          <NuxtImg :src="`${urlImg}/images/objetive-1.svg`" :alt="$t('project_data_c1_title')" class="w-24 pb-0 mx-auto md:pb-1 lg:pb-1"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c1_title')" alignTxt="center" sizeTxt="text-[20px]" colorTxt="secondary" weightTxt="bold" />
                      <p class="text-md text-center py-1 text-gray-500 mx-8 lg:mx-11">{{$t('project_data_c1_parag')}}</p>
                      
                  </div>
              </div>

              <div class="">
                <div class="rounded-[32px] bg-white p-8 flex-col items-center w-full md:w-[16rem] lg:w-[22.5rem] lg:h-full h-[18rem] md:h-full
                  max-sm:p-4 
                  max-sm:w-full 
                  max-sm:h-[12rem]
                  max-lg:p-4 
                  max-lg:w-full 
                  max-lg:h-[28,75rem]
                  xs:px-3 sm:px-3
                  hover:text-gray-500">
                      <div class="w-full max-sm:mt-0">
                          <NuxtImg :src="`${urlImg}/images/objetive-2.svg`" :alt="$t('project_data_c2_title')" class="w-24 pb-0 mx-auto md:pb-1 lg:pb-1"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c2_title')" alignTxt="center" sizeTxt="text-[20px]"  colorTxt="secondary" weightTxt="bold" />
                      <p class="text-md text-center py-1 text-gray-500 xl:px-14 lg:px-14  mx-14 xs:mx-3 sm:mx-3">{{$t('project_data_c2_parag')}}</p>
                  </div>
              </div>

              <div class="">
                <div class="rounded-[32px] bg-white p-8 flex-col items-center w-full md:w-[16rem] lg:w-[22.5rem] lg:h-full h-[16rem] md:h-full
                  max-sm:p-4 
                  max-sm:w-full 
                  max-sm:h-[12rem]
                  max-lg:p-4 
                  max-lg:w-full 
                  max-lg:h-[28,75rem]
                  xs:px-3 sm:px-3
                  hover:text-gray-500">
                      <div class="w-full max-sm:mt-0">
                          <NuxtImg :src="`${urlImg}/images/objetive-3.svg`" :alt="$t('project_data_c3_title')" class="w-24 pb-0 mx-auto md:pb-1 lg:pb-1"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c3_title')" alignTxt="center" sizeTxt="text-[20px]"  colorTxt="secondary" weightTxt="bold" />
                      <p class="text-md text-center py-1 text-gray-500 mx-6 xs:mx-3 sm:mx-3">{{$t('project_data_c3_parag')}}</p>
                  </div>
              </div>
        </div>
    </div>
  </template>
  <script lang="ts" setup>
    const config = useRuntimeConfig();
    const urlImg = config.public.url_base;
  </script>