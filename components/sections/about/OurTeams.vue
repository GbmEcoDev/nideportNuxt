<template>
    <section class="bg-gradient-to-b from-[rgb(74,173,162)] to-[rgb(0,116,84)] pt-24 pb-24 px-3 scroll-snap-align-start">
        <AtomsContainer>
            <AtomsTitleH2 alignTxt="center" colorTxt="white" weightTxt="normal" :texte="$t('about_team_title')" class="pb-12" />
        </AtomsContainer>
        <AtomsContainer>
            <div class="grid grid-cols-2 items-stretch sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-8 lg:gap-x-8 lg:gap-y-8">

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
    position: locale.value === 'es' ? 'Co-Founder & CEO' : 'Co-Founder & CEO',
    coverImage: '/images/team/Juan_Nunez.png'
  },
  {
    name: 'Tomas Gutierrez',
    position: locale.value === 'es' ? 'Co-Founder & CFO' : 'Co-Founder & CFO',
    coverImage: '/images/team/TRV.png'
  },
  {
    name: 'Andres Persico',
    position: locale.value === 'es' ? ' COO - Director de Operaciones' : ' COO - Chief Operating Officer',
    coverImage: '/images/team/Andres_Persico.png'
  },
  {
    name: 'Tomas Arata',
    position: locale.value === 'es' ? 'Presidente & CPO - Director de Producto' : 'President & CPO - Chief Product Officer',
    coverImage: '/images/team/Tomas_Arata.png'
  },
  {
    name: 'Juan Durañona y Vedia',
    position: locale.value === 'es' ? 'Idea Creator' : 'Idea Creator',
    coverImage: '/images/team/Juan_Duranona_y_Vedia.png'
  },

  {
    name: 'Marcelo Taboada',
    position: locale.value === 'es' ? 'Responsable de Certificación' : 'Head of Certification',
    coverImage: '/images/team/Marcelo_Taboada.png'
  },
/*   {
    name: 'Maxima Perez Quesada',
    position: locale.value === 'es' ? 'Responsable Comercial' : 'Head of the commercial area',
    coverImage: '/images/team/Maxima_Quesada.png'
  }, */
  {
  name: 'Lucia Larrea',
    position: locale.value === 'es' ? 'Responsable Comercial' : 'Head of the Commercial Area',
    coverImage: '/images/team/Lucia_Larrea.png'
  },

 {
    name: 'Cesar Kleisner',
    position: locale.value === 'es' ? 'Responsable de Legales' : 'Head of the Legal Area',
    coverImage: '/images/team/Cesar_Kleiner.png'
  },
  {
    name: 'Mariano Iturbe',
    position: locale.value === 'es' ? 'Responsable de IDI' : 'Head of IDI',
    coverImage: '/images/team/Mariano_Iturbe.png'
  },
  {
    name: 'Victoria Gardella',
    position: locale.value === 'es' ? 'Responsable de Marketing' : 'Head of the Marketing Area',
    coverImage: '/images/team/VictoriaGardella.png'
  },
/*   {
    name: 'Javier Ureta',
    position: locale.value === 'es' ? 'Responsable de Expansión' : 'Head of the expansion area',
    coverImage: '/images/team/Javier_Ureta.png'
  }, */
  {
    name: 'Pepe Verdejos',
    position: locale.value === 'es' ? 'Tesorería y Logística Global' : 'Head of the Treasury and Global Logistics Area',
    coverImage: '/images/team/Pepe_Verdejos.png'
  },
  {
    name: 'Eugenia Strobbe Pellegrini',
    position: locale.value === 'es' ? 'Responsable Capital Humano' : 'Head of the Human Capital Area',
    coverImage: '/images/team/Eugenia_Strobbe_Pellegrini.png'
  },
  {
    name: 'Fernando Colombini',
    position: locale.value === 'es' ? 'Gestión de Tierras' : 'Responsible for Land Management',
    coverImage: '/images/team/Fernando_Colombini.png'
  },
  {
    name: 'Lorena Mielnichuk',
    position: locale.value === 'es' ? 'Gestión de Campo' : 'Responsible for Field Management',
    coverImage: '/images/team/Lorena_Mielnichuk.png'
  },
  {
    name: 'Claudio Esteban',
    position: locale.value === 'es' ? 'Líder de Seguridad Física y Patrimonial' : 'Responsible for Physical and Property Security',
    coverImage: '/images/team/Claudio_Esteban.png'
  },
  {
    name: 'Guillermo Videla',
    position: locale.value === 'es' ? 'Lider de Logística' : 'Responsible for Logistics and Field Management',
    coverImage: '/images/team/Guillermo_Videla.png'
  },
  {
    name: 'Maicon Villalba',
    position: locale.value === 'es' ? 'Enlace Comunitario en Terreno' : 'Community Liaison in the Field',
    coverImage: '/images/team/Maicon_Villalba.png'
  },
/*   {
    name: 'Lucia Larrea',
    position: locale.value === 'es' ? 'Líder de Back Office' : 'Back Office leader',
    coverImage: '/images/team/Lucia_Larrea.png'
  }, */
  {
    name: 'Gerardo Barreto',
    position: locale.value === 'es' ? 'Operaciones en Terreno' : 'Field Operations', 
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
  {
    name: 'Fabiana Tarzian',
    position: locale.value === 'es' ? 'Responsable de Finanzas' : 'Head of Finance', //Asesora de Expansión / Gestión Contable Intercompany
    coverImage: '/images/team/Fabiana_Tarzian.png'
  },
  {
    name: 'Alejandro Carrano',
    position: locale.value === 'es' ? 'Relaciones con los Inversores y Promotor de Proyectos' : 'Investor Relations and Project Developer',
    coverImage: '/images/team/Alejandro_Carrano.png'
  },
  {
    name: 'Andrea Nuñez',
    position: locale.value === 'es' ? 'Presidenta Fundación Vida Nativa' : 'Presidenta Fundación Vida Nativa',
    coverImage: '/images/team/Andrea_Nunez.png'
  },
  {
    name: 'Lucia Mendella',
    position: locale.value === 'es' ? 'Compliance' : 'Compliance',
    coverImage: '/images/team/Lucia_Mendella.png'
  },
  {
    name: 'Andres Juarez',
    position: locale.value === 'es' ? 'Desarrollador GIS' : 'GIS Development',
    coverImage: '/images/team/Andres_Juarez.png'
  },
  {
    name: 'Ariel Robles',
    position: locale.value === 'es' ? 'Desarrollador Web' : 'Web Development',
    coverImage: '/images/team/Ariel_Robles.png'
  }

]);
</script>
