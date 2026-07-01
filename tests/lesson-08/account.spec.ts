import { test, expect } from '@playwright/test';

test.describe("ACCOUNT-Account", () => { // test suite: nhóm test case quyền user
    // const userName ="E101-tuyen";
    const userName = "E101-tuyen-" + Math.floor(Math.random() * 10000);
    const email = "tuyen-" + Math.floor(Math.random() * 10000) + "@gmail.com";
    // Math.random() → sinh số thực ngẫu nhiên trong khoảng [0, 1) (ví dụ: 0.4837...).
    // Math.random() * 10000 → nhân với 10000 để scale thành khoảng [0, 10000) (ví dụ: 4837.xx).
    // Math.floor(...) → làm tròn xuống thành số nguyên (ví dụ: 4837).

    const psw = "Editor123456!@#!@";

    test.beforeEach("Đã login trang with admin user", async ({ page }) => { // trước khi chạy mỗi test case thì cần thực hiện test này trước
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator("//input[@id='user_login']").fill("betterbytes.academy.admin");
        await page.locator("//input[@id='user_pass']").fill("StrongPass@BetterBytesAcademy");
        await page.locator("//input[@id='wp-submit']").click(); // đăng nhập bằng admin user

        await test.step("Click Users tab", async () => {
            await page.locator("//div[text()='Users']").click(); // Click tab Users
            await expect(page.locator("//h1[@class='wp-heading-inline']")).toBeVisible(); // verify Heading ""Users"" visible
            await expect(page.locator("//a[@class='page-title-action']")).toBeEnabled(); // verify Button ""Add User"" được enable
        });
    });

    test.afterEach("Login by admin & delete normal user", async ({ page }) => { // sau mỗi test case cần thực hiện test này: đăng nhập vào account admin và xoá account mới được tạo ra
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator("//input[@id='user_login']").fill("betterbytes.academy.admin");
        await page.locator("//input[@id='user_pass']").fill("StrongPass@BetterBytesAcademy");
        await page.locator("//input[@id='wp-submit']").click(); // đăng nhập vào account admin

        await page.locator("//div[text()='Users']").click(); // click Users tab
        await page.locator("//input[@id='user-search-input']").fill(userName); // search user name mới được tạo
        await page.locator("//input[@id='search-submit']").click(); // Click Search

        await page.locator("//td[@class='username column-username has-row-actions column-primary']/child::strong").hover(); // hove vào user name
        await page.locator("//a[@class='submitdelete']").click(); // click button delete

        await page.waitForLoadState('domcontentloaded'); // Sau khi click submitdelete, WordPress điều hướng sang trang confirm deletion -> chờ trang load xong
        const submitBtn = page.locator("//input[@id='submit']");
        if (await submitBtn.isEnabled()) { // verify button Confirm Deletion có enable hay ko, nếu có enable
            await submitBtn.click(); // thì click button Confirm Deletion
        } else // Nếu button Confirm Deletion ko được enable 
        {
            await page.locator("//input[@id='delete_option0']").click(); // thì click option 1
            await submitBtn.click();
        } // sau đó button Confirm Deletion được enable và click nó

        await page.locator("//input[@id='user-search-input']").fill(userName); // search user name mới được delete
        await page.locator("//input[@id='search-submit']").click(); // click search
        await expect(page.locator("//td[@class='colspanchange']")).toHaveText('No users found.'); // Verify user name đã được xóa
    });

    test("@ACC_001:Create account with editor permission", async ({ page }) => { // test case tạo user với quyền editor

        await test.step("Add new user with editor permission", async () => { // step 1: Add user
            await page.locator("//a[@class='page-title-action']").click();
            await page.locator("//input[@id='user_login']").fill(userName);
            await page.locator("//input[@id='email']").fill(email);
            await page.locator("//input[@id='first_name']").fill("E101");
            await page.locator("//input[@id='last_name']").fill("Tuyen");
            await page.locator("//select[@id='role']").selectOption('editor'); // chọn quyền editor
            await page.locator("//input[@id='pass1']").fill(psw);

            await page.locator("//input[@id='createusersub']").click(); // Click btn Add User
            await expect(page.locator("//div[@id='message']/child::p")).toContainText('New user created.') // Verify User được tạo thành công

        });

        await test.step("Logout & Login with new account", async () => { // Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo
            await page.locator("//img[@class='avatar avatar-26 photo']/preceding-sibling::span").hover(); // hove vào góc trên bên phải
            await page.locator("//a[text()='Log Out']").click(); // Click Log Out

            await page.locator("//input[@id='user_login']").fill(userName);
            await page.locator("//input[@id='user_pass']").fill(psw);
            await page.locator("//input[@id='wp-submit']").click(); // Đăng nhập bằng user mới được tạo với quyền editor

            await expect(page.locator("//div[text()='Dashboard']")).toBeVisible(); // Verify user với quyền editor có quyền trên các tab
            await expect(page.locator("//div[text()='Posts']")).toBeVisible();
            await expect(page.locator("//div[text()='Media']")).toBeVisible();
            await expect(page.locator("//div[text()='Pages']")).toBeVisible();
            await expect(page.locator("//div[text()='Comments ']")).toBeVisible();
            await expect(page.locator("//div[text()='Profile']")).toBeVisible();
            await expect(page.locator("//div[text()='Tools']")).toBeVisible();

            await expect(page.locator("//div[text()='Appearance']")).toBeHidden(); // Verify user với quyền editor ko có quyền trên các tab
            await expect(page.locator("//div[text()='Plugins ']")).toBeHidden();
            await expect(page.locator("//div[text()='Users']")).toBeHidden();

            await page.locator("//img[@class='avatar avatar-26 photo']/preceding-sibling::span").hover(); // hove vào góc trên bên phải
            await page.locator("//a[text()='Log Out']").click(); // Click Log Out

        });
    });

    test("@ACC_002:Create account with subscriber permission", async ({ page }) => { // test case tạo user với quyền subscriber
        await test.step("Add new user with subscriber permission", async () => { // step 1: Add user
            await page.locator("//a[@class='page-title-action']").click();
            await page.locator("//input[@id='user_login']").fill(userName);
            await page.locator("//input[@id='email']").fill(email);
            await page.locator("//input[@id='first_name']").fill("E101");
            await page.locator("//input[@id='last_name']").fill("Tuyen");
            await page.locator("//select[@id='role']").selectOption('Subscriber'); // chọn quyền Subscriber
            await page.locator("//input[@id='pass1']").fill(psw);

            await page.locator("//input[@id='createusersub']").click(); // Click btn Add User
            await expect(page.locator("//div[@id='message']/child::p")).toContainText('New user created.') // Verify User được tạo thành công

        });

        await test.step("Logout & Login with new account", async () => { // Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo
            await page.locator("//img[@class='avatar avatar-26 photo']/preceding-sibling::span").hover(); // hove vào góc trên bên phải
            await page.locator("//a[text()='Log Out']").click(); // Click Log Out

            await page.locator("//input[@id='user_login']").fill(userName);
            await page.locator("//input[@id='user_pass']").fill(psw);
            await page.locator("//input[@id='wp-submit']").click(); // Đăng nhập bằng user mới được tạo với quyền Subscriber

            await expect(page.locator("//div[text()='Dashboard']")).toBeVisible(); // Verify user với quyền Subscriber có quyền trên các tab
            await expect(page.locator("//div[text()='Profile']")).toBeVisible();

            await expect(page.locator("//div[text()='Posts']")).toBeHidden(); // Verify user với quyền Subscriber ko có quyền trên các tab
            await expect(page.locator("//div[text()='Media']")).toBeHidden();
            await expect(page.locator("//div[text()='Pages']")).toBeHidden();
            await expect(page.locator("//div[text()='Comments ']")).toBeHidden();
            await expect(page.locator("//div[text()='Tools']")).toBeHidden();
            await expect(page.locator("//div[text()='Appearance']")).toBeHidden();
            await expect(page.locator("//div[text()='Plugins ']")).toBeHidden();
            await expect(page.locator("//div[text()='Users']")).toBeHidden();

            await page.locator("//img[@class='avatar avatar-26 photo']/preceding-sibling::span").hover(); // hove vào góc trên bên phải
            await page.locator("//a[text()='Log Out']").click(); // Click Log Out

        });
    });
});