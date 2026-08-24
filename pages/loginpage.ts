import{Page, Locator, expect} from '@playwright/test'

export class LoginPage{
    readonly page: Page;
    readonly loginlink: Locator;
    readonly username: Locator; 
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginlink = page.getByRole('link', { name: 'Log in' }).first();
        this.username = page.locator("#loginusername");
        this.password =  page.locator("#loginpassword");
        this.loginButton = page.getByRole('button',{name : 'Log in'});
    }

async navigateToLoginPage(){
await this.page.goto('https://www.demoblaze.com/');
}


async login(username: string, password: string):Promise<{message:string}>{
       
       await this.loginlink.click();
        await this.username.fill(username);
        await this.password.fill(password);
       await  expect(this.loginButton).toBeEnabled();
       const dialogPromise = this.page.waitForEvent('dialog');
            await this.loginButton.click();
            const dialog = await dialogPromise;
            const message = dialog.message();
            console.log(`Dialog message: ${message}`);
            expect(['User does not exist.', 'Invalid password.','Wrong password.'].includes(message)).toBeTruthy();
            dialog.accept();
            console.log(`current url : ${this.page.url()}`);
            await this.page.getByRole('dialog', { name: 'Log in' }).getByLabel('Close').click();
            return {message};
               }

    async getLoggedInUsername(): Promise<string> {
        const loggedInUserElement = this.page.locator('#nameofuser');
        await expect.soft(loggedInUserElement).toBeVisible();
        return await loggedInUserElement.textContent() || '';
    }
}

