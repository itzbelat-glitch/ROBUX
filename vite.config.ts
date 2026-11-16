import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api/roblox-users': {
          target: 'https://users.roblox.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/roblox-users/, ''),
        },
        '/api/roblox-thumbs': {
          target: 'https://thumbnails.roblox.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/roblox-thumbs/, ''),
        },
        '/api/roblox-groups': {
          target: 'https://groups.roblox.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/roblox-groups/, ''),
        },
        '/api/roblox-friends': {
          target: 'https://friends.roblox.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/roblox-friends/, ''),
        },
        '/api/rolimons': {
          target: 'https://api.rolimons.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/rolimons/, ''),
        },
      },
    },
  };
});
