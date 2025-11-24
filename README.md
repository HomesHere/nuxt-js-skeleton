# Nuxt 4 Skeleton Project

> 프로덕션 준비가 완료된 Nuxt 4 + TypeScript + Vue 3 스켈레톤 프로젝트

## 📋 목차

- [기술 스택](#-기술-스택)
- [주요 기능](#-주요-기능)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [환경 변수](#-환경-변수)
- [개발 가이드](#-개발-가이드)
- [빌드 및 배포](#-빌드-및-배포)

## 🚀 기술 스택

### 핵심 프레임워크
- **[Nuxt 4](https://nuxt.com/)** - Vue.js 메타 프레임워크
- **[Vue 3](https://vuejs.org/)** - 프로그레시브 JavaScript 프레임워크
- **[TypeScript](https://www.typescriptlang.org/)** - 타입 안정성

### UI/UX
- **[Nuxt UI](https://ui.nuxt.com/)** - 모던 UI 컴포넌트 라이브러리
- **[Nuxt Image](https://image.nuxt.com/)** - 이미지 최적화
- **[VueUse](https://vueuse.org/)** - Vue Composition 유틸리티

### 상태 관리
- **[Pinia](https://pinia.vuejs.org/)** - Vue 공식 상태 관리
- **[Pinia Persisted State](https://prazdevs.github.io/pinia-plugin-persistedstate/)** - 상태 영속화

### 개발 도구
- **[ESLint](https://eslint.org/)** - 코드 품질 및 스타일 검사
- **[Nuxt DevTools](https://devtools.nuxt.com/)** - 개발자 도구
- **[Nuxt Hints](https://github.com/nuxt/hints)** - 성능 최적화 힌트

## ✨ 주요 기능

### 🔐 인증 시스템
- 글로벌 인증 미들웨어 (`auth.global.ts`)
- 게스트 전용 페이지 미들웨어 (`guest.ts`)
- Pinia 기반 인증 상태 관리
- 자동 리다이렉트 및 세션 관리

### 🌐 API 클라이언트
- `ofetch` 기반 타입 안전 API 클라이언트
- 자동 인증 토큰 주입
- 요청/응답 인터셉터
- 에러 핸들링 및 로깅
- 쿠키 기반 토큰 관리

### 🎨 에러 페이지
- 에러 코드별 커스텀 디자인 (400, 401, 403, 404, 500, 503)
- Nuxt UI 컴포넌트 활용
- 다크 모드 자동 대응
- 개발 모드 스택 트레이스 표시

### 📝 로깅 시스템
- 구조화된 로깅 유틸리티
- API 요청/응답 로깅
- 에러 추적 및 디버깅

### 🏗️ 아키텍처
- Feature-based 폴더 구조
- TypeScript strict 모드
- 자동 import (components, composables, utils)
- SEO 최적화 라우팅

## 📁 프로젝트 구조

```
nuxt-js-skeleton/
├── app/
│   ├── features/              # 기능별 모듈
│   │   ├── auth/             # 인증 관련
│   │   │   └── store/        # Pinia 스토어
│   │   └── shared/           # 공통 코드
│   │       └── utils/        # 유틸리티 함수
│   ├── lib/                  # 라이브러리
│   │   ├── api/              # API 클라이언트
│   │   │   ├── apiClient.ts # HTTP 클라이언트
│   │   │   ├── path.ts      # API 경로
│   │   │   └── types.ts     # API 타입
│   │   └── const/            # 상수
│   ├── middleware/           # 라우트 미들웨어
│   │   ├── auth.global.ts   # 글로벌 인증
│   │   └── guest.ts         # 게스트 전용
│   ├── pages/                # 페이지 (파일 기반 라우팅)
│   ├── app.vue               # 루트 컴포넌트
│   └── error.vue             # 에러 페이지
├── public/                   # 정적 파일
├── types/                    # 전역 타입 정의
├── .cursorrules              # Cursor AI 규칙
├── .gitcommitmsg             # 커밋 메시지 가이드
├── nuxt.config.ts            # Nuxt 설정
├── tsconfig.json             # TypeScript 설정
└── package.json              # 의존성
```

## 🎯 시작하기

### 필수 요구사항

- **Node.js**: 18.x 이상
- **pnpm**: 8.x 이상 (권장)

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (http://localhost:3000)
pnpm dev
```

개발 서버가 시작되면:
- 🌐 브라우저에서 `http://localhost:3000` 접속
- 🔧 DevTools: `Shift + Alt + D` (브라우저에서)

## 🔧 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# API 서버 URL
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080

# 개발 환경용 인증 토큰 (선택사항)
NUXT_PUBLIC_AUTH_TOKEN=your-dev-token
```

## 📚 개발 가이드

### 코딩 스타일

- **TypeScript**: strict 모드, `any` 타입 금지
- **Vue 3**: Composition API (`<script setup>`)
- **인덴트**: 2칸 스페이스 (탭 금지)
- **네이밍**: 
  - 컴포넌트: PascalCase
  - Composables: `use`로 시작
  - 파일명: kebab-case

### 커밋 메시지 규칙

```
type(scope): 제목

본문 (선택사항)

푸터 (선택사항)
```

**Type 종류:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 코드
- `chore`: 기타 변경사항

**예시:**
```
feat(auth): 소셜 로그인 기능 추가

Google OAuth 2.0 연동 구현
- 로그인 버튼 추가
- 콜백 처리 로직 구현
```

자세한 내용은 `.gitcommitmsg` 파일을 참고하세요.

### 브랜치 전략

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 새로운 기능
- `bugfix/*`: 버그 수정
- `hotfix/*`: 긴급 수정

### API 클라이언트 사용

```typescript
// composables/useApi.ts
export const useApi = () => {
  const apiClient = createApiClient()
  
  return {
    // GET 요청
    async getUser(id: string) {
      return await apiClient.get(`/users/${id}`)
    },
    
    // POST 요청
    async createUser(data: CreateUserDto) {
      return await apiClient.post('/users', { body: data })
    }
  }
}
```

### 미들웨어 사용

```vue
<!-- pages/dashboard.vue -->
<script setup lang="ts">
// 글로벌 미들웨어는 자동 적용 (auth.global.ts)
// 추가 미들웨어가 필요한 경우:
definePageMeta({
  middleware: ['auth'] // 또는 ['guest']
})
</script>
```

### 상태 관리

```typescript
// features/user/store/userStore.ts
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  
  const isLoggedIn = computed(() => !!user.value)
  
  function setUser(newUser: User) {
    user.value = newUser
  }
  
  return {
    user,
    isLoggedIn,
    setUser
  }
}, {
  persist: true // 상태 영속화
})
```

## 🏗️ 빌드 및 배포

### 프로덕션 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

### 정적 사이트 생성 (SSG)

```bash
# 정적 파일 생성
pnpm generate
```

### 배포

빌드된 `.output` 디렉토리를 다음 플랫폼에 배포할 수 있습니다:

- **Vercel**: [vercel.com](https://vercel.com)
- **Netlify**: [netlify.com](https://netlify.com)
- **Cloudflare Pages**: [pages.cloudflare.com](https://pages.cloudflare.com)
- **AWS**: Lambda, EC2, S3
- **Docker**: 컨테이너화 배포

자세한 내용은 [Nuxt 배포 문서](https://nuxt.com/docs/getting-started/deployment)를 참고하세요.

## 📖 추가 자료

- [Nuxt 4 문서](https://nuxt.com/docs)
- [Vue 3 문서](https://vuejs.org/guide/introduction.html)
- [Nuxt UI 문서](https://ui.nuxt.com/)
- [Pinia 문서](https://pinia.vuejs.org/)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

---

**Made with ❤️ using Nuxt 4**
