export default defineEventHandler(async () => {
  const { DIRECTUS_URL, DIRECTUS_READER_TOKEN } = useRuntimeConfig()

  const res = await $fetch<{ data: any[] }>(`${DIRECTUS_URL}/items/team_members`, {
    headers: { Authorization: `Bearer ${DIRECTUS_READER_TOKEN}` },
    query: {
      fields: 'name,position,position_en,photo,sort',
      'filter[status][_eq]': 'active',
      sort: 'sort',
      limit: -1,
    },
  }).catch((err) => {
    console.error('Directus team error:', err?.data || err?.message)
    throw createError({ statusCode: 502, statusMessage: 'Error fetching team' })
  })

  return (res as any).data.map((m: any) => ({
    name: m.name,
    position_es: m.position,
    position_en: m.position_en,
    photo: m.photo ? `${DIRECTUS_URL}/assets/${m.photo}?width=256&height=256&fit=cover&format=webp` : null,
  }))
})
