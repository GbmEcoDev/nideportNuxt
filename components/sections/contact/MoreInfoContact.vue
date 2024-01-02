<template>
    <section class="p-20 xs:px-0scroll-snap-align-start max-sm:p-2 max-sm:mt-16 max-sm:mb-16">
           
                <div class="flex items-center max-sm:flex-col max-sm:px-1 px-32 gap-4  max-lg:px-0 ">
                    <div class="h-96 rounded-[24px] bg-primary bg-opacity-10 p-9 w-1/2 max-sm:w-11/12 max-sm:px-1  max-lg:px-0 " data-aos="zoom-out-right">
                        <AtomsTitleH4 texte="Adquirir créditos de carbono"></AtomsTitleH4>
                        <p class="text-center text-[#055735] text-base p-9 mb-8  max-lg:mb-1  h-48 xs:px-2 max-sm:px-2 xs:h-auto  dark:text-white">
                            Una solución para luchar ante la crisis climática desde el ámbito empresarial y compensar las emisiones de gases de efecto invernadero.</p>
                        <div class="flex justify-center pb-3">
                            <AtomsLinkBtnLinear :href="localePath({ name: 'contact' })" variant="primary" widthBtn="w-11/12 max-lg:w-10/12">
                              Mas informacion
                            </AtomsLinkBtnLinear>
                        </div>
                         <div class="flex justify-center pb-3">
                            <AtomsLinkBtn :href="localePath({ name: 'contact' })" variant="primary" widthBtn="w-11/12 max-lg:w-10/12">
                              Contactar con un representante
                            </AtomsLinkBtn>
                        </div><!-- -->
                    </div>
                    <div class="h-96 rounded-[24px] bg-primary bg-opacity-10 p-9 w-1/2 max-sm:w-11/12 max-sm:px-1  max-lg:px-0 " data-aos="zoom-out-left">
                        <AtomsTitleH4 texte="Colaboración de tierras"></AtomsTitleH4>
                        <p class="text-center text-[#055735] text-base p-10 mb-0 max-lg:mb-1 h-48 xs:px-2 max-sm:px-2 xs:h-auto dark:text-white">
                            Únete a nosotros en la promoción de prácticas efectivas de restauración de ecosistemas y desarrollo sostenible para beneficiar tanto a la biodiversidad como a las comunidades locales.
                        </p>
                        <div class="flex justify-center pb-3">
                            <AtomsLinkBtnLinear :href="localePath({ name: 'contact' })" variant="primary" widthBtn="w-11/12 max-lg:w-10/12">
                              Mas informacion
                            </AtomsLinkBtnLinear>
                        </div>
                        <div class="flex justify-center pb-3">
                            <AtomsLinkBtn :href="localePath({ name: 'contact' })" variant="primary" widthBtn="w-11/12 max-lg:w-10/12">
                              Contactar con un representante
                            </AtomsLinkBtn>
                        </div> <!-- -->
                    </div>
            </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
