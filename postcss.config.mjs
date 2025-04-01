/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // 여기서 경고 발생할 수 있음
    autoprefixer: {}
  }
};

export default config;