import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { VwoLoginPage } from '../pages/VwoLoginPage';

test.describe('VWO invalid authentication', () => {
  test.beforeEach(async ({ page }) => {
    await allure.epic('VWO Authentication');
    await allure.feature('Login');
    await allure.story('Rejected login');
    await allure.severity('normal');
    await new VwoLoginPage(page).open();
  });

  test('rejects invalid credentials with an authentication error', async ({ page }) => {
    const loginPage = new VwoLoginPage(page);
    await allure.step('Submit invalid credentials', async () => {
      await loginPage.loginToApplication(
        process.env.VWO_INVALID_EMAIL ?? 'invalid.user@example.com',
        process.env.VWO_INVALID_PASSWORD ?? 'InvalidPassword!123'
      );
    });
    await allure.step('Verify authentication error', async () => {
      await loginPage.assertAuthenticationError();
    });
  });
});
