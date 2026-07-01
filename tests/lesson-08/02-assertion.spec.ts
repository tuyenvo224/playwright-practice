import { test, expect } from '@playwright/test';

test("Demo expect", async () => {
    expect(1 + 2).toEqual(3);

    // Expecte array length
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);

    // Exxpect string contain
    const str = "Hello Viet Nam";
    expect(str).toContain("Nam");
});

test("Material Page", async({ page }) => {
    await page.goto("https://material.playwrightvn.com/");

    const title1 = await page.title();
    expect(title1).toContain("Playwright Việt Nam");

});

test("Material Page - non web first", async({ page }) => {
    await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html");

    const isVisible = await page.locator("//button[@type='submit']").isVisible();
    expect(isVisible).toEqual(true);

    const isEnable = await page.locator("//button[@type='submit']").isEnabled();
    expect(isEnable).toEqual(true);

    const isEnable1 = await page.locator("//button[@type='submit']").isEnabled();
    expect(isEnable1).toBe(true);

});

test("Material Page - non web first assertion", async({ page }) => {
    await page.goto("https://material.playwrightvn.com/019-enable-form.html");
    await page.waitForTimeout(10_000); // Sau khi vào trang web thì luôn chờ 10 giây rồi mới đi đến bước tiếp theo

    const isEnable2 = await page.locator("//button[@id='submitButton']").isEnabled();
    expect(isEnable2).toEqual(true);
});

test("Material Page - web first assertion", async({ page }) => {
    await page.goto("https://material.playwrightvn.com/019-enable-form.html");
    const sumbmitForm = page.locator("//button[@id='submitButton']");
    await expect(sumbmitForm).toBeEnabled({ timeout:10_000}); //Chờ tối đa là 10 giây nhưng nếu chưa tới 10 giây đã trả ra ok thì đi tiếp luôn
    // thời gian chờ tối đa mặc định là 5 giây nếu không truyền timeout vào
});

test("Material Page - web first assertion1", async({ page }) => {
    await page.goto("https://material.playwrightvn.com/019-enable-form.html");
    await expect(page.locator("//button[@id='submitButton']")).toBeEnabled({ timeout:10_000}); //Chờ tối đa là 10 giây nhưng nếu chưa tới 10 giây đã trả ra ok thì đi tiếp luôn
    // thời gian chờ tối đa mặc định là 5 giây nếu không truyền timeout vào
});


test("Material Page - demo to have class", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html");
    const classLocator = page.locator("//div[@id='ancestor']");
    await expect(classLocator).toHaveClass("container", { timeout:2_000 });
    //mặc định chờ 5 giây
});

test("Material Page - to have URL", async({ page }) => {
    await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html");
    await expect(page).toHaveURL("https://material.playwrightvn.com/01-xpath-register-page.html/123");
})