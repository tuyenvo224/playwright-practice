import { test } from '@playwright/test';

test ('Ex5', async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/");
    await page.click("//a[@href='03-xpath-todo-list.html']");
    await page.locator("//input[@id='new-task']").fill("Learn Playwright");
    await page.locator("//button[@id='add-task']").click();

    /* Để xử lý dialog thì sẽ dùng sự kiện on dialog, tức là nếu dialog xảy ra tôi sẽ làm gì với dialog ấy
    // Sự kiện dialog phải được setup trước khi sự kiện trigger cái dialog nó hiện ra, 
    // tức là cái sự kiện on dialog được viết trước cái sự kiện trigger button delete
    */

    page.on('dialog', async dialog => dialog.accept()); // Nhấn OK trên dialog Delete
    await page.click("//button[text()='Delete']");

    // page.on('dialog', async dialog => dialog.dismiss()); // Nhấn Cancel trên dialog Delete
    // await page.click("//button[text()='Delete']");
})