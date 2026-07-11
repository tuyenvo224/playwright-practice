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
    /* Giải thích chi tiết từng phần của đoạn code này:

await test.step('Verify registered info in table', async () => {
test.step(...) là API của Playwright dùng để nhóm các bước logic lại với nhau và đặt tên cho nhóm đó ('Verify registered info in table'). Khi chạy test, trong report/UI mode, bạn sẽ thấy bước này hiện ra như 1 mục riêng biệt, dễ theo dõi test đang chạy tới đâu và dễ debug khi có lỗi (biết ngay lỗi rơi vào bước nào).
Tham số thứ 2 là 1 callback async () => {...} — hàm bất đồng bộ chứa toàn bộ logic thực thi của bước này.
await trước test.step để đảm bảo Playwright chờ toàn bộ nội dung bên trong chạy xong (bao gồm mọi lệnh await lồng bên trong) rồi mới coi bước này là hoàn tất, trước khi chạy sang code tiếp theo (nếu có).

    const rowText = await registerPage.getLastRegisteredRowText();
Gọi lại method đã giải thích ở câu hỏi trước — lấy toàn bộ text của dòng <tr> vừa mới được thêm vào bảng (dòng cuối cùng trong tbody), và text này đã được chuyển về chữ thường (do bên trong getLastRegisteredRowText() có gọi .toLowerCase()).
Kết quả rowText là 1 chuỗi dài, gộp hết nội dung của cả 5 cột (STT, Username, Email, Information, Actions) lại với nhau, ví dụ dạng: "1\ttuyen vo\ttuyen@gmail.com\ngender: female\nhobbies: reading, traveling\n...".

        expect(rowText).toContain(expectedData.username.toLowerCase());
expect(rowText) tạo ra 1 "assertion object" bọc quanh giá trị rowText, cho phép gọi các matcher (toContain, toBe, toEqual,...) để kiểm tra.
.toContain(...) là matcher kiểm tra xem chuỗi rowText có chứa (substring) chuỗi được truyền vào hay không. Nếu không chứa, test sẽ fail ngay tại dòng này và Playwright báo lỗi chỉ rõ giá trị mong đợi vs giá trị thực tế.
expectedData.username.toLowerCase(): expectedData là object đã "chụp" được từ form (nhờ captureFormValues() gọi trước đó), .username là giá trị đọc được từ ô input (ví dụ "Tuyen Vo", giữ nguyên hoa/thường người dùng gõ). Vì rowText đã bị lowercase toàn bộ, nên ở đây phải chủ động gọi thêm .toLowerCase() lên expectedData.username để 2 vế so sánh cùng ở dạng chữ thường — nếu không làm vậy, dù nội dung thực chất giống nhau (chỉ khác hoa/thường), toContain vẫn sẽ trả về false vì so sánh chuỗi là phân biệt hoa/thường theo mặc định.

        expect(rowText).toContain(expectedData.email.toLowerCase());
Tương tự dòng trên, kiểm tra rowText có chứa email đã nhập hay không (email thường vốn đã chữ thường, nhưng vẫn gọi .toLowerCase() cho chắc chắn/nhất quán).

        expect(rowText).toContain(`gender: ${expectedData.gender}`);
Đây dùng template literal (chuỗi trong dấu backtick `) để tạo ra 1 chuỗi hoàn chỉnh, ví dụ nếu expectedData.gender là "female" thì chuỗi tạo ra sẽ là "gender: female".
Tại sao ghép cả tiền tố "gender: " vào để so sánh, thay vì chỉ so sánh mỗi giá trị "female"? Vì nếu chỉ check rowText có chứa "female" không, sẽ không đủ chắc chắn — có thể chuỗi "female" xuất hiện ở đâu đó khác trong rowText mà không đúng ngữ cảnh cột Gender (dù ở đây khả năng thấp, nhưng cách check theo "label: value" giúp assertion chính xác và có ý nghĩa hơn, đúng với format thật mà trang web render ra: Gender: ${user.gender}).
expectedData.gender không gọi .toLowerCase() thêm vì giá trị này vốn đã lấy từ getAttribute('value') của radio button, mà attribute value="male"/"female" trong HTML gốc vốn đã là chữ thường sẵn — không cần xử lý thêm.

        expect(rowText).toContain(`hobbies: ${expectedData.hobbies.join(', ')}`);
expectedData.hobbies là 1 mảng string (ví dụ ["reading", "traveling"]), lấy từ method getCheckedHobbies() đã giải thích trước đó.
.join(', ') là method của Array trong JavaScript, nối các phần tử trong mảng lại thành 1 chuỗi, mỗi phần tử cách nhau bởi dấu phẩy + khoảng trắng. Ví dụ: ["reading", "traveling"].join(', ') → "reading, traveling".
Lý do dùng .join(', '): vì trang web hiển thị hobbies theo đúng format này (user.hobbies.join(', ') trong code JS của trang) — mình tái tạo lại đúng định dạng đó để so sánh khớp với rowText.

        expect(rowText).toContain(`country: ${expectedData.country}`);
Tương tự pattern trên, expectedData.country là giá trị value của <option> đang chọn (ví dụ "uk"), ghép với tiền tố "country: " để so khớp đúng dòng hiển thị trong bảng.

        expect(rowText).toContain(`date of birth: ${expectedData.dob}`);
expectedData.dob dạng "1991-04-22" (không có chữ cái nên không cần lowercase), ghép với tiền tố tương ứng cột "Date of Birth" trên bảng.

        expect(rowText).toContain(`biography: ${expectedData.bio.toLowerCase()}`);
Khác với các field trên, ở đây .toLowerCase() được gọi ngay trên expectedData.bio (bên trong dấu ${...}) trước khi ghép vào template literal — vì nội dung biography là văn bản tự do (có thể có chữ hoa ở đầu câu, tên riêng...), cần đưa về chữ thường để khớp với rowText đã lowercase toàn bộ.

        expect(rowText).toContain(`rating: ${expectedData.rating}`);
expectedData.rating là giá trị đọc từ thanh trượt range (ví dụ "10") — số nên không cần lowercase.

        expect(rowText).toContain(`favorite color: ${expectedData.favcolor}`);
expectedData.favcolor dạng mã hex như "#ff00bb" — vốn đã toàn chữ thường vì bạn tự nhập vào bằng chữ thường (selectFavoriteColor('#ff00bb')), nên không cần xử lý thêm.

        expect(rowText).toContain(`newsletter: ${expectedData.newsletter ? 'yes' : 'no'}`);
expectedData.newsletter là kiểu boolean (true/false), lấy từ .isChecked().
expectedData.newsletter ? 'yes' : 'no' là toán tử ba ngôi (ternary operator) — cú pháp điều_kiện ? giá_trị_nếu_true : giá_trị_nếu_false. Nếu newsletter là true → cho ra chuỗi 'yes'; nếu false → cho ra 'no'.
Lý do cần chuyển đổi này: trang web hiển thị Newsletter: ${user.newsletter ? 'Yes' : 'No'} (chữ "Yes"/"No", nhưng đã bị lowercase thành "yes"/"no" trong rowText) — chứ không hiển thị true/false trực tiếp. Nên phải tự chuyển boolean sang đúng chữ mà trang web thực sự hiển thị thì mới so sánh khớp được.

        expect(rowText).toContain(`enable feature: ${expectedData.enableFeature ? 'yes' : 'no'}`);
Tương tự dòng trên, áp dụng cho trạng thái của toggle "Enable Feature".

        expect(rowText).toContain(`star rating: ${expectedData.starRating}`);
expectedData.starRating là giá trị đọc từ thuộc tính data-rating (ví dụ "4.9"), ghép với tiền tố tương ứng. Không cần lo về ký tự ⭐ trang web thêm vào sau con số, vì toContain chỉ kiểm tra substring — chuỗi "star rating: 4.9" vẫn được coi là "chứa trong" rowText dù sau nó còn có thêm "⭐" hay bất kỳ ký tự nào khác.

    });
Đóng callback của test.step, kết thúc bước verify.
Tóm lại ý tưởng chung của cả đoạn: Với mỗi field đã đăng ký, đoạn code tái tạo lại chính xác định dạng chuỗi mà trang web sẽ render ra ("label: value", đúng theo code JS gốc loadUsers() của trang), dùng giá trị đã capture được từ form (expectedData) làm nguồn "sự thật", rồi kiểm tra từng field đó có xuất hiện đúng trong nội dung dòng bảng (rowText) hay không — thay vì so sánh toàn bộ chuỗi 1 lần (toBe/toEqual), cách check từng field riêng lẻ bằng toContain giúp nếu có 1 field sai, thông báo lỗi sẽ chỉ rõ đúng field đó, dễ debug hơn nhiều so với so sánh nguyên khối.

    */

});