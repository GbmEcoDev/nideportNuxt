<template>
   <SectionsContactHeroContact/>
   <SectionsContactMoreInfoContact/>
   <SectionsContactFormInfoNotion/>
   <ScrollTop />
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
    title: 'Formulario de Contacto - Información Notion',
    meta: [
      {
        name: 'description',
        content: 'Formulario de contacto para enviar información directamente a nuestro sistema.' 
      },
    ],
  });
</script>
