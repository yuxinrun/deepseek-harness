import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 部署目标：GitHub Pages 项目站 https://yuxinrun.github.io/deepseek-harness/
// dev / preview / build 统一使用子路径，HashRouter 兼容静态托管刷新。
export default defineConfig({
  base: '/deepseek-harness/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/echarts') || id.includes('node_modules/zrender')) return 'echarts'
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler') || id.includes('react-router')) return 'react'
        },
      },
    },
  },
})
