import { Page, Locator, expect } from '@playwright/test';

export class FirstSignUpPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly welcomeUser: Locator; // shows after successful login, e.g. "Welcome user456"

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('#login2');
    this.username = page.locator('#loginusername');
    this.password = page.locator('#loginpassword');
    this.loginButton = page.locator("//button[text()='Log in']");
    this.welcomeUser = page.locator('#nameofuser');
  }

  async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
    await this.page.goto('https://www.demoblaze.com/');
    await this.loginLink.click();

    await this.username.fill(username);
    await this.password.fill(password);
    await expect(this.loginButton).toBeEnabled();

    // Set up dialog listener BEFORE clicking, so we don't miss it
    let dialogMessage: string | null = null;

    this.page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      console.log(`Dialog message: ${dialogMessage}`);
      await dialog.accept();
    });

    await this.loginButton.click();

    // Race: either the dialog fires (failure) OR welcome text appears (success)
    const result = await Promise.race([
      this.welcomeUser
        .waitFor({ state: 'visible', timeout: 5000 })
        .then(() => 'success' as const)
        .catch(() => 'timeout' as const),
      this.page
        .waitForEvent('dialog', { timeout: 5000 })
        .then(() => 'dialog' as const)
        .catch(() => 'timeout' as const),
    ]);

    // Give the dialog listener a moment to actually capture the message if it fired
    await this.page.waitForTimeout(300);

    if (dialogMessage) {
      // Login failed
      expect(
        ['User does not exist.', 'Invalid password.', 'Wrong password.'].includes(dialogMessage)
      ).toBeTruthy();

      return { success: false, message: dialogMessage };
    } else {
      // Login succeeded
      await expect(this.welcomeUser).toBeVisible();
      const welcomeText = await this.welcomeUser.textContent();
      console.log(`Login succeeded: ${welcomeText}`);

      return { success: true, message: welcomeText ?? 'Login successful' };
    }
  }
}