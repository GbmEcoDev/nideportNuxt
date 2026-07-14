export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validación
  if (!body.nombre || !body.email) {
    throw createError({ statusCode: 400, statusMessage: 'Nombre y email son requeridos' })
  }

  // Determinar tipo de interés desde los checkboxes del form
  // terminos → quiere créditos | notificaciones → ofrece tierras
  let type: string
  if (body.terminos && body.notificaciones) {
    type = 'creditos' // ambos marcados: prioridad créditos, el equipo ve el mensaje
  } else if (body.notificaciones) {
    type = 'tierras'
  } else {
    type = 'creditos'
  }

  const payload = {
    name:    String(body.nombre).trim(),
    email:   String(body.email).trim().toLowerCase(),
    phone:   body.telefono  ? String(body.telefono).trim()  : null,
    company: body.empresa   ? String(body.empresa).trim()   : null,
    message: body.mensaje   ? String(body.mensaje).trim()   : null,
    type,
    status: 'nuevo',
  }

  const res = await $fetch(`${config.DIRECTUS_URL}/items/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.DIRECTUS_FORM_TOKEN}`,
    },
    body: payload,
  }).catch((err: any) => {
    console.error('Directus leads error:', err?.data || err?.message)
    throw createError({ statusCode: 502, statusMessage: 'Error al guardar el lead' })
  })

  return { success: true, id: (res as any)?.data?.id }
})
