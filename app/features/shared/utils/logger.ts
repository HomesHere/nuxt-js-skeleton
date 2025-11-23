/**
 * 로거 유틸리티
 * 개발 환경에서만 콘솔 출력
 */

/**
 * 개발 모드 체크
 */
function isDevelopment(): boolean {
  if (import.meta.client) {
    return import.meta.dev;
  }
  // 서버 사이드에서는 런타임 설정 사용
  const config = useRuntimeConfig();
  return config.public.environment === 'development';
}

/**
 * 개발 모드에서 콘솔 출력
 */
export const devLog = (
  level: 'log' | 'info' | 'warn' | 'error',
  msg: any,
  ...params: any[]
): void => {
  if (!isDevelopment()) return;

  if (typeof msg !== 'string') {
    console[level](msg, ...params);
    return;
  }

  switch (level) {
    case 'log':
      console.log(`%c✅ ${msg}`, 'color: #70c995;', ...params);
      break;
    case 'info':
      console.info(`%cℹ️ ${msg}`, 'color: #74adf8;', ...params);
      break;
    case 'warn':
      console.warn(`%c⚡️ ${msg}`, 'color: #fca12f;', ...params);
      break;
    case 'error':
      console.error(`%c🔥 ${msg}`, 'color: #e64f47;', ...params);
      break;
  }
};

/**
 * 로그 헬퍼 함수들
 */
export const logger = {
  /**
   * 일반 로그
   */
  log: (msg: any, ...params: any[]) => {
    devLog('log', msg, ...params);
  },

  /**
   * 정보 로그
   */
  info: (msg: any, ...params: any[]) => {
    devLog('info', msg, ...params);
  },

  /**
   * 경고 로그
   */
  warn: (msg: any, ...params: any[]) => {
    devLog('warn', msg, ...params);
  },

  /**
   * 에러 로그
   */
  error: (msg: any, ...params: any[]) => {
    devLog('error', msg, ...params);
  },

  /**
   * API 요청 로그
   */
  api: (method: string, url: string, data?: any) => {
    if (!isDevelopment()) return;
    console.group(`%c🌐 API ${method.toUpperCase()}`, 'color: #9b59b6; font-weight: bold;');
    console.log(`%cURL:`, 'color: #3498db;', url);
    if (data) {
      console.log(`%cData:`, 'color: #3498db;', JSON.stringify(data, null, 2));
    }
    console.groupEnd();
  },

  /**
   * API 응답 로그
   */
  apiResponse: (method: string, url: string, response: any) => {
    if (!isDevelopment()) return;
    console.group(
      `%c✅ API Response ${method.toUpperCase()}`,
      'color: #27ae60; font-weight: bold;'
    );
    console.log(`%cURL:`, 'color: #3498db;', url);
    console.log(`%cResponse:`, 'color: #3498db;', response);
    console.groupEnd();
  },

  /**
   * API 에러 로그
   */
  apiError: (method: string, url: string, error: any) => {
    if (!isDevelopment()) return;
    console.group(`%c❌ API Error ${method.toUpperCase()}`, 'color: #e74c3c; font-weight: bold;');
    console.log(`%cURL:`, 'color: #3498db;', url);
    console.error(`%cError:`, 'color: #e74c3c;', error);
    console.groupEnd();
  },

  /**
   * 그룹 로그 시작
   */
  group: (label: string) => {
    if (!isDevelopment()) return;
    console.group(`%c📦 ${label}`, 'color: #9b59b6; font-weight: bold;');
  },

  /**
   * 그룹 로그 종료
   */
  groupEnd: () => {
    if (!isDevelopment()) return;
    console.groupEnd();
  },

  /**
   * 테이블 로그
   */
  table: (data: any) => {
    if (!isDevelopment()) return;
    console.table(data);
  },

  /**
   * 시간 측정 시작
   */
  time: (label: string) => {
    if (!isDevelopment()) return;
    console.time(`⏱️ ${label}`);
  },

  /**
   * 시간 측정 종료
   */
  timeEnd: (label: string) => {
    if (!isDevelopment()) return;
    console.timeEnd(`⏱️ ${label}`);
  },
};

/**
 * 프로덕션에서도 출력되는 로그 (중요한 에러용)
 */
export const forceLog = {
  error: (msg: string, ...params: any[]) => {
    console.error(`%c🔥 ${msg}`, 'color: #e64f47;', ...params);
  },

  warn: (msg: string, ...params: any[]) => {
    console.warn(`%c⚡️ ${msg}`, 'color: #fca12f;', ...params);
  },
};
