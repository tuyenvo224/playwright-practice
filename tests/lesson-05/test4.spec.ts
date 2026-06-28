import { test } from '@playwright/test';

test('Personal Notes', async ({ page }) => {
    await test.step('Navigate Material website', async() => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Click Bai hoc 4', async() => {
        await page.locator("//a[@href='04-xpath-personal-notes.html']").click();
    });


    async function addNotes(title: string,content: string){ 
        // vì là file .spec.ts (TypeScript), nên cần khai báo kiểu dữ liệu cho tham số để tránh cảnh báo kiểu dữ liệu (Dấu gạch đỏ dưới title, content)
        // vì có await nằm trong function nên function cần khai báo async

        await test.step('Input title', async() => {
        await page.locator("//input[@id='note-title']").fill(title);
        });

        await test.step('Input content', async() => {
        await page.locator("//textarea[@id='note-content']").fill(content);
        });

        await test.step('Click add note', async() => {
        await page.locator("//button[@id='add-note']").click();
        });
    };

    // Khi gọi function, cần khai báo await
    await addNotes('click','Hàm click dùng để thực hiện click vào các phần tử trên trang web');
    await addNotes('fill','Hàm `fill` dùng để điền văn bản vào các trường input hoặc textarea trên trang web');
    await addNotes('type','Hàm `type` dùng để nhập từng ký tự một vào phần tử, mô phỏng hành vi gõ phím thực tế của người dùng');
    await addNotes('hover','Hàm `hover` dùng để di chuyển con trỏ chuột đến vị trí của phần tử, kích hoạt các hiệu ứng hover');
    await addNotes('check','Hàm `check` dùng để đánh dấu checkbox hoặc radio button, đảm bảo phần tử ở trạng thái checked');
    await addNotes('uncheck','Hàm `uncheck` dùng để bỏ đánh dấu checkbox, đảm bảo phần tử ở trạng thái unchecked');
    await addNotes('selectOption','Hàm `selectOption` dùng để chọn một hoặc nhiều option trong thẻ select dropdown');
    await addNotes('press','Hàm `press` dùng để mô phỏng việc nhấn phím bàn phím như Enter, Tab, Escape hoặc các phím khác');
    await addNotes('dblclick','Hàm `dblclick` dùng để thực hiện double click (nhấp đúp chuột) vào phần tử trên trang web');
    await addNotes('dragAndDrop','Hàm `dragAndDrop` dùng để kéo một phần tử từ vị trí nguồn và thả vào vị trí đích trên trang web');


    await test.step('Search notes', async() => {
        await page.locator("//input[@id='search']").fill('một hoặc nhiều');
    })
})
