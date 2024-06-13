// plugins/nuxt-helpers.js
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(({ redirect }) => {
  function handleRedirect(slug) {
    if (slug && slug.includes('-')) {
      return redirect(`/blog/${slug}`);
    }
  }

  return {
    provide: {
      handleRedirect
    }
  };
});
