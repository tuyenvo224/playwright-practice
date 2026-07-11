import { test } from '@playwright/test';
import { MyLoginPage } from './pom/04-pom-demo';

test('Login success', async ({ page }) =>{
    const loginPage = new MyLoginPage(page) // khởi tạo đối tượng loginPage có kiểu dữ liệu là MyLoginPage

    await test.step("Login page", async () => {
        await loginPage.page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin"); 
        // dùng đối tượng loginPage để truy cập vào thuộc tính page
    });

    await test.step("Fill user name", async () => {
        await loginPage.fillUserName('betterbytes.academy.admin'); 
        // dùng đối tượng loginPage để truy cập vào các phương thức 
        // nhấn ctr+click ==> đi vào file pom, nhấn ctrl+tab để back về lại file này
    });

    await test.step("Fill password", async () => {
        await loginPage.fillPassword('StrongPass@BetterBytesAcademy');
    });

    await test.step("Click Login", async () => {
        await loginPage.clickLogin();
        await loginPage.verifySucces('Dashboard');
    });
});

test('Login fail', async ({ page }) =>{
    const loginPage = new MyLoginPage(page);

    await test.step("Login page", async () => {
        await loginPage.page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
    });

    await test.step("Fill user name", async () => {
        await loginPage.fillUserName('betterbytes.academy.admin');
    });

    await test.step("Fill password", async () => {
        await loginPage.fillPassword('StrongPass@BetterBytesAcademy123');
    });

    await test.step("Click Login", async () => {
        await loginPage.clickLogin();
        await loginPage.verifyFail();
    });
});