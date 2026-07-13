// Create POM
import { APIRequestContext, expect } from "@playwright/test";

export class ProductApiPage {
    // Thêm thuộc tính request
    request: APIRequestContext;
    baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = "https://material.playwrightvn.com/api/product-catalog/v1";
    }
    // Add method getProducts
    async getProducts() {
        // Call API
        const response = await this.request.get(`${this.baseUrl}/products.php`);
        // Verify status code
        expect(response.status()).toBe(200);

        const reponseJson = await response.json();
        return reponseJson;
    }
}