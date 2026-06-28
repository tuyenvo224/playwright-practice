import { test } from '@playwright/test';

test ('User Resistration', async ({ page }) =>{
    await test.step('Navigate Material website', async() => {
        await page.goto("https://material.playwrightvn.com/");
    })

    await test.step('Click Bai hoc 1', async() => {
         await page.locator("//a[@href='01-xpath-register-page.html']").click();
    });

    await test.step('Input user name', async() => {
        await page.locator("//input[@id='username']").fill('Tuyen Vo');
    });

    await test.step('Input email', async() => {
        await page.locator("//input[@id='email']").fill('tuyen@gmail.com');
    });

    await test.step('Select gender', async() => {
        await page.locator("//input[@id='female']").check();
    });

    await test.step('Select hobbies', async() => {
        await page.locator("//input[@id='traveling']").check();
        await page.locator("//input[@id='reading']").check();
    });

    await test.step('Select interests', async() => {
        await page.locator("//select[@id='interests']").selectOption('music');
    });

    await test.step('Select country', async() => {
        await page.locator("//select[@id='country']").selectOption('United Kingdom');
    });

    await test.step('Input birth date', async() => {
        await page.locator("//input[@id='dob']").fill('1991-04-22');
    });

    await test.step('Upload profile picture', async() => {
        await page.locator("//input[@id='profile']").setInputFiles("tests/data-test/clover.jpeg");
    });

    await test.step('Input biography', async() => {
        await page.locator("//textarea[@id='bio']").fill('Playwright - Học automation test từ chưa biết gì. Học tất tần tật mọi thứ về automation test');
    });

    await test.step('Rating', async() => {
        await page.locator("//input[@id='rating']").fill('10');
    });
    
    await test.step('Select favorite color', async() =>{
        await page.locator("//input[@id='favcolor']").fill('#ff00bb');
    });

    await test.step('Hover', async() => {
        await page.locator("//div[@class='tooltip']").hover();
    });

    await test.step('Click subscribe', async() => {
        await page.locator("//input[@id='newsletter']").check();
    });

    await test.step('Enable feature', async() => {
        await page.locator("//span[@class='slider round']").click();
    });

    await test.step('Rating star', async() => {
    const starRating = page.locator("//div[@id='starRating']");
    const box = await starRating.boundingBox();
    // Click at 5th star position (98% from left)
    await starRating.click({ position: { x: box!.width * 0.98, y: box!.height / 2 } });
    });
    /*
    boundingBox() — lấy kích thước và vị trí thực tế của div #starRating trên màn hình (trả về { x, y, width, height }).
    click({ position: { x, y } }) — click vào tọa độ tương đối bên trong element:
    x = box.width * 0.98 → click ở 98% chiều ngang → tương đương ngôi sao thứ 5 (gần cuối)
    y = box.height / 2 → click ở giữa chiều dọc
    Tại sao 98%? — 5 sao chia đều → mỗi sao chiếm 20% width. Sao thứ 5 nằm ở vùng 80%-100%, nên 98% là điểm giữa của sao thứ 5.
    */

    await test.step('Click register', async() => {
        await page.locator("//button[@type='submit']").click();
    });

});