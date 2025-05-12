import { defineEventHandler, readBody, H3Event } from 'h3'
import { createError } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  // Verificar el secreto del webhook
  const secret = event.headers.get('x-webhook-secret')
  if (secret !== config.webhookSecret) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  try {
    // Obtener el slug del post desde el webhook
    const { post_name, post_type } = body
    if (post_type === 'post') {
      // Regenerar la página específica
      await $fetch(`/_nuxt/prerender/regenerate`, {
        method: 'POST',
        body: {
          path: `/${post_name}`
        }
      })
    }
    
    return { success: true, message: `Revalidated /${post_name}` }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error during revalidation'
    })
  }
})