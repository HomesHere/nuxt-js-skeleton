// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // TypeScript 규칙
      '@typescript-eslint/no-explicit-any': 'error', // any 타입 사용 금지
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }], // 사용하지 않는 변수 금지 (언더스코어로 시작하는 건 허용)
      
      // Vue 규칙
      'vue/multi-word-component-names': 'off', // 단일 단어 컴포넌트 이름 허용
      'vue/no-multiple-template-root': 'off', // Vue 3는 다중 루트 허용
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        }
      }], // 자체 닫는 태그 강제
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1
      }],
      
      // 일반 JavaScript/TypeScript 규칙
      'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log 경고 (warn, error는 허용)
      'no-debugger': 'error', // debugger 사용 금지
      'prefer-const': 'error', // 재할당하지 않는 변수는 const 사용
      'no-var': 'error', // var 사용 금지
      'eqeqeq': ['error', 'always'], // === 사용 강제
      'curly': ['error', 'all'], // 중괄호 항상 사용
      'no-unused-expressions': 'error', // 사용되지 않는 표현식 금지
    }
  }
)
