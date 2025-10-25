import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'js/main.js',
        'js/forms.js',
        'js/ui.js',
        'js/charts.js',
        '*.config.js'
      ]
    }
  }
});
