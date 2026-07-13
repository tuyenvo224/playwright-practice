import { expect, test } from '@playwright/test';
import { UserApiPage } from './pom/01-user.api.page';

test('Login success', async ({ request }) => {
    const userApiPage = new UserApiPage(request);

    await test.step('Login by admin user', async () => {
        const loginReponseJson = await userApiPage.login('admin@example.com','password')
        // console.log(loginReponseJson);

        const token = loginReponseJson.data.token;
        // console.log(token);

        // Verify có token trả về
        expect(token).toBeTruthy();
    });

    await test.step('Login by normal user', async () => {
        const loginResponseJson = await userApiPage.login('john@example.com','password')
        // console.log(loginResponseJson);

        const token = loginResponseJson.data.token;
        // console.log(token);

        // Verify có token trả về
        expect(token).toBeTruthy();
    });
});