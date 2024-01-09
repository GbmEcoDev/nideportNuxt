<template>
     <span v-if="color ? color === 'light' : $colorMode.value === 'light'">
        <img src="/images/logo-nideport.svg" alt="Nideport" class="py-0">
    </span>
    <span v-if="color ? color === 'dark' : $colorMode.value === 'dark'">
        <img src="/images/logo-nideport-dark.svg" alt="Nideport">
    </span>
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