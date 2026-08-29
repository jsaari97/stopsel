import { defineConfig } from '@playwright/test';

const testOrigin = 'http://127.0.0.1:4173';

export default defineConfig({
  use: { baseURL: testOrigin },
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1',
    url: testOrigin,
    env: {
      DATABASE_URL: process.env.DATABASE_URL ?? 'test.db',
      ORIGIN: testOrigin,
      BETTER_AUTH_SECRET:
        process.env.BETTER_AUTH_SECRET ?? 'test-only-secret-with-at-least-32-characters'
    }
  },
  testMatch: '**/*.e2e.{ts,js}'
});
