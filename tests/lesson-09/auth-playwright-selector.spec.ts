import { test, expect } from '@playwright/test';

test.describe("AUTH-Authentication", () => { // test suite: nhóm test case login
    test.beforeEach("Go to practice page", async ({ page }) => { // trước khi chạy mỗi test case thì cần thực hiện test này trước
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
    });

    test("@AUTH_001:Login fail", async ({ page }) => { // test case: login fail
        const userName = "betterbytes.academy.admin123";
        const psw = "StrongPass@BetterBytesAcademy";
        await test.step("Input incorrect user name - password", async () => { // step 1: nhập user name - psw sai
            await page.getByRole('textbox', { name: 'Username or Email Address' }).fill(userName);
            await expect(page.getByRole('textbox', { name: 'Username or Email Address' })).toHaveValue(userName);

            await page.getByRole('textbox', { name: 'Password' }).fill(psw);
            await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue(psw);
        });

        await test.step("Click Login button", async () => {  // step 2: click button đăng nhập
            await page.getByRole('button', { name: 'Log In' }).click();

            const errorMsg = page.getByText(`Error: The username ${userName} is not registered on this site. If you are unsure of your username, try your email address instead.`)
            await expect(errorMsg).toBeVisible();
        });
    });

    test("@AUTH_002:Login success", async ({ page }) => { // test case: login success
        const userName = "betterbytes.academy.admin";
        const psw = "StrongPass@BetterBytesAcademy";
        await test.step("Input correct user name - password", async () => { //  step 1: nhập user name - psw đúng
            await page.getByRole('textbox', { name: 'Username or Email Address' }).fill(userName);
            await expect(page.getByRole('textbox', { name: 'Username or Email Address' })).toHaveValue(userName);

            await page.getByRole('textbox', { name: 'Password' }).fill(psw);
            await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue(psw);
        });

        await test.step("Click login button", async () => {  // click button đăng nhập
            await page.getByRole('button', { name: 'Log In' }).click();

            await expect(page).toHaveURL("https://pw-practice-dev.playwrightvn.com/wp-admin/");
            await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveText("Dashboard");
            await expect(page.getByRole('heading', { name: 'At a Glance' })).toHaveText("At a Glance");
            await expect(page.getByRole('heading', { name: 'Activity' })).toHaveText("Activity");

        })


    });
});