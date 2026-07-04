import { test, expect } from '@playwright/test';

test.describe("ACCOUNT-Account", () => { // test suite: nhóm test case quyền user
    let userName: string;
    let psw: string;
    let email: string;

    test.beforeEach("Đã login trang with admin user", async ({ page }) => { // trước khi chạy mỗi test case thì cần thực hiện test này trước
        /* const userName ="E101-tuyen";
         * userName = "E101-tuyen-" + Math.floor(Math.random() * 10000);
         * psw = "Editor123456!@#!@";
         * email = "tuyen-" + Math.floor(Math.random() * 10000) + "@gmail.com";
         * 
         * Math.random() → sinh số thực ngẫu nhiên trong khoảng [0, 1) (ví dụ: 0.4837...).
         * Math.random() * 10000 → nhân với 10000 để scale thành khoảng [0, 10000) (ví dụ: 4837.xx).
         * Math.floor(...) → làm tròn xuống thành số nguyên (ví dụ: 4837). 
        */

        userName = `E101-tuyen-${Date.now()}`; //  `E101-tuyen-${suffix}`;
        email = `tuyen-${Date.now()}@gmail.com`;
        psw = "Editor123456!@#!@";
        // Date.now() an toàn hơn Math.random() vì gần như không bao giờ trùng, kể cả khi nhiều test chạy song song.

        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator('#user_login').fill("betterbytes.academy.admin");
        await page.locator('#user_pass').fill("StrongPass@BetterBytesAcademy");
        await page.locator('#wp-submit').click(); // đăng nhập bằng admin user

        await test.step("Click Users tab", async () => {
            await page.locator('#menu-users div.wp-menu-name').click(); // Click tab Users  // #menu-users .wp-menu-name
            await expect(page.locator("h1.wp-heading-inline")).toBeVisible(); // verify Heading ""Users"" visible
            await expect(page.locator('a.page-title-action')).toBeEnabled(); // verify Button ""Add User"" được enable
        });
    });

    test.afterEach("Login by admin & delete normal user", async ({ page }) => { // sau mỗi test case cần thực hiện test này: đăng nhập vào account admin và xoá account mới được tạo ra
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator('#user_login').fill("betterbytes.academy.admin");
        await page.locator('#user_pass').fill("StrongPass@BetterBytesAcademy");
        await page.locator('#wp-submit').click(); // đăng nhập vào account admin

        await page.locator('#menu-users div.wp-menu-name').click(); // click Users tab
        await page.locator('#user-search-input').fill(userName); // search user name mới được tạo
        await page.locator('#search-submit').click(); // Click Search

        await page.locator('td.username.column-username.has-row-actions.column-primary > strong').hover(); // hove vào user name
        await page.locator('a.submitdelete').click(); // click button delete

        await page.waitForLoadState('domcontentloaded'); // Sau khi click submitdelete, WordPress điều hướng sang trang confirm deletion -> chờ trang load xong
        const submitBtn = page.locator('#submit');
        if (await submitBtn.isEnabled()) { // verify button Confirm Deletion có enable hay ko, nếu có enable
            await submitBtn.click(); // thì click button Confirm Deletion
        } else // Nếu button Confirm Deletion ko được enable 
        {
            await page.locator('#delete_option0').click(); // thì click option 1
            await submitBtn.click();
        } // sau đó button Confirm Deletion được enable và click nó

        await page.locator('#user-search-input').fill(userName); // search user name mới được delete
        await page.locator('#search-submit').click(); // click search
        await expect(page.locator('td.colspanchange')).toHaveText('No users found.'); // Verify user name đã được xóa
    });

    test("@ACC_001:Create account with editor permission", async ({ page }) => { // test case tạo user với quyền editor

        await test.step("Add new user with editor permission", async () => { // step 1: Add user
            await page.locator('.page-title-action').click();
            await page.locator('#user_login').fill(userName);
            await page.locator('#email').fill(email);
            await page.locator('#first_name').fill("E101");
            await page.locator('#last_name').fill("Tuyen");
            await page.locator('#role').selectOption('editor'); // chọn quyền editor
            await page.locator('#pass1').fill(psw);

            await page.locator('#createusersub').click(); // Click btn Add User
            await expect(page.locator('#message>p')).toContainText('New user created.') // Verify User được tạo thành công

        });

        await test.step("Logout & Login with new account", async () => { // Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo
            await page.locator('#wp-admin-bar-my-account > a.ab-item > span.display-name').hover(); // hove vào góc trên bên phải
            await page.locator('#wp-admin-bar-logout > a.ab-item').click(); // Click Log Out

            await page.locator('#user_login').fill(userName);
            await page.locator('#user_pass').fill(psw);
            await page.locator('#wp-submit').click(); // Đăng nhập bằng user mới được tạo với quyền editor

            await expect(page.locator('#menu-dashboard .wp-menu-name')).toBeVisible(); // Verify user với quyền editor có quyền trên các tab
            await expect(page.locator('#menu-posts .wp-menu-name')).toBeVisible();
            await expect(page.locator('#menu-media .wp-menu-name')).toBeVisible();
            await expect(page.locator('#menu-pages .wp-menu-name')).toBeVisible();
            await expect(page.locator('#menu-comments .wp-menu-name')).toBeVisible();
            await expect(page.locator('#menu-users .wp-menu-name')).toHaveText('Profile');
            await expect(page.locator('#menu-tools .wp-menu-name')).toBeVisible();

            await expect(page.locator('#menu-appearance .wp-menu-name')).toBeHidden(); // Verify user với quyền editor ko có quyền trên các tab
            await expect(page.locator('#menu-plugins .wp-menu-name')).toBeHidden();
            await expect(page.locator('#menu-users .wp-menu-name')).not.toHaveText('Users');

            await page.locator('#wp-admin-bar-my-account > a.ab-item > span.display-name').hover(); // hove vào góc trên bên phải
            await page.locator('#wp-admin-bar-logout > a.ab-item').click(); // Click Log Out

        });
    });

    test("@ACC_002:Create account with subscriber permission", async ({ page }) => { // test case tạo user với quyền subscriber
        await test.step("Add new user with subscriber permission", async () => { // step 1: Add user
            await page.locator('.page-title-action').click();
            await page.locator('#user_login').fill(userName);
            await page.locator('#email').fill(email);
            await page.locator('#first_name').fill("E101");
            await page.locator('#last_name').fill("Tuyen");
            await page.locator('#role').selectOption('Subscriber'); // chọn quyền Subscriber
            await page.locator('#pass1').fill(psw);

            await page.locator('#createusersub').click(); // Click btn Add User
            await expect(page.locator('#message>p')).toContainText('New user created.') // Verify User được tạo thành công

        });

        await test.step("Logout & Login with new account", async () => { // Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo
            await page.locator('#wp-admin-bar-my-account > a.ab-item > span.display-name').hover(); // hove vào góc trên bên phải
            await page.locator('#wp-admin-bar-logout > a.ab-item').click(); // Click Log Out

            await page.locator('#user_login').fill(userName);
            await page.locator('#user_pass').fill(psw);
            await page.locator('#wp-submit').click(); // Đăng nhập bằng user mới được tạo với quyền Subscriber

            await expect(page.locator('#menu-dashboard .wp-menu-name')).toBeVisible(); // Verify user với quyền Subscriber có quyền trên các tab
            await expect(page.locator('#menu-users .wp-menu-name')).toHaveText('Profile');

            await expect(page.locator('#menu-posts .wp-menu-name')).toBeHidden(); // Verify user với quyền Subscriber ko có quyền trên các tab
            await expect(page.locator('#menu-media .wp-menu-name')).toBeHidden();
            await expect(page.locator('#menu-pages .wp-menu-name')).toBeHidden();
            await expect(page.locator('#menu-comments .wp-menu-name')).toBeHidden();
            await expect(page.locator('#menu-tools .wp-menu-name')).toBeHidden();
            await expect(page.locator('#menu-appearance .wp-menu-name')).toBeHidden();
            await expect(page.locator('#menu-plugins .wp-menu-name')).toBeHidden();
            await expect(page.locator('#menu-users .wp-menu-name')).not.toHaveText('Users');

            await page.locator('#wp-admin-bar-my-account > a.ab-item > span.display-name').hover(); // hove vào góc trên bên phải
            await page.locator('#wp-admin-bar-logout > a.ab-item').click(); // Click Log Out

        });
    });
});