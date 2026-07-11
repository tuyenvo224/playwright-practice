import { expect, test } from '@playwright/test';
import { ProductPage } from './pom/01-pom';

test('Add products', async ({ page }) => {
    const productPage = new ProductPage(page);

    const expectedQuantities: Record<string, number> = {
        'Product 1': 2,
        'Product 2': 3,
        'Product 3': 1,
    }

    await test.step('Navigate Material website', async () => {
        await productPage.openMaterialPage();
    });

    await test.step('Click Bai hoc 2', async () => {
        await productPage.gotoPage('Bài 2');
    });

    await test.step('Add 2 product1', async () => {
        await productPage.addProduct1(2);
    });

    await test.step('Add 3 product2', async () => {
        await productPage.addProduct2(3);
    });

    await test.step('', async () => {
        await productPage.addProduct3(1);
    });

    await test.step('Verify cart quantities', async () => {
        const cartItems = await productPage.getCartItems();

        expect(cartItems.length).toBe(3);

        for (const item of cartItems) {
            expect(item.quantity).toBe(expectedQuantities[item.name]);
        }
    });

    await test.step('Verify total price', async () => {
        const cartItems = await productPage.getCartItems();
        // console.log(cartItems);

        // Kiểm tra chéo: Total của từng dòng phải bằng Price x Quantity
        for (const item of cartItems) {
            expect(item.total).toBeCloseTo(item.price * item.quantity, 2);
        }

        // Tính tổng tất cả các dòng rồi so sánh với Total Price hiển thị cuối bảng
        const expectedTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
        const actualTotal = await productPage.getCartTotalPrice();

        expect(actualTotal).toBeCloseTo(expectedTotal, 2);
    });
});