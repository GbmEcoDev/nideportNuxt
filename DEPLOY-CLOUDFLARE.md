# Despliegue en Cloudflare Pages y Notion

## Por qué `npm run generate` rompe el formulario

- **`nuxt generate`** genera un sitio **100% estático** (solo HTML/JS/CSS). No hay servidor ni rutas de API.
- Tu formulario envía un `POST` a **`/api/save-to-notion`**. En un sitio estático esa ruta no existe → 404 o error de red.
- **Conclusión:** para que el formulario funcione, hay que desplegar con **`npm run build`** y un despliegue que incluya el **Worker** (API), no solo archivos estáticos.

## Por qué subir manualmente `dist/` da error de `_routes.json` experimental

- Al hacer **“Upload”** de una carpeta en Workers & Pages, Cloudflare trata el despliegue como **sitio estático**. La carpeta que genera Nuxt con `preset: cloudflare-pages` incluye el Worker (Functions) y un `_routes.json` que define qué rutas atiende el Worker.
- Esa estructura **no es compatible** con el “Upload” manual del dashboard (está pensado solo para estáticos), y por eso aparece el error de `_routes.json` experimental y no te deja desplegar.
- **Conclusión:** no uses “Subir carpeta” en el dashboard para este proyecto. Usa **integración con Git** o **Wrangler por línea de comandos**.

## Estado del proyecto

- **Nitro:** ya está configurado con `preset: 'cloudflare-pages'` en `nuxt.config.ts`.
- **Formulario → Notion:** la ruta de servidor `/api/save-to-notion` usa `useRuntimeConfig()` para leer las credenciales.
- **Política de privacidad:** usa `formatText()` para evitar HTML en i18n; el contenido se muestra correctamente con `v-html`.

## Pasos para desplegar en Cloudflare Pages

### 1. Conectar el repositorio

- En [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
- Elige el repo y la rama (p. ej. `main`).

### 2. Configurar el build

- **Framework preset:** Nuxt (o “None” si prefieres definir todo a mano).
- **Build command:**  
  `npm run build` (equivale a `nuxt build`).
- **Build output directory:**  
  Con tu `nuxt.config` el build genera la carpeta **`.output`**. En Cloudflare pon:
  - **Build output directory:** `.output`
  - (Así Pages recibe tanto los estáticos como el Worker; si en tu proyecto solo te deja poner una carpeta “pública”, prueba primero `.output` y si falla, `.output/public` según lo que pida la UI.)
- **Root directory:** vacío (o la carpeta del proyecto si el repo es un monorepo).

**Importante:** no subas a mano la carpeta `.output` ni `dist/` desde el dashboard; el deploy debe hacerse desde Git o con Wrangler (ver más abajo).

### 3. Variables de entorno (imprescindible para Notion)

En el proyecto de Pages: **Settings** → **Environment variables** → **Add variable**.

Añade estas variables en el entorno **Production** (y en **Preview** si quieres que el formulario funcione también en vistas previas):

| Nombre                   | Valor                    | Encriptado |
|--------------------------|--------------------------|------------|
| `NUXT_NOTION_API_KEY`    | Tu Integration Token de Notion | Sí (recomendado) |
| `NUXT_NOTION_DATABASE_ID`| ID de la base de datos de Notion | Sí (recomendado) |

- **NUXT_NOTION_API_KEY:** en Notion → Settings & members → Connections → Develop or manage integrations → crea una integración y copia el “Internal Integration Token”.
- **NUXT_NOTION_DATABASE_ID:** en la página de la base de datos, la URL es `https://notion.so/...?v=XXXX`; el ID es el bloque de 32 caracteres en `https://www.notion.so/{workspace}/{DATABASE_ID}?v=...`. Comparte esa base con la integración creada.

Opcional, para que el sitemap y `url_base` usen tu dominio de Pages:

| Nombre     | Valor (ejemplo)              |
|------------|------------------------------|
| `BASE_URL` | `https://nideportest.pages.dev` |

Sin `BASE_URL`, el proyecto usa por defecto `https://www.nideport.com` (definido en `nuxt.config.ts`).

### 4. Desplegar

- **Deploy** desde la pestaña **Deployments** o con cada push a la rama conectada.
- La primera vez que se despliegue, Cloudflare usará las variables de entorno en tiempo de ejecución para las **Functions** (tu API `/api/save-to-notion`), por lo que el formulario podrá llamar a Notion igual que en local.

## Por qué el formulario con Notion funciona igual que en local

- El frontend (`FormInfo.vue`) sigue enviando un `POST` a **`/api/save-to-notion`** (ruta relativa; mismo origen en Cloudflare Pages).
- En Cloudflare, esa ruta la sirve un **Worker** (Nitro). Nitro inyecta las variables de entorno en `runtimeConfig` en el servidor.
- Si `NUXT_NOTION_API_KEY` y `NUXT_NOTION_DATABASE_ID` están definidas en Cloudflare, `useRuntimeConfig()` en `server/api/save-to-notion.post.ts` tendrá `notionApiKey` y `notionDatabaseId` y la integración se comportará como en local.

## Resumen de comprobaciones

1. Build: `npx nuxi build` y salida en `.output/public`.
2. Variables en Cloudflare: `NUXT_NOTION_API_KEY` y `NUXT_NOTION_DATABASE_ID` (y opcionalmente `BASE_URL`).
3. En Notion: base de datos compartida con la integración cuyo token usas en `NUXT_NOTION_API_KEY`.

Si algo falla, en **Deployments** → último deployment → **Functions** o **Logs** puedes ver errores del Worker; un 500 con mensaje “Error de configuración del servidor (Notion)” indica que alguna de las dos variables no está definida o no llega al runtime.

---

## Alternativa: deploy con Wrangler (sin Git)

Si no usas Git y quieres desplegar desde tu máquina:

1. Instala Wrangler: `npm i -g wrangler` (o `npx wrangler`).
2. Build: `npm run build`. La salida queda en **`.output`** (con tu config actual).
3. Deploy desde la raíz del proyecto:
   ```bash
   npx wrangler pages deploy .output --project-name=TU_PROYECTO_PAGES
   ```
   La primera vez te pedirá iniciar sesión en Cloudflare y crear el proyecto si no existe.
4. Configura **NUXT_NOTION_API_KEY** y **NUXT_NOTION_DATABASE_ID** en el dashboard del proyecto Pages → **Settings** → **Environment variables**, para que el formulario funcione en producción.
