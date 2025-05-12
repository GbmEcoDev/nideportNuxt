export default defineNuxtRouteMiddleware((to) => {
  // Solo aplicar el middleware si estamos en una ruta que debería ser de blog
  if (to.params.slug && !to.path.includes('/blog/')) {
    const locale = to.params.locale || '';
    const localePath = locale ? `/${locale}` : '';
    const slugPath = Array.isArray(to.params.slug) ? to.params.slug.join('/') : to.params.slug;
    
    return navigateTo(`${localePath}/blog/${slugPath}`, {
      redirectCode: 301
    });
  }
});