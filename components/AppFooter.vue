<template>
    <footer class="pt-10 scroll-snap-align-start">
        
        <AtomsContainer>
        <!-- Div que ocupa el ancho completo -->
        <div class="p-1 mb-1 flex items-center justify-center"></div>

        <!-- Tres columnas -->
        <div class="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-4">
            <div class="p-4 flex items-center ">
                <NuxtLink to="/" class=" flex items-center gap-2" activeClass='router-link-active'>
                    <LogoFooter/>
                </NuxtLink>
            </div>
            <div class="p-4 flex items-center text-left text-slate-500 text-xs leading-22 w-3/4 " >Copyright Nideport Uruguay &copy; {{ new Date().getFullYear() }} All rights Reserved.
            <br/> info@nideport.com</div>
            <div class="p-4 flex items-center justify-center">
                <div class="flex items-center gap-x-3">
                    <NuxtLink rel="help"  :to="`mailto:info@nideport.com`" class="transition hover:!scale-110 ">
                        <NuxtImg :src="`${urlImg}/images/icon/mail.svg`" class="icons" alt="Send Mail"/>
                    </NuxtLink> 
                    <NuxtLink target="_blank" alt="" rel="noopener" to="https://www.youtube.com/@Nideport_eco" class="transition hover:!scale-110">
                        <NuxtImg :src="`${urlImg}/images/icon/YT.svg`" class="icons" alt="View Channel Youtube"/>
                    </NuxtLink>
                    <NuxtLink target="_blank" rel="noopener" to="https://www.linkedin.com/company/nideport" class="transition hover:!scale-110">
                        <NuxtImg :src="`${urlImg}/images/icon/LN.svg`" class="icons" alt="View page in Linkedin"/>
                    </NuxtLink>
                    <NuxtLink target="_blank" rel="noopener" to="https://www.instagram.com/nideport_eco/" class="transition hover:!scale-110">
                        <NuxtImg :src="`${urlImg}/images/icon/IG.svg`" class="icons" alt="Follow me"/>
                    </NuxtLink>
                </div>
            </div>
        </div>
        </AtomsContainer>
    </footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const urlImg = config.public.url_base;

</script>
<style>
  .custom-hr {
    border: 0.15em solid rgba(0, 122, 119, 1);
    width: 2.3em;           
  }
  .copy{
    color: var(--grays-primary, var(--color-gray-primary, #505050));
    font-family: Nunito;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; 
  }
  .icons{
    width:3rem;
    height:3rem;
  }
</style>