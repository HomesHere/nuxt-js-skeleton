<script setup lang="ts">
type ErrorProps = {
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
    stack?: string
  }
}

const props = defineProps<ErrorProps>()

// 에러 초기화 및 홈으로 이동
const handleError = () => clearError({ redirect: '/' })

// 이전 페이지로 이동
const goBack = () => {
  clearError()
  window.history.back()
}

// 에러 코드별 메시지 및 아이콘
const getErrorInfo = (statusCode: number) => {
  const errorMap: Record<number, {
    title: string
    description: string
    icon: string
    color: 'primary' | 'error' | 'warning' | 'success'
  }> = {
    400: {
      title: '잘못된 요청',
      description: '요청이 올바르지 않습니다. 다시 시도해주세요.',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'warning'
    },
    401: {
      title: '인증 필요',
      description: '로그인이 필요한 서비스입니다.',
      icon: 'i-heroicons-lock-closed',
      color: 'primary'
    },
    403: {
      title: '접근 권한 없음',
      description: '이 페이지에 접근할 권한이 없습니다.',
      icon: 'i-heroicons-shield-exclamation',
      color: 'error'
    },
    404: {
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 페이지가 존재하지 않거나 삭제되었습니다.',
      icon: 'i-heroicons-magnifying-glass',
      color: 'primary'
    },
    500: {
      title: '서버 오류',
      description: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'error'
    },
    503: {
      title: '서비스 이용 불가',
      description: '서비스가 일시적으로 이용 불가능합니다. 잠시 후 다시 시도해주세요.',
      icon: 'i-heroicons-wrench-screwdriver',
      color: 'warning'
    }
  }

  return errorMap[statusCode] || {
    title: '오류가 발생했습니다',
    description: '알 수 없는 오류가 발생했습니다.',
    icon: 'i-heroicons-x-circle',
    color: 'error' as const
  }
}

const errorInfo = computed(() => getErrorInfo(props.error.statusCode))

// 개발 모드 확인
const isDev = process.dev

// 스택 트레이스 표시 상태
const showStack = ref(false)
</script>

<template>
  <UContainer class="error-page">
    <div class="error-content">
      <!-- 에러 아이콘 -->
      <div class="error-icon-wrapper">
        <UIcon
          :name="errorInfo.icon"
          class="error-icon"
          :class="`text-${errorInfo.color}-500`"
        />
      </div>

      <!-- 에러 코드 배지 -->
      <UBadge
        :color="errorInfo.color"
        variant="subtle"
        size="lg"
        class="error-badge"
      >
        {{ error.statusCode }}
      </UBadge>

      <!-- 에러 제목 -->
      <h1 class="error-title">
        {{ errorInfo.title }}
      </h1>

      <!-- 에러 설명 -->
      <p class="error-description">
        {{ error.statusMessage || errorInfo.description }}
      </p>

      <!-- 커스텀 메시지 (있는 경우) -->
      <UAlert
        v-if="error.message && error.message !== error.statusMessage"
        color="error"
        variant="soft"
        :title="error.message"
        class="error-alert"
      />

      <!-- 액션 버튼 -->
      <div class="error-actions">
        <UButton
          v-if="error.statusCode === 401"
          color="primary"
          size="lg"
          icon="i-heroicons-arrow-right-on-rectangle"
          @click="navigateTo('/login')"
        >
          로그인하기
        </UButton>
        <UButton
          v-else-if="error.statusCode === 404"
          color="primary"
          size="lg"
          icon="i-heroicons-home"
          @click="handleError"
        >
          홈으로 이동
        </UButton>
        <UButton
          v-else
          color="primary"
          size="lg"
          icon="i-heroicons-arrow-left"
          @click="goBack"
        >
          이전 페이지로
        </UButton>

        <UButton
          color="neutral"
          variant="ghost"
          size="lg"
          icon="i-heroicons-home"
          @click="handleError"
        >
          홈으로 이동
        </UButton>
      </div>

      <!-- 개발 모드: 스택 트레이스 -->
      <UCard v-if="isDev && error.stack" class="error-stack-card">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-code-bracket" class="text-amber-500" />
              <span class="font-semibold">스택 트레이스 (개발 모드)</span>
            </div>
            <UButton
              :icon="showStack ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
              color="neutral"
              variant="ghost"
              size="xs"
              @click="showStack = !showStack"
            />
          </div>
        </template>

        <div v-show="showStack">
          <pre class="error-stack-content">{{ error.stack }}</pre>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.error-content {
  max-width: 600px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.error-icon-wrapper {
  position: relative;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.error-icon {
  width: 6rem;
  height: 6rem;
  opacity: 0.9;
}

.error-badge {
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.error-description {
  font-size: 1.125rem;
  line-height: 1.6;
  opacity: 0.8;
  margin: 0;
}

.error-alert {
  width: 100%;
  max-width: 500px;
}

.error-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
}

.error-stack-card {
  width: 100%;
  max-width: 700px;
  margin-top: 2rem;
}

.error-stack-content {
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 1rem;
  background: rgb(var(--color-gray-950));
  color: rgb(var(--color-gray-100));
  border-radius: 0.5rem;
  margin: 0;
}

/* 다크 모드 대응 */
.dark .error-title {
  color: rgb(var(--color-gray-50));
}

.dark .error-description {
  color: rgb(var(--color-gray-300));
}

/* 반응형 디자인 */
@media (max-width: 640px) {
  .error-icon {
    width: 4rem;
    height: 4rem;
  }

  .error-badge {
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
  }

  .error-title {
    font-size: 1.75rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .error-actions {
    flex-direction: column;
    width: 100%;
  }

  .error-actions button {
    width: 100%;
  }
}
</style>

