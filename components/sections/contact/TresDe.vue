<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

export default {
  mounted() {
    // Crear un renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: this.$refs.canvas,
      alpha: true,
    })

    // Crear una cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Crear una escena
    const scene = new THREE.Scene()

    // Cargar el archivo SVG
    const loader = new SVGLoader()
    loader.load('_nuxt/model/Earth.obj', (data) => {
      const paths = data.paths
      const group = new THREE.Group()

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i]

        const material = new THREE.MeshBasicMaterial({
          color: path.color,
          side: THREE.DoubleSide,
          depthWrite: false,
        })

        const shapes = path.toShapes(true)

        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j]
          const geometry = new THREE.BufferGeometry (shape)
          const mesh = new THREE.Mesh(geometry, material)
          group.add(mesh)
        }
      }

      scene.add(group)

      // Agregar un efecto de movimiento que siga el movimiento del mouse
      document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX / window.innerWidth
        const mouseY = event.clientY / window.innerHeight
        group.rotation.x = mouseY * 2 * Math.PI
        group.rotation.y = mouseX * 2 * Math.PI
      })

      // Renderizar la escena
      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()
    })
  },
}
</script>