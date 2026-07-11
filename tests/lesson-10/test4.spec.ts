import { expect, test } from '@playwright/test';
import { PersonalNotesPage } from './pom/01-pom';

test('Personal Notes', async ({ page }) => {
    const personalNote = new PersonalNotesPage(page);
    const keyword = 'check';

    await test.step('Navigate Material website', async () => {
        await personalNote.openMaterialPage();
    });

    await test.step('Click Bai hoc 4', async () => {
        await personalNote.gotoPage('Bài 4')
    });

    await test.step('Add note', async () => {
        await personalNote.addNotes('click', 'Hàm click dùng để thực hiện click vào các phần tử trên trang web');
        await personalNote.addNotes('fill', 'Hàm `fill` dùng để điền văn bản vào các trường input hoặc textarea trên trang web');
        await personalNote.addNotes('type', 'Hàm `type` dùng để nhập từng ký tự một vào phần tử, mô phỏng hành vi gõ phím thực tế của người dùng');
        await personalNote.addNotes('hover', 'Hàm `hover` dùng để di chuyển con trỏ chuột đến vị trí của phần tử, kích hoạt các hiệu ứng hover');
        await personalNote.addNotes('check', 'Hàm `check` dùng để đánh dấu checkbox hoặc radio button, đảm bảo phần tử ở trạng thái checked');
        await personalNote.addNotes('uncheck', 'Hàm `uncheck` dùng để bỏ đánh dấu checkbox, đảm bảo phần tử ở trạng thái unchecked');
        await personalNote.addNotes('selectOption', 'Hàm `selectOption` dùng để chọn một hoặc nhiều option trong thẻ select dropdown');
        await personalNote.addNotes('press', 'Hàm `press` dùng để mô phỏng việc nhấn phím bàn phím như Enter, Tab, Escape hoặc các phím khác');
        await personalNote.addNotes('dblclick', 'Hàm `dblclick` dùng để thực hiện double click (nhấp đúp chuột) vào phần tử trên trang web');
        await personalNote.addNotes('dragAndDrop', 'Hàm `dragAndDrop` dùng để kéo một phần tử từ vị trí nguồn và thả vào vị trí đích trên trang web');
    })

    await test.step('Search notes', async () => {
        await personalNote.searchNotes(keyword);
    })

    await test.step('Verify all searched notes contain keyword', async () => {
        const notesText = await personalNote.getVisibleNotesText();

        // đảm bảo có ít nhất 1 kết quả để test có ý nghĩa
        expect(notesText.length).toBeGreaterThan(0);

        for (const text of notesText) {
            expect(text).toContain(keyword.toLowerCase());
        }
    });
});
