import { Page, Locator } from '@playwright/test';

export default class SignupPage {
  readonly page: Page;
  readonly signupLink :Locator ;
  readonly usernameInput : Locator;
  readonly passwordInput : Locator;
  readonly signupSubmit : Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLink = page.getByRole('link',{name : 'Sign up', exact : true});
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
this.signupSubmit = this.page.getByRole('button',{name : 'Sign up', exact : true});
  }

  async openSignupModal() {
    await this.signupLink.click();
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  async signup(username: string, password: string): Promise<void> {
    await this.openSignupModal();
    await this.usernameInput.fill( username);
    await  this.passwordInput.fill(password);
    const [dialog] =await Promise.all([
      // clicking may trigger an alert; wait for it if it appears
      this.page.waitForEvent('dialog').catch(() => {
        console.log('No dialog appeared after clicking Sign up');
      }),
      this.signupSubmit.click(),    

    ]);
    if (dialog) {
  console.log('Dialog message:', dialog.message());
  await dialog.accept();
} else {
  console.log('No dialog appeared after clicking Sign up');
}
  }

   async Newsignup(username: string, password: string): Promise<void> {
    await this.openSignupModal();
    await this.usernameInput.fill( username);
    await  this.passwordInput.fill(password);
 
 
   await  this.signupSubmit.click();
   const [dialog] = await Promise.all([
   this.page.waitForEvent('dialog')       // Wait for the dialog event
  // Perform the click that opens the dialog
  ]);
console.log(dialog.message());

}
}
