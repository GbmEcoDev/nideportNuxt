<template>
    <div class="px-2 max-sm:px-0 relative z-500">
        <div class="flex justify-center items-center gap-8 h-72 mt-[-160px]
        xs:flex-col sm:flex-col lg:flex-row
        xs:h-auto sm:h-auto
        xs:px-4 sm:px-8
        ">
          
              <div class="">
                  <div class="rounded-[32px] bg-white  p-8 flex-col items-center w-[22.5rem] lg:h-full mx-2 xs:h-[11rem]
                  max-sm:p-4 
                  max-sm:w-full 
                  max-sm:h-[11rem]
                  max-lg:p-4 
                  max-lg:w-full 
                  max-lg:h-[28,75rem]
                  xs:px-3 sm:px-3
                  hover:text-gray-500 dark:text-white hover:shadow-lg ">
                      <div class="w-full max-sm:mt-0">
                          <NuxtImg :src="`${urlImg}/images/objetive-1.svg`" :alt="$t('project_data_c1_title')" class="w-24 pb-5 mx-auto xs:pb-1 sm:pb-1"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c1_title')" alignTxt="center" sizeTxt="text-[20px]" colorTxt="secondary" weightTxt="bold" />
                      <p class="text-md text-center py-3 text-gray-500 dark:text-white xs:mx-3 sm:mx-3">{{$t('project_data_c1_parag')}}</p>
                  </div>
              </div>

              <div class="">
                  <div class="rounded-[32px] bg-white  p-8 flex-col items-center w-[22.5rem] lg:h-full mx-2 xs:h-[11rem]
                  max-sm:p-4 
                  max-sm:w-full 
                  max-sm:h-[11rem]
                  max-lg:p-4 
                  max-lg:w-full 
                  max-lg:h-[28,75rem]
                  xs:px-3 sm:px-3
                  hover: text-gray-500 dark:text-white hover:shadow-lg ">
                      <div class="w-full max-sm:mt-0">
                          <NuxtImg :src="`${urlImg}/images/objetive-2.svg`" :alt="$t('project_data_c2_title')" class="w-24 pb-5 mx-auto xs:pb-1 sm:pb-1"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c2_title')" alignTxt="center" sizeTxt="text-[20px]"  colorTxt="secondary" weightTxt="bold" />
                      <p class="text-md text-center py-3 text-gray-500 dark:text-white xs:mx-3 sm:mx-3">{{$t('project_data_c2_parag')}}</p>
                  </div>
              </div>

              <div class="">
                  <div class="rounded-[32px] bg-white  p-8 flex-col items-center w-[22.5rem] lg:h-full mx-2 xs:h-[11rem]
                  max-sm:p-4 
                  max-sm:w-full 
                  max-sm:h-[11rem]
                  max-lg:p-4 
                  max-lg:w-full 
                  max-lg:h-[28,75rem]
                  xs:px-3 sm:px-3
                  hover: text-gray-500 dark:text-white hover:shadow-lg ">
                      <div class="w-full max-sm:mt-0">
                          <NuxtImg :src="`${urlImg}/images/objetive-3.svg`" :alt="$t('project_data_c3_title')" class="w-24 pb-5 mx-auto xs:pb-1 sm:pb-1"/>
                      </div>
                      <AtomsTitleH2 :texte="$t('project_data_c3_title')" alignTxt="center" sizeTxt="text-[20px]"  colorTxt="secondary" weightTxt="bold" />
                      <p class="text-md text-center py-3 text-gray-500 dark:text-white">{{$t('project_data_c3_parag')}}</p>
                  </div>
              </div>
        </div>
    </div>
  </template>
  <script lang="ts" setup>
    const config = useRuntimeConfig();
    const urlImg = config.public.url_base;
  </script>