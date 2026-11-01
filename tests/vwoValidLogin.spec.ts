import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { VwoLoginPage } from '../pages/VwoLoginPage';

const email = process.env.VWO_EMAIL ?? '';
const password = process.env.VWO_PASSWORD ?? '';

test.describe('VWO valid authentication', () => {
  test.beforeEach(async ({ page }) => {
    await allure.epic('VWO Authentication');
    await allure.feature('Login');
    await allure.story('Successful login');
    await allure.severity('critical');
    await new VwoLoginPage(page).open();
  });

  test('authenticates a valid user and opens the dashboard', async ({ page }) => {
    test.skip(!email || !password, 'Set VWO_EMAIL and VWO_PASSWORD to run the valid login test.');

    const loginPage = new VwoLoginPage(page);
    await allure.step('Submit valid credentials', async () => {
      await loginPage.loginToApplication(email, password);
    });
    await allure.step('Verify authenticated dashboard', async () => {
      await loginPage.assertAuthenticated();
    });
  });
});
