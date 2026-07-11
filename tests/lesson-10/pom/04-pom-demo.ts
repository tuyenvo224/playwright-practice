import { expect, Page } from '@playwright/test';

export class MyLoginPage {
    page: Page;
    logoXpath: string = "//img[@class='logo']";
    usernameXpath: string ="//input[@id='user_login']";
    passwordXpath: string = "//input[@id='user_pass']";
    rememberMeXpeth:string = "//input[@id='rememberme']";
    loginXpath: string = "//input[@id='wp-submit']";
    headingXpath: string = "//div[@class='wrap']/child::h1";
    errorXpath: string = "//div[@id='login_error']"

    constructor(page: Page){
        this.page=page;
    }

    async fillUserName(username: string){
        await this.page.locator(this.usernameXpath).fill(username);
    }

    async fillPassword(password: string){
        await this.page.locator(this.passwordXpath).fill(password);
    }
     async clickLogin(){
        await this.page.locator(this.loginXpath).click();
    }

    async verifySucces(nameHeading: string){
        await expect(this.page.locator(this.headingXpath)).toHaveText(nameHeading);
    }

    async verifyFail(){
        await expect(this.page.locator(this.errorXpath)).toBeVisible();
    }

};

