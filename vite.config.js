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

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   // build: {
//   //   outDir: 'dist'
//   // }
// });

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    define: {
      // Make the environment variables available in the Vite config
      'process.env': {
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
        NODE_ENV: JSON.stringify(env.NODE_ENV),
        COOKIE_DOMAIN: JSON.stringify(env.COOKIE_DOMAIN)
      }
    }
  }
})

