export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  // Verificación básica de configuración
  if (!config.notionApiKey || !config.notionDatabaseId) {
    console.error('Faltan credenciales de Notion en runtimeConfig')
    throw createError({
      statusCode: 500,
      statusMessage: 'Error de configuración del servidor (Notion).'
    })
  }

  try {
    // Petición a la API de Notion
    await $fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.notionApiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: {
        parent: { database_id: config.notionDatabaseId },
        properties: {
          "Nombre": {
            title: [{ text: { content: body.nombre || 'Sin nombre' } }]
          },
          "Empresa": {
            rich_text: [{ text: { content: body.empresa || '' } }]
          },
          "Telefono": {
            phone_number: body.telefono || null
          },
          "Email": {
            email: body.email
          },
          "Interes_Creditos": {
            checkbox: body.terminos || false
          },
          "Interes_Tierras": {
            checkbox: body.notificaciones || false
          }
        }
      }
    })
    return { success: true }
  } catch (error: any) {
    // Loguear el error completo en la consola del servidor (terminal donde corre npm run dev)
    console.error('Error detallado de Notion:', JSON.stringify(error.data || error, null, 2))
    
    // Extraer mensaje específico de Notion para enviarlo al frontend
    const notionMessage = error.data?.message || error.message || 'Error desconocido'
    throw createError({ statusCode: 500, statusMessage: `Error Notion: ${notionMessage}` })
  }
})