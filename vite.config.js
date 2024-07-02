// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': {
//       VITE_API_URL: 'https://pronet-node-api.vercel.app',
//       NODE_ENV: 'production',
//       COOKIE_DOMAIN: 'pronet-application.vercel.app'
//     }
//   }
// })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env.NODE_ENV': '"production"',
//   }
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // build: {
  //   outDir: 'dist'
  // }
});

