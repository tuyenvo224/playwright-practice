import { expect, test } from '@playwright/test';

test('Login success', async ({ request }) => {
    const baseURL = 'https://material.playwrightvn.com/api/user-management/v1';
    await test.step('Login by admin user', async () => {

        // Login -> Token
        const loginResponse = await request.post(`${baseURL}/login.php`, {
            data: {
                "email": "admin@example.com",
                "password": "password"
            }
        });
        // Verify đăng nhập thành công (status code = 200)
        expect(loginResponse.status()).toBe(200);
        const loginReponseJson = await loginResponse.json();
        // console.log(loginReponseJson);

        const token = loginReponseJson.data.token;
        // console.log(token);

        // Verify có token trả về
        expect(token).toBeTruthy();
    });

    await test.step('Login by normal user', async () => {

        // Login -> Token
        const loginResponse = await request.post(`${baseURL}/login.php`, {
            data: {
                "email": "john@example.com",
                "password": "password"
            }
        });
        // Verify đăng nhập thành công (status code = 200)
        expect(loginResponse.status()).toBe(200);
        const loginResponseJson = await loginResponse.json();
        // console.log(loginResponseJson);

        const token = loginResponseJson.data.token;
        // console.log(token);

        // Verify có token trả về
        expect(token).toBeTruthy();
    });
});