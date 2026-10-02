import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// @vitejs/plugin-react enables the automatic JSX runtime (react/jsx-runtime).
export default defineConfig({
  plugins: [react()],
});
