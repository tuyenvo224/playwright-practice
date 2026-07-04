// Link tham khảo: https://playwright.dev/docs/locators
import { test } from '@playwright/test';

test("Demo Playwright Selector", async({ page }) => {
    await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html");
    const title1 = await page.locator("//h1[@id='self']").textContent();
    const title2 = await page.getByRole("heading", {name:"User Registration"}).textContent();

    await page.getByRole("checkbox", {name:"Traveling"}).check();
    await page.getByRole("checkbox", {name: "cooking"}).check();
    await page.getByRole("radio", {name:"Male", exact:true}).click();

    console.log(title1);
    console.log(title2);

    await page.getByLabel("Username").fill("hihi");
});

test("Demo Playwright Selector -2", async({ page }) => {
    await page.goto("https://material.playwrightvn.com/12-dom-nested.html");
    const text = await page.getByRole("listitem").filter({hasText:"ho"}).count();

    console.log(text);

})



test ("Demo2 Playwright Selector", async({ page }) => {
    await page.goto("https://material.playwrightvn.com/04-xpath-personal-notes.html");
    const title3 = await page.getByRole("heading", {name:"Personal Notes"}).textContent();

    console.log(title3);
});