/**
 * 게스트 미들웨어
 * 비로그인 사용자만 접근 가능한 페이지 (로그인, 회원가입 등)
 */

import { useAuthStore } from '~/features/auth/store/authStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isLoggedIn;

  // 이미 인증된 경우 대시보드로 리다이렉트
  if (isLoggedIn) {
    return navigateTo('/dashboard');
  }
});
