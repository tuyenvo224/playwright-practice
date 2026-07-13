import { expect, test } from '@playwright/test';
import { UserApiPage } from './pom/01-user.api.page';

test.describe('Create user success', () => {
    let userId: any;
    let userApiPage: UserApiPage;


    test.beforeEach('Đã đăng nhập vào tài khoản admin', async ({ request }) => {
        userApiPage = new UserApiPage(request);

        await userApiPage.login('admin@example.com','password');
    });

    test.afterEach('Xóa user đã tạo', async ({ request }) => {
        const deleteResponseJson = await userApiPage.deleteUser(userId);
        console.log(deleteResponseJson);
    });

    test('Create user success', async ({ request }) => {
        let userName: string;
        let email: string;

        await test.step('Create user', async () => {
            userName = `E101-tuyen-${Date.now()}`;
            email = `tuyen-${Date.now()}@gmail.com`;
            const createResponseJson =  await userApiPage.createUser(userName,email,'password','https://facebook.com/newuser','https://i.pravatar.cc/150?img=20','Reading, Coding','user');
            console.log(createResponseJson);

            userId = await createResponseJson.user.id;

            // Verify tạo user thành công (có thông tin user mới tạo ra được trả về)
            expect(createResponseJson.user.name).toContain(userName);
            expect(createResponseJson.user.email).toContain(email);
        });

        await test.step('Lấy danh sách user', async() => {
            const listResponseJson = await userApiPage.getUsersList();
            //console.log(listResponseJson);

            const users = listResponseJson.users;

            // Verify user vừa tạo ra nằm trong danh sách user

            // Cách 1 — dùng .some() để kiểm tra có tồn tại user khớp cả name và email
            const isUserFound  = users.some((u:any) => u.name === userName && u.email === email && u.id === userId);
            expect(isUserFound).toBe(true);

            // Cách 2 — map ra mảng riêng rồi dùng toContain
            const userNames = users.map((u:any) => u.name);
            const userEmails = users.map((u:any) => u.email);

            expect(userNames).toContain(userName);
            expect(userEmails).toContain(email);

        });
    });
});