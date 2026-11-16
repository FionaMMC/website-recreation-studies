import { defineConfig } from 'vite';
import { resolve } from 'node:path';

function studyRoute(server) {
  server.middlewares.use((req, _res, next) => {
    if (req.url?.split('?')[0] === '/study') req.url = '/study.html';
    next();
  });
}
export default defineConfig({
  plugins: [{name:'local-study-route',configureServer:studyRoute,configurePreviewServer:studyRoute}],
  esbuild: { jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment' },
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  build: { outDir: 'dist', rollupOptions:{input:{main:resolve(import.meta.dirname,'index.html'),study:resolve(import.meta.dirname,'study.html')}} },
});
