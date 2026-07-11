import { expect, test } from '@playwright/test';
import { RegisterPage } from './pom/01-pom';


test('User Resistration', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await test.step('Navigate Material website', async () => {
        await registerPage.openMaterialPage();
    });

    await test.step('Click Bai hoc 1', async () => {
        await registerPage.gotoPage('Bài 1');
    });

    await test.step('Input user name', async () => {
        await registerPage.fillUsername('Tuyen Vo');
    });

    await test.step('Input email', async () => {
        await registerPage.fillEmail('tuyen@gmail.com');
    });

    await test.step('Select gender', async () => {
        await registerPage.checkGender('Nữ');
    });

    await test.step('Select hobbies', async () => {
        await registerPage.selectHobbies('traveling');
        await registerPage.selectHobbies('reading');
    });

    await test.step('Select interests', async () => {
        await registerPage.selectInterests('music');
    });

    await test.step('Select country', async () => {
        await registerPage.selectCountry('United Kingdom');
    });

    await test.step('Input birth date', async () => {
        await registerPage.inputDateOfBirth('1991-04-22');
    });

    await test.step('Upload profile picture', async () => {
        await registerPage.uploadProfilePicture('tests/lesson-10/data-test/clover.jpeg');
    });

    await test.step('Input biography', async () => {
        await registerPage.inputBiography('Playwright - Học automation test từ chưa biết gì. Học tất tần tật mọi thứ về automation test');
    });

    await test.step('Rating', async () => {
        await registerPage.Rating('10');
    });

    await test.step('Select favorite color', async () => {
        await registerPage.selectFavoriteColor('#ff00bb');
    });

    await test.step('Hover', async () => {
        await registerPage.hoverTooltip();
    });

    await test.step('Click subscribe', async () => {
        await registerPage.clickSubcribe();
    });

    await test.step('Enable feature', async () => {
        await registerPage.clickEnableFeature();
    });

    await test.step('Rating star', async () => {
        await registerPage.ratingStar(0.98);
    });

    // Chụp lại toàn bộ giá trị thực tế trên form NGAY TRƯỚC khi submit
    const expectedData = await registerPage.captureFormValues();

    await test.step('Click register', async () => {
        await registerPage.clickRegister();
    });

    await test.step('Verify registered info in table', async () => {
        const rowText = await registerPage.getLastRegisteredRowText();

        expect(rowText).toContain(expectedData.username.toLowerCase());
        expect(rowText).toContain(expectedData.email.toLowerCase());
        expect(rowText).toContain(`gender: ${expectedData.gender}`);
        expect(rowText).toContain(`hobbies: ${expectedData.hobbies.join(', ')}`);
        expect(rowText).toContain(`country: ${expectedData.country}`);
        expect(rowText).toContain(`date of birth: ${expectedData.dob}`);
        expect(rowText).toContain(`biography: ${expectedData.bio.toLowerCase()}`);
        expect(rowText).toContain(`rating: ${expectedData.rating}`);
        expect(rowText).toContain(`favorite color: ${expectedData.favcolor}`);
        expect(rowText).toContain(`newsletter: ${expectedData.newsletter ? 'yes' : 'no'}`);
        expect(rowText).toContain(`enable feature: ${expectedData.enableFeature ? 'yes' : 'no'}`);
        expect(rowText).toContain(`star rating: ${expectedData.starRating}`);
    });
});