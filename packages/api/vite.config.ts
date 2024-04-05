import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/api',

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    setupFiles: ['src/setupTests.ts'],
    coverage: {
      reportsDirectory: '../../coverage/packages/api',
      provider: 'v8',
      include: ['src'],
      exclude: ['src/mocks', '**/*.spec.*', 'setupTests.ts', 'src/mock-db.ts', 'src/main.tsx', '**/mock.ts'],
    },
  },
});
