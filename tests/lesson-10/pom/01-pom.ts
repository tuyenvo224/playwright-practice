import { Locator, Page } from "@playwright/test";

export class MaterialBasePage {
    page: Page;
    xpathRegisterPage: string = "//a[@href='01-xpath-register-page.html']";
    xpathProductPage: string = "//a[@href='02-xpath-product-page.html']";
    xpathTodoPage: string = "//a[@href='03-xpath-todo-list.html']";
    personalNote: Locator;

    constructor(page: Page) {
        this.page = page;
        this.personalNote = this.page.locator("//a[@href='04-xpath-personal-notes.html']");
    }

    async openMaterialPage() {
        await this.page.goto("https://material.playwrightvn.com/");
    }

    async gotoPage(pageName: string) {
        if (pageName === 'Bài 1') {
            await this.page.locator(this.xpathRegisterPage).click();
        } else
            if (pageName === 'Bài 2') {
                await this.page.locator(this.xpathProductPage).click();
            } else
                if (pageName === "Bài 3") {
                    await this.page.locator(this.xpathTodoPage).click();
                } else
                    if (pageName === 'Bài 4') {
                        await this.personalNote.click();
                    }

    }
};

export class RegisterPage extends MaterialBasePage {
    xpathUsername: string = "//input[@id='username']";
    xpathEmail: string = "//input[@id='email']";
    xpathGenderMale: string = "//input[@id='male']";
    xpathGenderFemale: string = "//input[@id='female']";
    xpathRegisterButton: string = "//button[@type='submit']";
    xpathHobbiesTraveling: string = "//input[@id='traveling']";
    xpathHobbiesCooking: string = "//input[@id='cooking']";
    xpathHobbiesReading: string = "//input[@id='reading']";
    xpathInterests: string = "//select[@id='interests']";
    xpathCountry: string = "//select[@id='country']";
    xpathDateOfBirth: string = "//input[@id='dob']";
    xpathUploadProfilePicture: string = "//input[@id='profile']";
    xpathBiography: string = "//textarea[@id='bio']";
    xpathRating: string = "//input[@id='rating']";
    xpathFavoriteColor: string = "//input[@id='favcolor']";
    xpathHoverTooltip: string = "//div[@class='tooltip']";
    xpathSubcribe: string = "//input[@id='newsletter']";
    xpathEnableFeatureClick: string = "//span[@class='slider round']"; // dùng để click
    xpathEnableFeatureState: string = "//input[@id='toggleOption']"; //  #toggleOption ; dùng để đọc state
    xpathRatingStar: string = "//div[@id='starRating']";

    constructor(page: Page) {
        super(page);
    }

    async fillUsername(userName: string) {
        await this.page.locator(this.xpathUsername).fill(userName);
    }

