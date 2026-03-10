export default defineEventHandler(async (event) => {
  const notionUrl = 'https://nideport.notion.site/Gantt-Certificaci-n-31b90ee0ed1680b18bace9c59fcf1b54'
  
  try {
    const response = await $fetch(notionUrl, {
      method: 'GET',
      retry: 3,
      retryStatusCodes: [408, 429, 500, 502, 503, 504],
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    return response
  } catch (error) {
    console.error('Error fetching Notion:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching Notion page'
    })
  }
})
