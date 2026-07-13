import { Locator, Page } from "@playwright/test";

export class MaterialPage {
    page: Page;
    bai1Loc: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bai1Loc = this.page.locator("//a[contain(text(), 'Register'");
    };

    async clickLesson(name: string) {
        if (name === 'bai_1') {
            await this.bai1Loc.click();
        }
    }
};