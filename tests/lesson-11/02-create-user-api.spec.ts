import { expect, request, test } from '@playwright/test';

test.describe('Create user success', () => {
    const baseUrl = 'https://material.playwrightvn.com/api/user-management/v1';
    let adminToken: any;
    let userId: any;

    test.beforeEach('Đã đăng nhập vào tài khoản admin', async ({ request }) => {
        const loginResponse = await request.post(`${baseUrl}/login.php`, {
            data: {
                "email": "admin@example.com",
                "password": "password"
            }
        });
        expect(loginResponse.status()).toBe(200);

        const loginResponseJson = await loginResponse.json();
        adminToken = loginResponseJson.data.token;
        //console.log(adminToken);
    });

    test.afterEach('Xóa user đã tạo', async ({ request }) => {
        const deleteResponse = await request.delete(`${baseUrl}/users.php`, {
            headers: {
                authorization: `Bearer ${adminToken}`
            },
            data: {
                "id": userId
            }
        });
        const deleteResponseJson = await deleteResponse.json();
        //console.log(deleteResponseJson);

        // Verify xóa user thành công (status code =200) 
        expect(deleteResponse.status()).toBe(200);
    });

    test('Create user success', async ({ request }) => {
        let userName: string;
        let email: string;

        await test.step('Create user', async () => {
            userName = `E101-tuyen-${Date.now()}`;
            email = `tuyen-${Date.now()}@gmail.com`;

            const createResponse = await request.post(`${baseUrl}/users.php`, {
                data: {
                    "name": userName,
                    "email": email,
                    "password": "password",
                    "facebook": "https://facebook.com/newuser",
                    "avatar": "https://i.pravatar.cc/150?img=20",
                    "hobbies": "Reading, Coding",
                    "role": "user"
                },
                headers: {
                    authorization: `Bearer ${adminToken}`
                }
            });

            const createResponseJson = await createResponse.json();
            //console.log(createResponseJson);

            userId = await createResponseJson.user.id;

            // Verify tạo user thành công (status code =201)  
            expect(createResponse.status()).toBe(201);

            // Verify tạo user thành công (có thông tin user mới tạo ra được trả về)
            expect(createResponseJson.user.name).toContain(userName);
            expect(createResponseJson.user.email).toContain(email);
        });

        await test.step('Lấy danh sách user', async() => {
            const listResponse = await request.get(`${baseUrl}/users.php`, {
                headers: {
                    authorization: `Bearer ${adminToken}`
                }
            });
            const listResponseJson = await listResponse.json();
            //console.log(listResponseJson);

            // Verify lấy danh sách user thành công
            expect(listResponse.status()).toBe(200);

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