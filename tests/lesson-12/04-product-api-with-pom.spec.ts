import { test, expect } from "@playwright/test";
import { ProductApiPage } from "./03-product.api.page";

test('Get products', async ({ request }) => {
    const productAPIPage = new ProductApiPage(request);
    const reponseJson = await productAPIPage.getProducts();

    console.log(reponseJson.data.products.length);
    expect(reponseJson.data.products.length).toEqual(10);
});