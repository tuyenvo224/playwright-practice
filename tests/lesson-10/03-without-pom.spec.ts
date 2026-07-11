import { test } from '@playwright/test';

test('Login success', async ({ page }) =>{
    await test.step("Login page", async () => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
    });

    await test.step("Fill user name", async () => {
        await page.locator("//input[@id='user_login']").fill('betterbytes.academy.admin');
    });

    await test.step("Fill password", async () => {
        await page.locator("//input[@id='user_pass']").fill('StrongPass@BetterBytesAcademy');
    });

    await test.step("Click Login", async () => {
        await page.locator("//input[@id='wp-submit']").click();
    });
});

test('Login fail', async ({ page }) =>{
    await test.step("Login page", async () => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
    });

    await test.step("Fill user name", async () => {
        await page.locator("//input[@id='user_login']").fill('betterbytes.academy.admin');
    });

    await test.step("Fill password", async () => {
        await page.locator("//input[@id='user_pass']").fill('StrongPass@BetterBytesAcademy111');
    });

    await test.step("Click Login", async () => {
        await page.locator("//input[@id='wp-submit']").click();
    });
});