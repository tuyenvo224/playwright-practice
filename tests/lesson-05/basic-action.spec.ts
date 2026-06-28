import { test } from '@playwright/test';
 
test ('Test case 1', async ({ page }) => {
   await test.step('Step Navigate Material website', async() => {
    // code test
    await page.goto("https://material.playwrightvn.com/");
   });

   await test.step('Step Click Lesson 1', async() => {
    await page.locator("//a[text()='Bài học 1: Register Page (có đủ các element)']").click();
   });

   await test.step('Step Input', async() => {
     await page.locator("//input[@id='username']").fill("Tuyen Vo");
     await page.locator("//input[@id='email']").pressSequentially("tuyen@gmail.com", { delay: 1_00 });
   });

   await test.step('Step Radio button/ Checkbox', async() => {
     let isCheckedMale = await page.locator("//input[@id='male']").isChecked();
     console.log(isCheckedMale);

     await page.locator("//input[@id='male']").check();
     isCheckedMale = await page.locator("//input[@id='male']").isChecked();
     console.log(isCheckedMale);
   });

   await test.step('Step Select option', async() => {
     await page.locator("//select[@id='country']").selectOption('Canada');
   });

   await test.step('Step Upload file', async() => {
     await page.locator("//input[@id='profile']").setInputFiles("tests/data-test/data-test.txt");
   });
});