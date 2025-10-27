<template>
  <section class="p-24 max-sm:px-1 scroll-snap-align-start">
    <AtomsContainer>
      <div class="flex flex-col items-center w-full">
        <div class="w-full ">
          
          <!-- Responsive header + logos: column on mobile (title above logos), row on desktop -->
          <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">
              <!-- Heading: on mobile it should appear first, on desktop stays to the left -->
              <div class="order-1 sm:order-1 w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
                  <h3 class="text-secondary text-xl font-semibold mt-3">
                    {{ $t('projects_credit_certifications_and_specs') }}
                  </h3>
              </div>

              <!-- Logos: centered on mobile, aligned to the right on desktop -->
              <div class="order-2 sm:order-2 w-full sm:w-auto flex justify-center sm:justify-end gap-6 mb-4 sm:mb-0">
                <img src="/images/vcs-logo.png" alt="Verified Carbon Standard" class="h-12" />
                <img src="/images/ccbs-logo.png" alt="Climate, Community & Biodiversity Standards" class="h-12" />
              </div>
          </div>

          <!-- Tabla de especificaciones -->
          <div class="bg-[#EAF7F4] rounded-lg shadow-md">
            <div class="">
              <!-- Créditos certificados -->
              <div class="bg-transparent grid grid-cols-2 gap-y-2 px-6 py-4">
                  <div class="font-bold text-secondary bg-[#EAF7F4] ">{{ $t('projects_credit_data1') }}</div>
                  <div class="font-bold text-secondary">{{ $t('projects_credit_data1value') }}</div>
              </div>

              <!-- Desarrollador -->
              <div class="bg-primary-50 grid grid-cols-2 gap-y-2 px-6 py-4">
                  <div class="font-bold text-secondary">{{ $t('projects_credit_data2') }}</div>
                  <div class=" text-secondary">{{ $t('projects_credit_data2value') }}</div>
              </div>

              <!-- Ubicación -->
              <div class="bg-transparent grid grid-cols-2 gap-y-2 px-6 py-4">
                  <div class="font-bold text-secondary">{{ $t('projects_credit_data3') }}</div>
                  <div class=" text-secondary">{{ $t('projects_credit_data3value') }}</div>
              </div>

              <!-- Área del proyecto -->
              <div class="bg-primary-50 grid grid-cols-2 gap-y-2 px-6 py-4">
                  <div class="font-bold text-secondary">{{ $t('projects_credit_data4') }}</div>
                  <div class=" text-secondary">{{ $t('projects_credit_data4value') }}</div>
              </div>

              <!-- VCS Registry -->
              <div class="bg-transparent grid grid-cols-2 gap-y-2 px-6 py-4">
                  <div class="font-bold text-secondary">{{ $t('projects_credit_data5') }}</div>
                  <div class=" text-secondary">{{ $t('projects_credit_data5value') }}</div>
              </div>

              <!-- Estándar -->
              <div class="bg-primary-50 grid grid-cols-2 gap-y-2 px-6 py-4 rounded-b-lg">
                  <div class="font-bold text-secondary">{{ $t('projects_credit_data6') }}</div>
                  <div class="space-y-1">
                    <div class="text-secondary"><span class="font-bold">{{ $t('projects_credit_data6_a_value') }}</span> {{ $t('projects_credit_data6_a_subvalue') }}</div>
                    <div class="text-secondary"><span class="font-bold">{{ $t('projects_credit_data6_b_value') }}</span> {{ $t('projects_credit_data6_b_subvalue') }}</div>
                    <div class="text-secondary"><span class="font-bold">{{ $t('projects_credit_data6_c_value') }}</span> {{ $t('projects_credit_data6_c_subvalue') }}</div>
                    <div class="text-secondary"><span class="font-bold">{{ $t('projects_credit_data6_d_value') }}</span> {{ $t('projects_credit_data6_d_subvalue') }}</div>
                    <div class="text-secondary"><span class="font-bold">{{ $t('projects_credit_data6_e_value') }}</span> {{ $t('projects_credit_data6_e_subvalue') }}</div>
                    <div class="text-secondary"><span class="font-bold">{{ $t('projects_credit_data6_f_value') }}</span> {{ $t('projects_credit_data6_f_subvalue') }}</div>
                  </div>
              </div>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex flex-col sm:flex-row gap-4 mt-8">
            <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition">
              {{ $t('projects_credit_buy_carbon_credits') }}
            </button>
            <button class="border border-green-500 text-green-500 hover:bg-green-50 px-6 py-3 rounded-lg font-bold transition">
              {{ $t('projects_credit_view_project_on_verra') }}
            </button>
          </div>
        </div>
      </div>
    </AtomsContainer>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const { t, locale } = useI18n();
// const language = locale.value.toUpperCase(); // <- Eliminar o mover a un 'computed' si es necesario

// Nota: Asegúrate de tener las traducciones en tus archivos de i18n:
// es.json: {
//   "certifications_and_specs": "Certificaciones y especificaciones",
//   "buy_carbon_credits": "Adquirí tus créditos de carbono",
//   "view_project_on_verra": "Ver proyecto en Verra"
// }
</script>

<style scoped>
/* Puedes personalizar más si necesitas */
</style>