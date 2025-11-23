export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const isLoading = ref(false);

  const isLoggedIn = computed(() => isAuthenticated.value);

  return {
    // State
    isLoading,
    isLoggedIn,
  };
});
