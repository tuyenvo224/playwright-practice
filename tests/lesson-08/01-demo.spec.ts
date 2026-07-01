import { test } from '@playwright/test';

test.describe("Material site", async() => {
    test.beforeAll(async ({ page }) => {
        await test.step("Go to Playwright Page", async() => {
            await page.goto("https://playwrightvn.com");
        })
    })

    test.beforeEach(async ({ page }) =>{
        await test.step("Go to Material Page", async() => {
            await page.goto("https://material.playwrightvn.com/");
        });
    });

    test.afterEach(async ({ page }) => {
        await test.step("Go to Google.com", async() => {
            await page.goto("https://google.com");
        });
    });

    test.afterAll(async() => {
        await test.step("Kết thúc test suite", async() => {
            console.log("Tất cả đã xong");
        });
    });


    test("User Registration Page", async ({ page })=>{
        // await test.step("Go to Material Page", async() => {
        //     await page.goto("https://material.playwrightvn.com/");
        // });

        await test.step("Click to User Registration page", async() => {
            await page.locator('//a[@href="01-xpath-register-page.html"]').click();
        })
    });

    test("Product Page", async ({ page }) => {
        // await test.step("Go to Material Page", async () => {
        //     await page.goto("https://material.playwrightvn.com/");
        // });

        await test.step("Click Product Page", async () => {
            await page.locator('//a[@href="02-xpath-product-page.html"]').click();
        })
    })
});