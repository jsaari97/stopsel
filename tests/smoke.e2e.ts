import { expect, test } from '@playwright/test';

test('serves the Swedish pre-feature page with security headers', async ({ page }) => {
  const response = await page.goto('/');

  await expect(page).toHaveTitle('Stöpsel');
  await expect(page.locator('html')).toHaveAttribute('lang', 'sv');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Stöpsel');
  expect(response?.headers()['content-security-policy']).toContain("default-src 'self'");
  expect(response?.headers()['x-content-type-options']).toBe('nosniff');
});

test('redirects a signed-out visitor to the administrator login', async ({ page }) => {
  await page.goto('/admin');

  await expect(page).toHaveURL('/admin/login');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Administratörsinloggning');
  await expect(page.getByRole('button', { name: 'Logga in' })).toBeVisible();
  await expect(page.getByRole('button', { name: /registrera/i })).toHaveCount(0);
});

test('rejects public account registration', async ({ request }) => {
  const response = await request.post('/api/auth/sign-up/email', {
    data: {
      email: 'public-registration@example.invalid',
      name: 'Public registration',
      password: 'not-a-real-password'
    }
  });

  expect(response.status()).toBe(400);
});
