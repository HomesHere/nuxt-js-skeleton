import { useAuthStore } from '~/features/auth/store/authStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isLoggedIn;

  if (!isLoggedIn) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
