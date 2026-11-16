import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 部署前将 site 改为你的实际地址：https://<username>.github.io
export default defineConfig({
  site: 'https://3323443925-gif.github.io',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
