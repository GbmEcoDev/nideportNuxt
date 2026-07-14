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
const { locale } = useI18n()

const { data: members } = await useFetch('/api/team')

const teamData = computed(() =>
  (members.value ?? []).map((m: any) => ({
    name: m.name,
    position: locale.value === 'es' ? m.position_es : (m.position_en || m.position_es),
    coverImage: m.photo,
  }))
)
</script>
