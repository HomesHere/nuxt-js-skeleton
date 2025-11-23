export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/hints', // 개발 중 성능 및 최적화 힌트 제공
    '@nuxt/image', // 이미지 최적화 및 반응형 이미지 처리
    '@nuxt/ui', // Nuxt UI 컴포넌트 라이브러리
    '@nuxt/eslint', // ESLint 통합 및 자동 설정
    '@vueuse/nuxt', // VueUse 컴포저블 라이브러리 (유틸리티 함수 모음)
    '@pinia/nuxt', // Pinia 상태 관리 라이브러리
    '@pinia-plugin-persistedstate/nuxt', // Pinia 상태 관리 라이브러리
  ],

  typescript: {
    strict: true, // 런타임 에러 사전 방지, 코드 품질 향상
    typeCheck: false, // 빌드 시 타입 오류 검출 -> nuxt4 와 호환 안맞아서 false 로 변경
    shim: false, // Nuxt 3 권장사항
  },

  router: {
    options: {
      strict: true, // /page와 /page/ 구분 (SEO 중복 방지)
      scrollBehaviorType: 'smooth', // 부드러운 스크롤로 UX 개선
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
    },
  },

  devServer: {
    port: 3000, // 개발 서버 포트 번호
    host: 'localhost', // 로컬 호스트에서만 접속 가능
  },

  // 소스 맵 설정 (디버깅 시 유용)
  sourcemap: {
    server: true, // 서버 에러 디버깅
    client: process.env.NODE_ENV === 'development', // 개발 환경에서만 브라우저 에러 디버깅
  },
});
