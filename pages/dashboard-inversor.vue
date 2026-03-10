<template>
  <div class="mt-24 mb-8 w-full">
    <AtomsContainer>
      <div class="section-content">
        <p class=" mt-6 text-secondary text-[1.25rem] lg:text-[2.25rem] lg:text-left md:text-left text-center font-bold">Dashboard Inversor</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <!-- Columna Izquierda - Texto Descriptivo -->
          <div class="content-column">
            <div class="prose dark:prose-invert max-w-none">
              <p class="text-lg leading-relaxed mb-6">
                Accede a nuestro tablero interactivo de Gantt donde puedes seguir en tiempo real 
                el progreso de nuestros proyectos de certificación. Visualiza hitos, cronogramas 
                y dependencias de tareas de manera clara y organizada.
              </p>
              <p class="text-lg leading-relaxed mb-8">
                Esta herramienta te proporciona una visión completa del estado actual de cada 
                proyecto, permitiéndote tomar decisiones informadas basadas en datos actualizados.
              </p>
              
              <a
                href="https://nideport.notion.site/Gantt-Certificaci-n-31b90ee0ed1680b18bace9c59fcf1b54"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Abrir Dashboard Completo
              </a>
            </div>
          </div>

          <!-- Columna Derecha - Captura del Gantt -->
          <div class="image-column">
            <div class="gantt-preview rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/gantt-preview.svg"
                alt="Preview del Gantt Dashboard"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </AtomsContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blog'
})
</script>

<style scoped>
.section-content {
  padding: 3rem 0;
}

.content-column p {
  color: inherit;
}

.gantt-preview {
  background-color: #f3f4f6;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gantt-preview img {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .section-content {
    padding: 2rem 0;
  }
  
  .gantt-preview {
    min-height: 300px;
  }
}
</style>
