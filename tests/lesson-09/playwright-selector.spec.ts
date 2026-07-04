// https://material.playwrightvn.com/03-playwright-selectors.html

import { test, expect } from '@playwright/test';

test.describe("Playwright selector demo tests", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://material.playwrightvn.com/03-playwright-selectors.html');
    });

    test('Get by role', async ({ page }) => {
        // role = Button
        await page.getByRole('button', { name: 'Submit Form' }).click();
        await page.getByRole('button', { name: 'Save Changes' }).click();
        await page.getByRole('button', { name: 'Delete Item' }).click();
        // await page.getByRole('button', { name: 'Disabled Button' }).click(); // disabled button

        // role = Link
        await page.getByRole('link', { name: 'Home', exact: true }).click(); // extract true
        await page.getByRole('link', { name: 'About Us' }).click();
        await page.getByRole('link', { name: 'Services' }).click();
        await page.getByRole('link', { name: 'Contact' }).click();

        // role = Heading
        const text1 = await page.getByRole('heading', { name: 'Main Title H1', level: 1 }).textContent();
        console.log(text1);
        const text2 = await page.getByRole('heading', { name: 'Section Title H2' }).textContent();
        console.log(text2);
        const text3 = await page.getByRole('heading', { name: 'Subsection Title H3' }).textContent();
        console.log(text3);

        // role = Checkbox & radio
        await page.getByRole('checkbox', { name: 'I agree to Terms of Service' }).click();
        await page.getByRole('radio', { name: 'Credit Card' }).click();

        // role = Text box
        // await page.getByRole('textbox', { name: 'Search products' }).fill("hello");
        await page.getByRole('textbox', { name: 'Search products', exact: true }).fill("HocTest.Com"); // match with name & placeholder

        // role = combobox
        await page.getByRole('combobox', { name: 'Country selection' }).selectOption("Vietnam");

       // Table (role="table", "row", "cell")
        const table = await page.getByRole('table', { name: 'User data table' }).textContent();
        console.log(table);

        const row = await page.getByRole('row', { name: /John Doe/ }).textContent();
        console.log(row);

        const text = await page.getByRole('cell', { name: /john@/ }).textContent();
        console.log(text);

    });

    test('Get by text', async ({ page }) => {

    // Get by text = tìm kiếm theo text hiển thị
    /**
     * <div>HocTest<span>.Com</span></div>
     * <div>HocTest</div>
     *
     * // Matches <span>
     * page.getByText('.Com');
     *
     * // Matches first <div>
     * page.getByText('HocTest.Com');
     *
     * // Matches second <div>
     * page.getByText('HocTest', { exact: true });
     *
     * // Matches both <div>s
     * page.getByText(/HocTest/);
     *
      * // Matches second <div>
     * page.getByText(/^hoctest$/i); = case insensitive
     *
     * - Lưu ý:
     * - GetByText sẽ luôn normalize space trước khi tìm, nghĩa là nếu có > 2 khoảng trắng -> sẽ giảm còn 1 khoảng trắng
     * - Input với type là "button" hoặc "submit" sẽ luôn tìm theo "value" chứ không phải text content
     *      VD:
     *          selector: page.getByText("Login");
     *          sẽ match với dom: <input type=button value="Log in">
     *
     */
    
      await page.getByText("HocTest.Com").click();
      await page.getByText("HocTest", { exact:true }).click();
      // await page.getByText("HocTestCom").click(); // sẽ fail case này do ko tìm thấy text nào có "HocTestCom"
      await page.getByText("PlaywrightVN .Com").click();
        await page.getByText("PlaywrightVN", { exact: true }).click();

        await page.getByText("Log in").click();
        await page.getByText("Log me in").click();
    });

    test('Get by label', async ({ page }) => {
        
        await page.getByLabel('full Name').fill("Heyyy"); 
        await page.getByLabel('password').first().fill("strongpassword"); // nhập text vào ô password thứ 1
        await page.getByLabel('password').last().fill("strongpassword"); // nhập text vào ô password thứ 2
        // await page.getByLabel('Password').nth(0).fill("strongpassword"); // nhập text vào ô password thứ 1
        // await page.getByLabel('Password').nth(1).fill("strongpassword"); // nhập text vào ô password thứ 2
/*
 * Allows locating input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the
 * `aria-label` attribute.
 *
 * **Usage**
 *
 * For example, this method will find inputs by label "Username" and "Password" in the following DOM:
 *
 * ```html
 * <input aria-label="Username">
 * <label for="password-input">Password:</label>
 * <input id="password-input">
 * ```
 *
 * ```js
 * await page.getByLabel('Username').fill('john');
 * await page.getByLabel('Password').fill('secret');
 * ```
 *
 */
    });

   test('Get by AltText', async ({ page }) => {
        await page.getByAltText('Product 1 - Laptop').click();
        await page.getByAltText(/Smartphone/).click();
 /*
 * Allows locating elements by their alt text.
 *
 * **Usage**
 *
 * For example, this method will find the image by alt text "Playwright logo":
 *
 * ```html
 * <img alt='Playwright logo'>
 * ```
 *
 * ```js
 * await page.getByAltText('Playwright logo').click();
 * ```
 */
    });

    test('Get ByTitle', async ({ page }) => {
        await page.getByTitle('Click to save your changes').click();
        await page.getByTitle(/additional information/).click();
    });
});