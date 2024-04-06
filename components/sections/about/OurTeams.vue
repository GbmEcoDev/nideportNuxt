<template>
    <section class="bg-gradient-to-b from-[rgb(74,173,162)] to-[rgb(0,116,84)] p-24 max-sm:px-6 scroll-snap-align-start">
        <AtomsContainer>
            <AtomsTitleH2 alignTxt="center" colorTxt="white" weightTxt="normal" :texte="$t('about_team_title')" class="pb-12" />
        </AtomsContainer>
        <AtomsContainer>
            <div class="grid grid-cols-2 items-stretch sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-8">

                <!-- <CardsTeam name="Juan" 
                    href="#" 
                    linkedin="#"
                    cover-image="/images/personal.png" 
                    position="Fundador" 
                    created-at=""
                    jobs="Emprendedor, Inversionista, deportista Olimpico y Autor" 
                /> -->
                <CardsTeam v-for="teamMember in teamData" :key="teamMember.name" v-bind="teamMember" />
      
            </div>
        </AtomsContainer>
       </section> 
</template>

<script setup lang="ts">
const teamData = ref([
  {
    name: 'Juan Nuñez',
    position: 'CEO',
    coverImage: '/images/team/Juan_Nunez.png'
  },
  {
    name: 'Andres Persico',
    position: 'COO',
    coverImage: '/images/team/Andres_Persico.png'
  },
  {
    name: 'Tomas Gutierrez',
    position: 'CFO',
    coverImage: '/images/team/TRV.png'
  },
  {
    name: 'Maxima Perez Quesada',
    position: 'Responsable Comercial',
    coverImage: '/images/team/Maxima.png'
  },
  {
    name: 'Marcelo Taboada',
    position: 'Presidente Nideport/ Responsable de Certificación',
    coverImage: '/images/team/Marcelo_Taboada.png'
  },

  {
    name: 'Tomas Arata',
    position: 'Responsable de Campo',
    coverImage: '/images/team/Tomas_Arata.png'
  },

 {
    name: 'Cesar Kleiner',
    position: 'Responsable de Legales',
    coverImage: '/images/team/Cesar_Kleiner.png'
  }, 
  
  {
    name: 'Victoria Gardella',
    position: 'Responsable de Marketing',
    coverImage: '/images/team/Victoria_Gardella.png'
  },

  {
    name: 'Javier Ureta',
    position: 'Responsable de Expansión',
    coverImage: '/images/team/Javier_Ureta.png'
  },

  {
    name: 'Pepe Verdejos',
    position: 'Tesorería y Logística Global',
    coverImage: '/images/team/Pepe_Verdejos.png'
  },

  {
    name: 'Eugenia Strobbe Pellegrini',
    position: 'Responsable capital humano',
    coverImage: '/images/team/Eugenia_Strobbe_Pellegrini.png'
  },

  {
    name: 'Juan Durañona y Vedia',
    position: 'Idea Creator',
    coverImage: '/images/team/Juan_Duranona_y_Vedia.png'
  },

  {
    name: 'Fernando Colombini',
    position: 'Gestión de Tierras',
    coverImage: '/images/team/Fernando_Colombini.png'
  },

  {
    name: 'Lorena Mielnichuk',
    position: 'Gestión de Campo',
    coverImage: '/images/team/Lorena_Mielnichuk.png'
  },
  {
    name: 'Guillermo Colella',
    position: 'Gestión y Analisis de Monitoreo de Impacto Social',
    coverImage: '/images/team/Guillermo_Colella.png'
  },

  {
    name: 'Claudio Esteban',
    position: 'Líder de Seguridad Física y Patrimonial',
    coverImage: '/images/team/Claudio_Esteban.png'
  },

  {
    name: 'Carlos Cabanes',
    position: 'Seguridad Física y Patrimonial',
    coverImage: '/images/team/Carlos_Cabanes.png'
  },

  {
    name: 'Martín Figueredo',
    position: 'Líder de Compras y Administración',
    coverImage: '/images/team/Martin_Figueredo.jpg'
  },

  {
    name: 'Natacha Peralta',
    position: 'Gestión de Salvaguardas de Género',
    coverImage: '/images/team/Natacha_Peralta.png'
  },

  {
    name: 'Guillermo Videla',
    position: 'Lider de Logística',
    coverImage: '/images/team/Guillermo_Videla.jpg'
  },

  {
    name: 'Maicon_Villalba',
    position: 'Gestión de relaciones Comunitarias',
    coverImage: '/images/team/Maicon_Villalba.png'
  },

  {
    name: 'Pablo Gallardo',
    position: 'Líder de Relación con las Comunidades',
    coverImage: '/images/team/Pablo_Gallardo.png'
  },

  {
    name: 'Lucia Larrea',
    position: 'Líder de Back Office',
    coverImage: '/images/team/Lucia_Larrea.png'
  },

  {
    name: 'Gerardo Barreto',
    position: 'Capataz de GS1',
    coverImage: '/images/team/Gerardo_Barreto.png'
  },

  {
    name: 'Christian Costantini',
    position: 'Asesor',
    coverImage: '/images/team/Christian_Costantini.png'
  },

  {
    name: 'Hernán Aycaguer',
    position: 'Asesor',
    coverImage: '/images/team/Hernan_Aycaguer.png'
  },





 

/*   ,
  {
    name: 'Tomas Raul Vicente',
    position: 'CFO',
    coverImage: '/images/team/TVR.png'
  } */
]);
</script>

<style scoped>

</style>