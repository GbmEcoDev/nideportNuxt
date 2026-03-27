export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  try {
    const body = await readBody(event);

    // Validación básica
    if (!body.nombre || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nombre y email son requeridos',
      });
    }

    // Enviar a Notion
    const notionResponse = await $fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.NUXT_NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: {
        parent: {
          database_id: config.NUXT_NOTION_DATABASE_ID,
        },
        properties: {
          // Nombre (Title) - Ajusta según tus propiedades de Notion
          'Nombre': {
            title: [
              {
                text: {
                  content: body.nombre,
                },
              },
            ],
          },
          // Empresa (Text)
          'Empresa': {
            rich_text: [
              {
                text: {
                  content: body.empresa || '',
                },
              },
            ],
          },
          // Teléfono (Phone) — nombre de columna en Notion: Telefono
          'Telefono': {
            phone_number: body.telefono || '',
          },
          // Email (Email)
          'Email': {
            email: body.email,
          },
          'Interes_Creditos': {
            checkbox: body.terminos || false,
          },
          'Interes_Tierras': {
            checkbox: body.notificaciones || false,
          },
        },
      },
    });

    // Retornar respuesta exitosa
    return {
      success: true,
      message: 'Datos enviados exitosamente a Notion',
      notion_page_id: (notionResponse as any).id,
    };
  } catch (error: any) {
    console.error('Error al enviar a Notion:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error al procesar el formulario',
    });
  }
});
