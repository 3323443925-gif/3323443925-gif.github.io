import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 站点固定部署在 GitHub Pages 根域名，用绝对 base 保证 /projects/:id 深度链接可直接加载
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
  },
});