    async fillEmail(email: string) {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async checkGender(gender: string) {
        if (gender === 'Nữ') {
            await this.page.locator(this.xpathGenderFemale).check();
        } else
            if (gender === 'Nam') {
                await this.page.locator(this.xpathGenderMale).check();
            }
    }

    async selectHobbies(hobbies: string) {
        if (hobbies === 'reading') {
            await this.page.locator(this.xpathHobbiesReading).check();
        } else
            if (hobbies === 'cooking') {
                await this.page.locator(this.xpathHobbiesCooking).check();
            } else
                if (hobbies === 'traveling') {
                    await this.page.locator(this.xpathHobbiesTraveling).check();
                }
    }

    async selectInterests(interest: string) {
        await this.page.locator(this.xpathInterests).selectOption(interest);
    }

    async selectCountry(country: string) {
        await this.page.locator(this.xpathCountry).selectOption(country);
    }

    async inputDateOfBirth(date: string) {
        await this.page.locator(this.xpathDateOfBirth).fill(date);
    }

    async uploadProfilePicture(filePath: string) {
        await this.page.locator(this.xpathUploadProfilePicture).setInputFiles(filePath);
    }

    async inputBiography(biography: string) {
        await this.page.locator(this.xpathBiography).fill(biography);
    }

    async Rating(rate: string) {
        await this.page.locator(this.xpathRating).fill(rate);
    }

    async selectFavoriteColor(color: string) {
        await this.page.locator(this.xpathFavoriteColor).fill(color);
    }

    async hoverTooltip() {
        await this.page.locator(this.xpathHoverTooltip).hover();
    }

    async clickSubcribe() {
        await this.page.locator(this.xpathSubcribe).check();
    }

    async clickEnableFeature() {
        await this.page.locator(this.xpathEnableFeatureClick).click();
    }

    async ratingStar(percentRate: number) {
        const starRating = this.page.locator(this.xpathRatingStar);
        const box = await starRating.boundingBox();
        // Click at 5th star position (98% from left)
        await starRating.click({ position: { x: box!.width * percentRate, y: box!.height / 2 } });
    }
    /* Giải thích chi tiết
    boundingBox() — lấy kích thước và vị trí thực tế của div #starRating trên màn hình (trả về { x, y, width, height }).
    click({ position: { x, y } }) — click vào tọa độ tương đối bên trong element:
    x = box.width * 0.98 → click ở 98% chiều ngang → tương đương ngôi sao thứ 5 (gần cuối)
    y = box.height / 2 → click ở giữa chiều dọc
    Tại sao 98%? — 5 sao chia đều → mỗi sao chiếm 20% width. Sao thứ 5 nằm ở vùng 80%-100%, nên 98% là điểm giữa của sao thứ 5.
    */

    // Lấy danh sách value của các checkbox hobbies đang được check
    async getCheckedHobbies(): Promise<string[]> {
        const checkedBoxes = await this.page.locator("input[name='hobbies']:checked").all();
        const values: string[] = [];
        for (const box of checkedBoxes) {
            const value = await box.getAttribute('value');
            if (value) values.push(value);
        }
        return values;
    }

    // Chụp lại toàn bộ giá trị hiện có trên form (gọi ngay trước khi click Register)
    async captureFormValues() {
        const username = await this.page.locator(this.xpathUsername).inputValue();
        const email = await this.page.locator(this.xpathEmail).inputValue();
        const gender = await this.page.locator("input[name='gender']:checked").getAttribute('value');
        const hobbies = await this.getCheckedHobbies();
        const country = await this.page.locator(this.xpathCountry).inputValue();
        const dob = await this.page.locator(this.xpathDateOfBirth).inputValue();
        const bio = await this.page.locator(this.xpathBiography).inputValue();
        const rating = await this.page.locator(this.xpathRating).inputValue();
        const favcolor = await this.page.locator(this.xpathFavoriteColor).inputValue();
        const newsletter = await this.page.locator(this.xpathSubcribe).isChecked();
        const enableFeature = await this.page.locator(this.xpathEnableFeatureState).isChecked();
        const starRating = await this.page.locator(this.xpathRatingStar).getAttribute('data-rating');

        return {
            username,
            email,
            gender,
            hobbies,
            country,
            dob,
            bio,
            rating,
            favcolor,
            newsletter,
            enableFeature,
            starRating: starRating ?? '0',
        }
    }

    async clickRegister() {
        await this.page.locator(this.xpathRegisterButton).click();
    }

    // Lấy text của dòng vừa được thêm mới nhất trong bảng kết quả
    async getLastRegisteredRowText(): Promise<string> {
        const lastRow = this.page.locator("//table[@id='userTable']/tbody/tr").last();
        return (await lastRow.innerText()).toLowerCase();
    }
};

export class ProductPage extends MaterialBasePage {
    xpathProduct1: string = "//button[@data-product-id='1']";
    xpathProduct2: string = "//button[@data-product-id='2']";
    xpathProduct3: string = "//button[@data-product-id='3']";
    xpathCartRows: string = "//tbody[@id='cart-items']/tr";
    xpathTotalPrice: string = "//td[@class='total-price']";

    constructor(page: Page) {
        super(page)
    }

    async addProduct1(number: number) {
        await this.page.locator(this.xpathProduct1).click({ clickCount: number });
    }

    async addProduct2(number: number) {
        await this.page.locator(this.xpathProduct2).click({ clickCount: number });
    }

