import { expect, Locator, Page } from '@playwright/test';

export class VwoLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly signInButton: Locator;
  readonly authenticationError: Locator;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Enter email ID').first();
    this.passwordInput = page.getByPlaceholder('Enter password').first();
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i });
    this.signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
    this.authenticationError = page.getByText(
      /your email, password, ip address or location did not match|incorrect|unable to sign in/i
    );
    this.dashboardHeading = page.getByRole('heading', { level: 1 }).first();
  }

  async open(): Promise<void> {
    await this.page.goto('/#/login', { waitUntil: 'domcontentloaded' });
    await this.assertLoginFormReady();
  }

  async assertLoginFormReady(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async loginToApplication(email: string, password: string, rememberMe = false): Promise<void> {
    if (!email.trim() || !password) {
      throw new Error('Login requires a non-empty email and password.');
    }

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    if (rememberMe && !(await this.rememberMeCheckbox.isChecked())) {
      await this.rememberMeCheckbox.check();
    }

    await this.signInButton.click();
  }

  async assertAuthenticationError(): Promise<void> {
    await expect(this.authenticationError).toBeVisible();
  }

  async assertAuthenticated(): Promise<void> {
    await expect(this.page).not.toHaveURL(/#\/login/i);
    await expect(this.dashboardHeading).toBeVisible();
  }
}
