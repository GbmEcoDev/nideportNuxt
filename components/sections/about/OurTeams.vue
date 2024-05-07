<template>
    <section class="bg-gradient-to-b from-[rgb(74,173,162)] to-[rgb(0,116,84)] p-24 max-sm:px-6 scroll-snap-align-start">
        <AtomsContainer>
            <AtomsTitleH2 alignTxt="center" colorTxt="white" weightTxt="normal" :texte="$t('about_team_title')" class="pb-12" />
        </AtomsContainer>
        <AtomsContainer>
            <div class="grid grid-cols-2 items-stretch sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-8 sm:gap-x-5 sm:gap-y-8">

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
const { locale } = useI18n();
const teamData = ref([
  {
    name: 'Juan Nuñez',
    position: locale.value === 'es' ? 'CEO - Director ejecutivo' : 'CEO - Chief Executive Officer',
    coverImage: '/images/team/Juan_Nunez.png'
  },
  {
    name: 'Tomas Raul Vicente',
    position: locale.value === 'es' ? 'CFO - Director de finanzas' : 'CFO - Chief Financial Officer',
    coverImage: '/images/team/TRV.png'
  },
  {
    name: 'Andres Persico',
    position: locale.value === 'es' ? ' COO - Director de operaciones' : ' COO - Chief Operating Officer',
    coverImage: '/images/team/Andres_Persico.png'
  },

  {
    name: 'Juan Durañona y Vedia',
    position: locale.value === 'es' ? 'Idea Creator' : 'Idea Creator',
    coverImage: '/images/team/Juan_Duranona_y_Vedia.png'
  },
  {
    name: 'Alejandro Carrano',
    position: locale.value === 'es' ? 'Relaciones con los inversores y promotor de proyectos' : 'Investor relations and project developer',
    coverImage: '/images/team/Alejandro_Carrano.png'
  },
  {
    name: 'Marcelo Taboada',
    position: locale.value === 'es' ? 'Presidente Nideport/ Responsable de Certificación' : 'Nideport\'s President / Responsible for Certification',
    coverImage: '/images/team/Marcelo_Taboada.png'
  },
  {
    name: 'Maxima Perez Quesada',
    position: locale.value === 'es' ? 'Responsable Comercial' : 'Head of the commercial area',
    coverImage: '/images/team/Maxima.png'
  },


  {
    name: 'Tomas Arata',
    position: locale.value === 'es' ? 'Responsable de Campo' : 'Head of the field area',
    coverImage: '/images/team/Tomas_Arata.png'
  },

 {
    name: 'Cesar Kleiner',
    position: locale.value === 'es' ? 'Responsable de Legales' : 'Head of the legal area',
    coverImage: '/images/team/Cesar_Kleiner.png'
  }, 
  
  {
    name: 'Victoria Gardella',
    position: locale.value === 'es' ? 'Responsable de Marketing' : 'Head of the marketing area',
    coverImage: '/images/team/Victoria_Gardella.png'
  },

  {
    name: 'Javier Ureta',
    position: locale.value === 'es' ? 'Responsable de Expansión' : 'Head of the expansion area',
    coverImage: '/images/team/Javier_Ureta.png'
  },

  {
    name: 'Pepe Verdejos',
    position: locale.value === 'es' ? 'Tesorería y Logística Global' : 'Head of the treasury and global logistics area',
    coverImage: '/images/team/Pepe_Verdejos.png'
  },

  {
    name: 'Eugenia Strobbe Pellegrini',
    position: locale.value === 'es' ? 'Responsable capital humano' : 'Head of the human capital area',
    coverImage: '/images/team/Eugenia_Strobbe_Pellegrini.png'
  },

 

  {
    name: 'Fernando Colombini',
    position: locale.value === 'es' ? 'Gestión de Tierras' : 'Responsible for land management',
    coverImage: '/images/team/Fernando_Colombini.png'
  },

  {
    name: 'Lorena Mielnichuk',
    position: locale.value === 'es' ? 'Gestión de Campo' : 'Responsible for field management',
    coverImage: '/images/team/Lorena_Mielnichuk.png'
  },
  {
    name: 'Guillermo Colella',
    position: locale.value === 'es' ? 'Gestión y Analisis de Monitoreo de Impacto Social' : 'Responsible for Management and Analysis of Social Impact Monitoring',
    coverImage: '/images/team/Guillermo_Colella.png'
  },

  {
    name: 'Claudio Esteban',
    position: locale.value === 'es' ? 'Líder de Seguridad Física y Patrimonial' : 'Responsible for Physical and Property Security',
    coverImage: '/images/team/Claudio_Esteban.png'
  },

  {
    name: 'Carlos Cabanes',
    position: locale.value === 'es' ? 'Seguridad Física y Patrimonial' : 'Responsible for Physical and Property Security',
    coverImage: '/images/team/Carlos_Cabanes.png'
  },

  {
    name: 'Martín Figueredo',
    position: locale.value === 'es' ? 'Líder de Compras y Administración' : 'Purchasing and Administration Leader',
    coverImage: '/images/team/Martin_Figueredo.jpg'
  },

  {
    name: 'Natacha Peralta',
    position: locale.value === 'es' ? 'Gestión de Salvaguardas de Género' : 'Responsible for Gender Safeguards Management',
    coverImage: '/images/team/Natacha_peralta.png'
  }, 
   {
    name: 'Pablo Gallardo',
    position: locale.value === 'es' ? 'Líder de Relación con las Comunidades' : 'Community Relations Leader',
    coverImage: '/images/team/Pablo_Gallardo.png'
  },

  {
    name: 'Guillermo Videla',
    position: locale.value === 'es' ? 'Lider de Logística' : 'Responsible for Logistics and Field Management',
    coverImage: '/images/team/Guillermo_Videla.jpg'
  },

  {
    name: 'Maicon Villalba',
    position: locale.value === 'es' ? 'Gestión de relaciones Comunitarias' : 'Responsible for Community Relations management',
    coverImage: '/images/team/Maicon_Villalba.png'
  },



  {
    name: 'Lucia Larrea',
    position: locale.value === 'es' ? 'Líder de Back Office' : 'Back Office leader',
    coverImage: '/images/team/Lucia_Larrea.png'
  },

  {
    name: 'Gerardo Barreto',
    position: locale.value === 'es' ? 'Capataz de GS1' : 'GS1 Foreman' ,
    coverImage: '/images/team/Gerardo_Barreto.png'
  },

  {
    name: 'Christian Costantini',
    position: locale.value === 'es' ? 'Asesor' : 'Advisor',
    coverImage: '/images/team/Christian_Costantini.png'
  },

  {
    name: 'Hernán Aycaguer',
    position: locale.value === 'es' ? 'Asesor' : 'Advisor',
    coverImage: '/images/team/Hernan_Aycaguer.png'
  },

]);
</script>
