import { test } from '@playwright/test';

test ('Add products', async ({ page }) => {
    await test.step('Navigate Material website', async() =>{
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Click Bai hoc 2', async() => {
        await page.locator("//a[@href='02-xpath-product-page.html']").click();
    });

    await test.step('Add 2 product1', async() => {
        await page.locator("//button[@data-product-id='1']").click({clickCount:2});
    });

    await test.step('Add 3 product2', async() => {
        await page.locator("//button[@data-product-id='2']").click({clickCount:3});
    });

    await test.step('', async() => {
        await page.locator("//button[@data-product-id='3']").click({clickCount:1})
    });

});