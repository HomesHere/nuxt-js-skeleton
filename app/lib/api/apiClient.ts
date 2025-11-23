import { ofetch, type FetchOptions } from 'ofetch';
import { logger } from '~/features/shared/utils/logger';

export function createApiClient() {
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7일
  const config = useRuntimeConfig();

  const apiFetch = ofetch.create({
    baseURL: config.public.apiBaseUrl,

    /** 요청 인터셉터 */
    async onRequest({ request, options }) {
      // 인증 토큰 자동 주입
      const cookieToken = useCookie('auth_token', {
        maxAge: COOKIE_MAX_AGE,
        secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서만 쿠키사용
        httpOnly: true, // 클라이언트 스크립트에서 접근 불가
        sameSite: 'lax', // 동일 사이트 쿠키 전송 허용
      }).value;

      // 쿠키에 토큰이 없으면 환경변수에서 가져오기 (개발 환경용)
      const token = cookieToken || config.public.authToken;

      if (token) {
        options.headers = new Headers(options.headers);
        options.headers.set('Authorization', `Bearer ${token}`);
      }

      // API 요청 로그
      const method = options.method as string;
      const url = request.toString();
      const body = options.body;
      logger.api(method, url, body);
    },

    /** 응답 인터셉터 */
    async onResponse({ request, response, options }) {
      const method = options.method as string;
      const url = request.toString();
      const data = response._data;
      logger.apiResponse(method, url, data);
    },

    /**  에러 인터셉터 */
    async onResponseError({ request, response, options }) {
      const message = response._data.message || 'Unknown error';
      const statusCode = response.status;
      const errors = response._data.errors;

      // API 에러 로그
      logger.apiError(options.method || 'GET', request.toString(), errors);

      // 401
      if (statusCode === 401) {
        logger.warn('인증 토큰 만료 - 자동 로그아웃');
        // TODO: 로그아웃 처리 + 로그인페이지로 리다이렉트
      }

      // 403
      if (statusCode === 403) {
        logger.error('403 Forbidden');
      }
      // 404
      if (statusCode === 404) {
        logger.error('404 Not Found');
      }
      // 5XX
      if (statusCode >= 500) {
        logger.error('Internal Server Error');
      }
    },
  });

  return {
    get<T = any>(url: string, options?: Partial<FetchOptions>) {
      return apiFetch<T>(url, { ...options, method: 'GET' } as any);
    },
    post<T = any>(url: string, body?: any, options?: Partial<FetchOptions>) {
      return apiFetch<T>(url, { ...options, method: 'POST', body } as any);
    },
    put<T = any>(url: string, body?: any, options?: Partial<FetchOptions>) {
      return apiFetch<T>(url, { ...options, method: 'PUT', body } as any);
    },
    delete<T = any>(url: string, options?: Partial<FetchOptions>) {
      return apiFetch<T>(url, { ...options, method: 'DELETE' } as any);
    },
    patch<T = any>(url: string, body?: any, options?: Partial<FetchOptions>) {
      return apiFetch<T>(url, { ...options, method: 'PATCH', body } as any);
    },
    raw: apiFetch,
  };
}

/**
 * API 클라이언트 composable
 */
export function useApi() {
  return createApiClient();
}
