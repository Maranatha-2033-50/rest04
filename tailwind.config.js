/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy:  '#0d1f4e',  // 다크 네이비 (주요 짙은 색)
          royal: '#1a56db',  // 로열 블루 (메인 브랜드)
          sky:   '#06b6d4',  // 시안/스카이 (포인트 하이라이트)
          amber: '#f59e0b',  // 앰버/골드 (CTA 포인트)
          light: '#eff6ff',  // 라이트 블루 (밝은 배경/카드)
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1600px',
      },
    },
  },
  plugins: [],
}
