<template>
     <div>
         <p v-if="color ? color === 'light' : $colorMode.value === 'light'">
            <NuxtImg src="/images/logo-nideport.svg" alt="Nideport" class="py-0 w-[185px]"/>
             </p>
             <p v-if="color ? color === 'dark' : $colorMode.value === 'dark'">
            <NuxtImg src="/images/logo-nideport-dark.svg" alt="Nideport" class="w-[185px]"/>
             </p>
     </div>
</template>
<script>
export default {
    props: ['color']
}
</script>
<style scope>
/*img {
    width:185px;
}*/
</style>