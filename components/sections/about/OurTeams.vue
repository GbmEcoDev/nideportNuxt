<template>
    <section class="bg-gradient-to-b from-[rgb(1,106,129)] to-[rgb(15,95,57)] p-24 max-sm:px-6 scroll-snap-align-start">
        <AtomsContainer>
            <AtomsTitleH2 alignTxt="center" colorTxt="white" weightTxt="normal" :texte="$t('about_team_title')" class="pb-12" />
        </AtomsContainer>
        <AtomsContainer>
            <div class="grid grid-cols-2 items-stretch sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-8">

                <!-- <CardsTeam name="Juan" 
                    href="#" 
                    linkedin="#"
                    cover-image="/images/personal.jpg" 
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
    coverImage: '/images/team/JuanNunez.jpg'
  },
  {
    name: 'Andres Persico',
    position: 'COO',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Tomas Gutierrez',
    position: 'CFO',
    coverImage: '/images/team/TRV.jpg'
  },
  {
    name: 'Marcelo Taboada',
    position: 'Presidente / Responsable de Certificación y Sustentabilidad',
    coverImage: '/images/team/MarceloTaboada.jpg'
  },
  {
    name: 'Alejandro Biagini',
    position: 'Administrador de Fideicomiso',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Carlos Cabanes',
    position: 'Seguridad Física y Patrimonial',
    coverImage: '/images/team/CarlosCabanes.jpg'
  },
  {
    name: 'Cesar Kleiner',
    position: 'Responsable de Legales',
    coverImage: '/images/team/CesarKleiner.jpg'
  },
  {
    name: 'Christian Costantini',
    position: 'Asesor',
    coverImage: '/images/team/ChristianCostantini.jpg'
  },
  {
    name: 'Claudio Esteban',
    position: 'Líder de Seguridad Física y Patrimonial',
    coverImage: '/images/team/ClaudioEsteban.jpg'
  },
  {
    name: 'Fabiana Tarzian',
    position: 'Asesora de Expansión',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Fernando Colombini',
    position: 'Gestión de Tierras',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Gerardo Barreto',
    position: 'Capataz de GS1',
    coverImage: '/images/team/GerardoBarreto.jpg'
  },
  {
    name: 'Guillermo Colella',
    position: 'Gestión y Analisis de Monitoreo de Impacto Social',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Guillermo Videla',
    position: 'Lider de Logística',
    coverImage: '/images/team/GuillermoVidela.jpg'
  },
  {
    name: 'Hernan Alonso',
    position: 'Líder de Estructura de Expansión',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Hernán Aycaguer',
    position: 'Asesor',
    coverImage: '/images/team/HernanAycaguer.jpg'
  },
  {
    name: 'Javier Ureta',
    position: 'Responsable de Expansión',
    coverImage: '/images/team/JavierUreta.jpg'
  },
  {
    name: 'Lorena Mielnichuk',
    position: 'Gestión de Campo',
    coverImage: '/images/team/LorenaMielnichuk.jpg'
  },
  {
    name: 'Maicon Villalba',
    position: 'Gestión de Relaciones Comunitarias',
    coverImage: '/images/team/MaiconVillalba.jpg'
  },

  {
    name: 'Martín Figueredo',
    position: 'Líder de Compras y Administración',
    coverImage: '/images/team/MartinFigueredo.jpg'
  },
  {
    name: 'Maxima Perez Quesada',
    position: 'Responsable Comercial',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Natacha Peralta',
    position: 'Gestión de Salvaguardas de Género',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Pablo Gallardo',
    position: 'Líder de Relación con las Comunidades',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Pepe Verdejos',
    position: 'Tesorería y Logística Global',
    coverImage: '/images/team/personal.jpg'
  },
  {
    name: 'Tomas Arata',
    position: 'Responsable de Campo',
    coverImage: '/images/team/TomasArata.jpg'
  },
  {
    name: 'Victoria Gardella',
    position: 'Responsable de Marketing',
    coverImage: '/images/team/VictoriaGardella.jpg'
  },
  {
    name: 'Lucia Larrea',
    position: 'Líder de Back Office',
    coverImage: '/images/team/LuciaLarrea.jpg'
  }
/*   ,
  {
    name: 'Tomas Raul Vicente',
    position: 'CFO',
    coverImage: '/images/team/TVR.jpg'
  } */
]);
</script>

<style scoped>

</style>