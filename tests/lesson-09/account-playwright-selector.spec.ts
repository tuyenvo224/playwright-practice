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
        await page.getByRole('textbox', { name: 'Username or Email Address' }).fill("betterbytes.academy.admin");
        await page.getByRole('textbox', { name: 'Password' }).fill("StrongPass@BetterBytesAcademy");
        await page.getByRole('button', { name: 'Log In' }).click(); // đăng nhập bằng admin user

        await test.step("Click Users tab", async () => {
            await page.getByRole('link', { name: 'Users', exact: true }).click(); // Click tab Users
            await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible(); // verify Heading ""Users"" visible
            await expect(page.locator('#wpbody-content').getByRole('link', { name: 'Add User' })).toBeEnabled(); // verify Button ""Add User"" được enable
        });
    });

    test.afterEach("Login by admin & delete normal user", async ({ page }) => { // sau mỗi test case cần thực hiện test này: đăng nhập vào account admin và xoá account mới được tạo ra
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.getByRole('textbox', { name: 'Username or Email Address' }).fill("betterbytes.academy.admin");
        await page.getByRole('textbox', { name: 'Password' }).fill("StrongPass@BetterBytesAcademy");
        await page.getByRole('button', { name: 'Log In' }).click(); // đăng nhập vào account admin

        await page.getByRole('link', { name: 'Users', exact: true }).click(); // click Users tab
        await page.getByLabel('Search Users:').fill(userName); // search user name mới được tạo  //await page.getByRole('searchbox', { name: 'Search Users:'}).fill('userName');
        await page.getByRole('button', { name: 'Search Users' }).click(); // Click Search

        await page.getByRole('link', { name: userName }).hover(); // hove vào user name
        await page.getByRole('link', { name: 'Delete' }).click(); // click button delete

        await page.waitForLoadState('domcontentloaded'); // Sau khi click submitdelete, WordPress điều hướng sang trang confirm deletion -> chờ trang load xong
        const submitBtn = page.getByRole('button', { name: 'Confirm Deletion' });
        if (await submitBtn.isEnabled()) { // verify button Confirm Deletion có enable hay ko, nếu có enable
            await submitBtn.click(); // thì click button Confirm Deletion
        } else // Nếu button Confirm Deletion ko được enable 
        {
            await page.getByRole('radio', { name: 'Delete all content.' }).check(); // thì click option 1 // await page.getByLabel('Delete all content.').check();
            await submitBtn.click();
        } // sau đó button Confirm Deletion được enable và click nó

        await page.getByLabel('Search Users:').fill(userName); // search user name mới được delete
        await page.getByRole('button', { name: 'Search Users' }).click(); // click search
        await expect(page.getByText('No users found.')).toBeVisible(); // Verify user name đã được xóa
    });

    test("@ACC_001:Create account with editor permission", async ({ page }) => { // test case tạo user với quyền editor

        await test.step("Add new user with editor permission", async () => { // step 1: Add user
            await page.locator('#wpbody-content').getByRole('link', { name: 'Add User' }).click();
            await page.getByLabel('Username (required)').fill(userName); //await page.getByRole('textbox', { name: 'Username (required)'}).fill('userName')
            await page.getByLabel('Email (required)').fill(email);
            await expect(page.getByLabel('Email (required)')).toHaveValue(email);
            await page.getByLabel('First Name ').fill("E101");
            await page.getByLabel('Last Name ').fill("Tuyen");
            await page.getByLabel('Role').selectOption('editor'); // chọn quyền editor //  await page.getByRole('combobox', {name: 'Role'}).selectOption('editor')
            await page.getByRole('textbox', { name: 'Password' }).fill(psw);

            await page.getByRole('button', { name: 'Add User' }).click(); // Click btn Add User
            await expect(page.getByText('New user created. ')).toBeVisible(); // Verify User được tạo thành công

        });

        await test.step("Logout & Login with new account", async () => { // Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo
            await page.getByRole('menuitem', { name: /Howdy/ }).hover(); // hove vào góc trên bên phải // phần tử này có role tường minh trên cây DOM ( role = 'menuitem')
            await page.getByRole('menuitem', { name: 'Log Out' }).click(); // Click Log Out // await page.getByText('Log Out').click();

            await page.getByRole('textbox', { name: 'Username or Email Address' }).fill(userName);
            await page.getByRole('textbox', { name: 'Password' }).fill(psw);
            await page.getByRole('button', { name: 'Log In' }).click(); // Đăng nhập bằng user mới được tạo với quyền editor

            await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible(); // Verify user với quyền editor có quyền trên các tab
            await expect(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Media', exact: true })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Comments ', exact: true })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Tools' })).toBeVisible();

            await expect(page.getByRole('link', { name: 'Appearance' })).toBeHidden(); // Verify user với quyền editor ko có quyền trên các tab
            await expect(page.getByRole('link', { name: 'Plugins ' })).toBeHidden();
            await expect(page.getByRole('link', { name: 'Users' })).toBeHidden();

            await page.getByRole('menuitem', { name: /Howdy/ }).hover(); // hove vào góc trên bên phải 
            await page.getByRole('menuitem', { name: 'Log Out' }).click(); // Click Log Out // await page.getByText('Log Out').click();
        });
    });

    test("@ACC_002:Create account with subscriber permission", async ({ page }) => { // test case tạo user với quyền subscriber
        await test.step("Add new user with subscriber permission", async () => { // step 1: Add user
            await page.locator('#wpbody-content').getByRole('link', { name: 'Add User' }).click();
            await page.getByLabel('Username (required)').fill(userName);
            await page.getByLabel('Email (required)').fill(email);
            await page.getByLabel('First Name ').fill("E101");
            await page.getByLabel('Last Name ').fill("Tuyen");
            await page.getByLabel('Role').selectOption('Subscriber'); // chọn quyền Subscriber
            await page.getByRole('textbox', { name: 'Password' }).fill(psw);

            await page.getByRole('button', { name: 'Add User' }).click(); // Click btn Add User
            await expect(page.getByText('New user created. ')).toBeVisible(); // Verify User được tạo thành công

        });

        await test.step("Logout & Login with new account", async () => { // Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo
            await page.getByRole('menuitem', { name: /Howdy/ }).hover(); // hove vào góc trên bên phải
            await page.getByRole('menuitem', { name: 'Log Out' }).click(); // Click Log Out

            await page.getByRole('textbox', { name: 'Username or Email Address' }).fill(userName);
            await page.getByRole('textbox', { name: 'Password' }).fill(psw);
            await page.getByRole('button', { name: 'Log In' }).click(); // Đăng nhập bằng user mới được tạo với quyền Subscriber

            await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible(); // Verify user với quyền Subscriber có quyền trên các tab
            await expect(page.getByRole('link', { name: 'Profile', exact: true })).toBeVisible();

            await expect(page.getByRole('link', { name: 'Posts', exact: true })).toBeHidden(); // Verify user với quyền Subscriber ko có quyền trên các tab
            await expect(page.getByRole('link', { name: 'Media', exact: true })).toBeHidden();
            await expect(page.getByRole('link', { name: 'Pages', exact: true })).toBeHidden();
            await expect(page.getByRole('link', { name: 'Comments ', exact: true })).toBeHidden();
            await expect(page.getByRole('link', { name: 'Tools' })).toBeHidden();
            await expect(page.getByRole('link', { name: 'Appearance' })).toBeHidden();
            await expect(page.getByRole('link', { name: 'Plugins ' })).toBeHidden();
            await expect(page.getByRole('link', { name: 'Users' })).toBeHidden();

            await page.getByRole('menuitem', { name: /Howdy/ }).hover(); // hove vào góc trên bên phải
            await page.getByRole('menuitem', { name: 'Log Out' }).click(); // Click Log Out

        });
    });
});