    async addProduct3(number: number) {
        await this.page.locator(this.xpathProduct3).click({ clickCount: number });
    }

    // Lấy toàn bộ dữ liệu từng dòng trong giỏ hàng
    async getCartItems(): Promise<{ name: string; price: number; quantity: number; total: number }[]> {
        const rows = await this.page.locator(this.xpathCartRows).all();
        // console.log(rows);
        const items: { name: string; price: number; quantity: number; total: number }[] = [];

        for (const row of rows) {
            const cells = row.locator('td');
            const name = await cells.nth(0).innerText();
            const priceText = await cells.nth(1).innerText();
            const quantityText = await cells.nth(2).innerText();
            const totalText = await cells.nth(3).innerText();

            items.push({
                name: name.trim(),
                price: parseFloat(priceText.replace('$', '')),
                quantity: parseInt(quantityText, 10),
                total: parseFloat(totalText.replace('$', '')),
            });
        }
        return items;
    }

    // Lấy tổng tiền hiển thị cuối bảng giỏ hàng
    async getCartTotalPrice(): Promise<number> {
        const totalText = await this.page.locator(this.xpathTotalPrice).innerText();
        return parseFloat(totalText.replace('$', ''));
    }
};

export class TodoPage extends MaterialBasePage {
    xpathNewTask: string = "//input[@id='new-task']";
    xpathAddTaskButton: string = "//button[@id='add-task']";

    constructor(page: Page) {
        super(page);
    }

    async fillTodo(n: number) {
        for (let i = 1; i <= n; i++) {
            await this.page.locator(this.xpathNewTask).fill(`Todo ${i}`);
            await this.page.locator(this.xpathAddTaskButton).click();
        }
    }

    // Lấy locator của đúng dòng <li> chứa nội dung task cần tìm
    getTodoItemLocator(taskText: string) {
        return this.page.locator(`//li[span[text()='${taskText}']]`);
    }

    // Xóa các todo có số lẻ, dựa theo index
    // async deleteTask(n: number) {
    //     this.page.on('dialog', async dialog => dialog.accept()); // Nhấn OK trên dialog Delete
    //     for (let i = n; i >= 0; i--) { // xóa từ cuối về đầu để tránh việc xóa làm thay đổi index
    //         if (i % 2 === 0) {
    //             await this.page.locator(`//button[@onclick='deleteTask(${i})']`).click();
    //         }
    //     }
    // }

    // Xóa các todo có số lẻ, dựa theo tên task thay vì index
    async deleteOddTasks(n: number) {
        this.page.on('dialog', async dialog => dialog.accept());
        for (let i = 1; i <= n; i += 2) {
            const taskItem = this.getTodoItemLocator(`Todo ${i}`);
            await taskItem.getByRole('button', { name: 'Delete' }).click();
        }
    }
};

export class PersonalNotesPage extends MaterialBasePage {
    xpathTitle: string = "//input[@id='note-title']";
    xpathContent: string = "//textarea[@id='note-content']";
    xpathAddNoteButton: string = "//button[@id='add-note']";
    xpathSearchNotes: string = "//input[@id='search']";
    xpathNotesList: string = "//ul[@id='notes-list']/li"; // //ul[@id="notes-list"]/child::li

    constructor(page: Page) {
        super(page);
    }

    async addNotes(title: string, content: string) {
        await this.page.locator(this.xpathTitle).fill(title);
        await this.page.locator(this.xpathContent).fill(content);
        await this.page.locator(this.xpathAddNoteButton).click();
    }

    async searchNotes(note: string) {
        await this.page.locator(this.xpathSearchNotes).fill(note);
    }

    // Lấy ra mảng gồm các text sau khi search notes
    async getVisibleNotesText(): Promise<string[]> {
        const notes = await this.page.locator(this.xpathNotesList).all();
        // console.log(notes);
        const notesText: string[] = [];
        for (const note of notes) {
            const text = await note.innerText();
            // console.log(text);
            notesText.push(text.toLowerCase());
        }
        // console.log(notesText);
        return notesText;
    }
};

