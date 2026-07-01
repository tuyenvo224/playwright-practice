import { test, expect } from '@playwright/test';

test.describe("AUTH-Authentication", () => { // test suite: nhóm test case login
    test.beforeEach("Go to practice page", async({ page }) =>{ // trước khi chạy mỗi test case thì cần thực hiện test này trước
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");        
    });

    test("@AUTH_001:Login fail", async ({ page }) => { // test case: login fail
        const userName = "betterbytes.academy.admin123";
        const psw = "StrongPass@BetterBytesAcademy";
        await test.step("Input incorrect user name - password", async () => { // step 1: nhập user name - psw sai
            await page.locator("//input[@id='user_login']").fill(userName);
            await expect(page.locator("//input[@id='user_login']")).toHaveValue(userName);

            await page.locator("//input[@id='user_pass']").fill(psw);
            await expect(page.locator("//input[@id='user_pass']")).toHaveValue(psw);
        });

        await test.step("Click Login button", async () => {  // step 2: click button đăng nhập
            await page.locator("//input[@id='wp-submit']").click();

            const errorMsg = page.locator("//div[@id='login_error']/child::p")
            await expect(errorMsg).toHaveText(`Error: The username ${userName} is not registered on this site. If you are unsure of your username, try your email address instead.`)
        });
    });

    test("@AUTH_002:Login success", async ({ page }) => { // test case: login success
            const userName = "betterbytes.academy.admin";
            const psw = "StrongPass@BetterBytesAcademy";
            await test.step("Input correct user name - password", async () => { //  step 1: nhập user name - psw đúng
                await page.locator("//input[@id='user_login']").fill(userName);
                await expect(page.locator("//input[@id='user_login']")).toHaveValue(userName);

                await page.locator("//input[@id='user_pass']").fill(psw);
                await expect(page.locator("//input[@id='user_pass']")).toHaveValue(psw);
            });

            await test.step("Click login button", async () => {  // click button đăng nhập
                await page.locator("//input[@id='wp-submit']").click();

                await expect(page).toHaveURL("https://pw-practice-dev.playwrightvn.com/wp-admin/");
                await expect(page.locator("//div[@class='wrap']/child::h1")).toHaveText("Dashboard");
                await expect(page.locator("//h2[text()='At a Glance']")).toHaveText("At a Glance");
                await expect(page.locator("//h2[text()='Activity']")).toHaveText("Activity");

            });


        });
});