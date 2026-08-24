import{test,expect, Locator, Page} from '@playwright/test';
import SignupPage from '../pages/signupPage';
import {LoginPage} from '../pages/loginpage';
import loginUsers from '../testdata/loginUsers.json';  


loginUsers.SignupUsers.forEach((signupUser) => {
  test(`Verify signup functionality for user: ${signupUser.username}`, async ({ page }) => {
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await signupPage.Newsignup(signupUser.username, signupUser.password);
  });
});
