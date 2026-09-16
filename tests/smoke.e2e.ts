import { expect, test } from '@playwright/test';

test('serves the Swedish pre-feature page with security headers', async ({ page }) => {
  const response = await page.goto('/');

  await expect(page).toHaveTitle('Stöpsel');
  await expect(page.locator('html')).toHaveAttribute('lang', 'sv');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Stöpsel');
  expect(response?.headers()['content-security-policy']).toContain("default-src 'self'");
  expect(response?.headers()['x-content-type-options']).toBe('nosniff');
});

test('links the landing page to the public dialect flow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Kom igång' })).toHaveAttribute(
    'href',
    '/valj-dialekt'
  );
  await expect(page.getByRole('button', { name: /Så fungerar det/ })).toBeVisible();
});

test('returns a visitor with a selected dialect to the daily phrase', async ({ context, page }) => {
  await context.addCookies([
    {
      name: 'stopsel_dialect_area',
      value: '1',
      url: 'http://127.0.0.1:4173'
    }
  ]);

  await page.goto('/');

  await expect(page).toHaveURL('/dagens-mening');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Hur säger du det här på din dialekt?'
  );
});

test('lists dialect regions and filters places', async ({ page }) => {
  await page.goto('/valj-dialekt');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Varifrån kommer');
  const regionList = page.getByRole('navigation', { name: 'Dialektområden' });
  await expect(regionList.getByRole('link')).toHaveCount(5);
  await expect(regionList.getByRole('link')).toHaveText([
    'Nyland ›',
    'Satakunta ›',
    'Åboland ›',
    'Åland ›',
    'Österbotten ›'
  ]);
  await expect(regionList.getByRole('link', { name: 'Norra Österbotten' })).toHaveCount(0);
  await regionList.getByRole('link', { name: /Österbotten/ }).click();

  await expect(page).toHaveURL('/valj-dialekt/osterbotten');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Välj ort');
  await expect(page.getByRole('radio').first()).toHaveAccessibleName('Bergö');

  await page.getByRole('searchbox', { name: 'Sök efter en ort' }).fill('Krono');
  await expect(page.getByRole('radio', { name: 'Kronoby' })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Karleby' })).toHaveCount(0);

  await page.goto('/valj-dialekt/aboland');
  await page.getByRole('searchbox', { name: 'Sök efter en ort' }).fill('Pargas');
  await expect(page.getByRole('radio', { name: 'Pargas' })).toHaveCount(1);
});

test('serves the public information pages', async ({ page }) => {
  await page.goto('/integritet');
  await expect(page).toHaveTitle('Integritet | Stöpsel');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Integritet');

  await page.goto('/villkor');
  await expect(page).toHaveTitle('Villkor för bidrag | Stöpsel');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Villkor för bidrag');
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
