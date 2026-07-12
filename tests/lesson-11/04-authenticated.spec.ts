import { test } from '@playwright/test';

test('Test API', async ({ request }) => {
    const baseUrl = 'https://material.playwrightvn.com/api/user-management/v1';

    // Login -> Token
    const loginResponse = await request.post(`${baseUrl}/login.php`, {
        data: {
            "email": "admin@example.com",
            "password": "password"
        }
    });

    const loginResponseJson = await loginResponse.json();
    const token =  loginResponseJson.data.token;

    // call API with token
    const userResponse = await request.get(`${baseUrl}/users.php`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const userResponseJson = await userResponse.json();
    console.log(userResponseJson);
});