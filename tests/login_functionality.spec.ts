import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
import SignupPage from '../pages/signupPage';
import loginUsers from '../testdata/loginUsers.json';   


test('Verify that a user can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const signupPage = new SignupPage(page);
    await loginPage.navigateToLoginPage();
  const loginResult = await  loginPage.login(loginUsers['valid user'].username, loginUsers['valid user'].password);

  if (loginResult.message === 'User does not exist.' || loginResult.message === 'Invalid password.' || loginResult.message === 'Wrong password.') {
    await signupPage.signup(loginUsers['valid user'].username, loginUsers['valid user'].password);
  }else{
    const loggedInUsername = await loginPage.getLoggedInUsername();
    console.log('Logged in as:', loggedInUsername);
  }
});



  
    test(`Verify login with multiple users from JSON data`, async ({ page }) => {
        for(const user of loginUsers.users){
   const loginPage = new LoginPage(page);
   const signupPage = new SignupPage(page);
    await loginPage.navigateToLoginPage();
    const loginResult = await loginPage.login(user.username, user.password);
if(loginResult.message === 'User does not exist.' || loginResult.message === 'Invalid password.' || loginResult.message === 'Wrong password.'){
    await signupPage.signup(user.username, user.password);
  }
  else{
    const loggedInUsername = await loginPage.getLoggedInUsername();
    console.log('Logged in as:', loggedInUsername);
  }
        }
})
  
test('Verify invalid login attempts with incorrect credentials', async ({ page }) => {
  console.log("Invalid login ");
})

test('Verify invalid login attempts with incorrect credentials in different browsers', async ({ page }) => {
  console.log("Invalid login in different browsers");
})

