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

    /* xpathEnableFeature: Giải thích chi tiết:
    
    xpathEnableFeature để dùng cho cả 2 mục đích khác nhau (click và đọc trạng thái), nhưng 2 mục đích này cần trỏ tới 2 phần tử khác nhau. 

Nguyên nhân gốc — CSS ẩn checkbox thật đi:

Xem lại HTML/CSS gốc của phần "Enable Feature":


<label class="switch">
  <input type="checkbox" id="toggleOption" name="toggleOption">
  <span class="slider round"></span>
</label>

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
Đây là kiểu toggle switch tùy biến (custom toggle switch) rất phổ biến: thẻ <input type="checkbox"> thật sự bị CSS ẩn đi hoàn toàn (width: 0; height: 0; opacity: 0 — tức là nó tồn tại trong DOM nhưng có kích thước bằng 0, không hiển thị gì cả). Phần bạn nhìn thấy và click được trên UI thực chất là thẻ <span class="slider round"> — CSS style cho span này để trông giống 1 cái nút gạt (toggle).

Vì sao click thất bại:

Playwright's .click() có cơ chế "auto-waiting" — trước khi click, nó sẽ chờ phần tử phải visible, enabled và stable. "Visible" theo định nghĩa của Playwright yêu cầu phần tử phải có kích thước thật (bounding box > 0). Vì input#toggleOption bị CSS set width: 0; height: 0, nó không bao giờ đạt điều kiện visible → Playwright cứ chờ mãi (retry liên tục) cho tới khi hết 30 giây timeout → báo lỗi đúng như log bạn thấy: "element is not visible" lặp lại nhiều lần.

Vì sao trước đó dùng span[@class='slider round'] lại chạy được:

Vì <span> đó mới là phần tử thật sự hiển thị trên UI (có kích thước, người dùng thật cũng click vào đây). Về mặt kỹ thuật trình duyệt: <input> nằm bên trong <label class="switch">, mà theo hành vi chuẩn của HTML, click vào bất kỳ đâu bên trong 1 <label> bao quanh 1 checkbox sẽ tự động kích hoạt (toggle) checkbox đó — nên click vào <span> vẫn khiến input#toggleOption được check/uncheck đúng như mong đợi.

Hướng xử lý:

Bạn cần dùng 2 locator khác nhau cho 2 mục đích khác nhau, thay vì gộp chung 1 xpath:

Để click (thao tác giống người dùng thật) → giữ nguyên locator cũ trỏ tới <span class="slider round">.
Để đọc trạng thái checked (trong captureFormValues()) → dùng locator trỏ tới input#toggleOption với .isChecked() — vì .isChecked() không yêu cầu phần tử phải visible, nó chỉ đọc thẳng property checked trong DOM, nên hoàn toàn không bị vướng vấn đề kích thước bằng 0 như .click().
Vậy bạn nên giữ lại 2 xpath tách biệt (đừng gộp chung 1 biến xpathEnableFeature cho cả click lẫn đọc trạng thái), ví dụ giữ đúng như comment bạn đã tự ghi chú trong ảnh: 1 cái cho #toggleOption (dùng để đọc state), 1 cái cho //span[@class='slider round'] (dùng để click).

    */

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
    /* Giải thích chi tiết từng dòng của method này:

async getCheckedHobbies(): Promise<string[]> {
async cho biết đây là hàm bất đồng bộ, bên trong có thể dùng await.
Tên hàm getCheckedHobbies — "lấy các hobbies đang được check (tick chọn)".
: Promise<string[]> khai báo tường minh kiểu trả về — hàm sẽ trả về 1 Promise, khi resolve sẽ ra 1 mảng string (ở đây là mảng các giá trị value của những checkbox hobbies đang được tick).

    const checkedBoxes = await this.page.locator("input[name='hobbies']:checked").all();
Đây là dòng quan trọng nhất, tách ra 2 phần:

this.page.locator("input[name='hobbies']:checked"): đây là 1 CSS selector, không phải XPath (khác với đa số locator khác trong class này dùng xpath bắt đầu bằng //). Ý nghĩa của selector:

input[name='hobbies'] → chọn tất cả thẻ <input> có thuộc tính name="hobbies" (chính là 3 checkbox: reading, traveling, cooking, vì cả 3 đều có name="hobbies" theo HTML gốc của trang).
:checked → đây là CSS pseudo-class, chỉ giữ lại những phần tử đang ở trạng thái checked (đã được tick). Nghĩa là nếu bạn chỉ tick "reading" và "traveling", thì cooking (không tick) sẽ tự động bị loại ngay từ bước locator, không cần bạn phải tự lọc lại bằng code.
Cách viết này rất hiệu quả vì để trình duyệt/CSS engine tự lọc đúng phần tử mình cần, thay vì lấy hết 3 checkbox rồi code phải tự check từng cái xem có tick hay không.
.all(): giống hàm bạn đã học ở method getVisibleNotesText trước đó — lấy ra 1 mảng các Locator riêng lẻ, mỗi phần tử trong mảng ứng với 1 checkbox đang checked cụ thể trên trang. Ví dụ nếu bạn tick "reading" và "traveling" thì mảng này sẽ có đúng 2 phần tử.

await ở đầu: vì .all() trả về 1 Promise (phải hỏi trình duyệt để lấy danh sách phần tử thật), nên cần chờ nó hoàn thành rồi mới gán kết quả vào biến checkedBoxes.


    const values: string[] = [];
Khai báo 1 mảng rỗng để chứa các giá trị value sẽ lấy được từ từng checkbox — đây chính là kết quả cuối cùng hàm sẽ trả về.

    for (const box of checkedBoxes) {
Vòng lặp for...of duyệt qua từng phần tử trong mảng checkedBoxes.
Biến box mỗi lần lặp là 1 Locator trỏ tới đúng 1 checkbox đang được tick.

        const value = await box.getAttribute('value');
box.getAttribute('value') đọc giá trị của thuộc tính HTML value trên thẻ input đó. Ví dụ HTML gốc: <input type="checkbox" id="reading" name="hobbies" value="reading"> → getAttribute('value') sẽ trả về chuỗi "reading".
Đây cũng là thao tác bất đồng bộ (phải hỏi DOM thật sự trên trang), nên cần await.
Lưu ý: getAttribute() có thể trả về string hoặc null (nếu thuộc tính đó không tồn tại trên phần tử) — đây là lý do TypeScript suy ra kiểu của value là string | null, không phải string thuần.

        if (value) values.push(value);
Đây là bước kiểm tra để xử lý trường hợp value có thể là null (theo kiểu string | null vừa nói ở trên).
if (value) — kiểm tra "truthy": nếu value là null, undefined, hoặc chuỗi rỗng "" thì điều kiện là false và sẽ không push vào mảng. Chỉ khi value là 1 chuỗi có nội dung thật sự (như "reading") thì mới push.
Đây vừa là cách xử lý an toàn kiểu dữ liệu (tránh lỗi TypeScript vì values: string[] không chấp nhận phần tử null), vừa tránh trường hợp hiếm gặp checkbox không có thuộc tính value thì cũng không đẩy giá trị rác vào mảng kết quả.

    }
    return values;
}
Sau khi vòng lặp chạy hết qua tất cả checkbox đang checked, hàm trả về mảng values — chứa toàn bộ giá trị value của các hobbies đã được tick (ví dụ: ["reading", "traveling"]).
Thứ tự trong mảng này sẽ theo đúng thứ tự các checkbox xuất hiện trong DOM (reading → traveling → cooking), không phụ thuộc vào việc bạn gọi .check() cho hobbies nào trước trong test — đây chính là lý do ở bước trước mình lưu ý bạn về việc thứ tự hiển thị trên bảng theo DOM order chứ không theo thứ tự bạn thao tác.
Tóm lại luồng chạy: hàm tìm tất cả checkbox có name="hobbies" và đang ở trạng thái tick → với mỗi checkbox đó, đọc giá trị thuộc tính value → gom các giá trị hợp lệ vào 1 mảng string → trả về mảng đó, để dùng so sánh với cột "Hobbies" hiển thị trong bảng kết quả đăng ký (dạng hobbies.join(', ')).

    */

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

        /* console.log
        console.log(username);
        console.log(email);
        console.log(gender);
        console.log(hobbies);
        console.log(country);
        console.log(dob);
        console.log(bio);
        console.log(rating);
        console.log(favcolor);
        console.log(newsletter);
        console.log(enableFeature);
        console.log(starRating);
        */

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
    /* Giải thích chi tiết từng phần của method này:

async captureFormValues() {
async — hàm bất đồng bộ, bên trong dùng await để chờ các thao tác đọc dữ liệu từ trang.
Không khai báo kiểu trả về tường minh (giống ví dụ bạn hỏi trước đó) — TypeScript sẽ tự suy luận kiểu dựa vào object được return ở cuối hàm.
Mục đích của hàm: chụp lại (snapshot) toàn bộ giá trị hiện đang có trên form, gọi đúng lúc ngay trước khi bấm nút Register — để sau này so sánh với những gì hiển thị trong bảng, đảm bảo so sánh đúng giá trị thật đã nhập/chọn, thay vì đoán trước.

    const username = await this.page.locator(this.xpathUsername).inputValue();
this.page.locator(this.xpathUsername) trỏ tới thẻ <input id="username">.
.inputValue() là method riêng của Playwright dùng cho các thẻ <input>, <textarea>, <select> — nó đọc giá trị hiện tại (thuộc tính value) của phần tử đó, tức là đúng những gì đang nằm trong ô input tại thời điểm gọi.
Khác với getAttribute('value'): getAttribute đọc thuộc tính HTML gốc (giá trị khai báo sẵn trong file HTML, hoặc set bằng setAttribute), còn inputValue() đọc giá trị thực tế đang hiển thị/đã nhập trên DOM Node (property .value trong JS), phản ánh đúng sau khi người dùng gõ chữ vào. Với input text/email/textarea, inputValue() là cách chính xác và được khuyến nghị dùng.
await vì đây là thao tác bất đồng bộ hỏi trình duyệt.

    const email = await this.page.locator(this.xpathEmail).inputValue();
Tương tự dòng trên nhưng cho ô email.

    const gender = await this.page.locator("input[name='gender']:checked").getAttribute('value');
Locator CSS: chọn thẻ <input name="gender"> đang ở trạng thái :checked — vì gender là radio button (chỉ 1 trong 2: male/female được chọn tại 1 thời điểm), nên selector này luôn trả về đúng 1 phần tử (radio đang được chọn).
.getAttribute('value') ở đây dùng đúng vì radio button không có nội dung gõ tay như text input — giá trị của nó là thuộc tính value cố định khai báo sẵn trong HTML (value="male" hoặc value="female"), nên đọc bằng getAttribute là hợp lý (dùng inputValue() cũng được nhưng với radio thì 2 cách cho kết quả như nhau).
Kết quả trả về kiểu string | null (có thể null nếu không có radio nào được check, dù trong luồng test này đã check gender rồi nên thực tế không xảy ra).

    const hobbies = await this.getCheckedHobbies();
Gọi lại chính method getCheckedHobbies() bạn vừa hỏi ở câu trước — tái sử dụng code đã viết thay vì lặp lại logic, giúp captureFormValues() gọn gàng, dễ đọc.
Trả về mảng string các hobbies đang được tick, ví dụ ["reading", "traveling"].

    const country = await this.page.locator(this.xpathCountry).inputValue();
xpathCountry trỏ tới thẻ <select id="country">.
Với thẻ <select>, .inputValue() trả về giá trị (value) của <option> đang được chọn (ví dụ "uk"), không phải phần text hiển thị ("United Kingdom") — đây chính là điều mình lưu ý ở phần gợi ý trước, vì bảng kết quả trên trang cũng hiển thị đúng theo value này (user.country lấy từ formData.get('country')).

    const dob = await this.page.locator(this.xpathDateOfBirth).inputValue();
xpathDateOfBirth trỏ input type="date". .inputValue() trả về chuỗi dạng "1991-04-22" (đúng format YYYY-MM-DD mà input date luôn dùng nội bộ), khớp với cách trang lưu formData.get('dob').

    const bio = await this.page.locator(this.xpathBiography).inputValue();
Lấy nội dung hiện có trong <textarea id="bio"> — chính là đoạn tiểu sử bạn đã fill() trước đó.

    const rating = await this.page.locator(this.xpathRating).inputValue();
xpathRating trỏ input type="range". .inputValue() trả về giá trị hiện tại của thanh trượt dưới dạng string, ví dụ "10".

    const favcolor = await this.page.locator(this.xpathFavoriteColor).inputValue();
Input type="color" — .inputValue() trả về mã màu hex hiện tại, ví dụ "#ff00bb", đúng định dạng mà formData.get('favcolor') phía trang web sẽ lấy.

    const newsletter = await this.page.locator(this.xpathSubcribe).isChecked();
xpathSubcribe trỏ checkbox #newsletter.
.isChecked() là method riêng cho checkbox/radio, trả về giá trị boolean (true/false) cho biết phần tử có đang được tick hay không — khác với getAttribute/inputValue vốn trả về string.
Dùng đúng API cho đúng loại phần tử: text/textarea/select/range/color → inputValue(); checkbox/radio → isChecked().

    const enableFeature = await this.page.locator("#toggleOption").isChecked();
Đây là điểm khác biệt quan trọng so với xpathEnableFeature đã có sẵn trong class ("//span[@class='slider round']") — cái xpath cũ trỏ tới phần tử <span> (chỉ là hình ảnh cái nút gạt hiển thị trên UI, dùng để click cho tiện thao tác chuột), còn ở đây mình dùng CSS selector "#toggleOption" để trỏ thẳng tới thẻ <input type="checkbox" id="toggleOption"> thật sự ẩn phía sau — vì chỉ input checkbox mới có state checked để đọc bằng isChecked(), còn <span> thì không có khái niệm checked.

    const starRating = await this.page.locator(this.xpathRatingStar).getAttribute('data-rating');
xpathRatingStar trỏ tới <div id="starRating">.
Nhớ lại đoạn JS của trang: khi bạn click vào thanh sao, họ gán starRating.dataset.rating = roundedRating — nghĩa là giá trị rating được lưu vào thuộc tính HTML tùy biến data-rating (không phải value, vì <div> không có value).
.getAttribute('data-rating') đọc đúng thuộc tính này, trả về ví dụ "4.9" (kiểu string | null).

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
    };
}
Đây là object shorthand property của JavaScript/TypeScript: khi tên property và tên biến giống nhau, bạn có thể viết gọn username thay vì phải viết username: username. Ví dụ { username } tương đương { username: username }.
Riêng dòng cuối starRating: starRating ?? '0' phải viết đầy đủ vì tên property (starRating) và giá trị gán vào không giống hệt nhau — có xử lý thêm bằng toán tử ?? (nullish coalescing): nếu starRating (biến, kiểu string | null) là null hoặc undefined thì thay bằng chuỗi mặc định '0'; ngược lại giữ nguyên giá trị đọc được. Điều này xử lý trường hợp người dùng chưa từng click vào thanh rating sao (khi đó data-rating không tồn tại → getAttribute trả về null), tránh việc starRating bị null khi mang đi so sánh sau này (vì string so sánh với null sẽ luôn fail hoặc gây lỗi runtime).
Hàm trả về 1 object duy nhất chứa toàn bộ dữ liệu đã "chụp" được từ form tại đúng thời điểm gọi hàm — nhờ vậy ở file test, bạn chỉ cần gọi 1 lần const expectedData = await registerPage.captureFormValues(); là có ngay tất cả giá trị cần thiết để so sánh với bảng kết quả sau khi submit, không cần gọi lẻ tẻ từng hàm riêng.

    */

    async clickRegister() {
        await this.page.locator(this.xpathRegisterButton).click();
    }

    // Lấy text của dòng vừa được thêm mới nhất trong bảng kết quả
    async getLastRegisteredRowText(): Promise<string> {
        const lastRow = this.page.locator("//table[@id='userTable']/tbody/tr").last();
        // console.log(lastRow);
        // const lastRegisteredRowText = (await lastRow.innerText()).toLowerCase();
        // console.log(lastRegisteredRowText);
        return (await lastRow.innerText()).toLowerCase();
    }

    /* Giải thích chi tiết từng phần của method này:

async getLastRegisteredRowText(): Promise<string> {
async — hàm bất đồng bộ, cho phép dùng await bên trong.
Tên hàm: "lấy text của dòng đăng ký cuối cùng (mới nhất) trong bảng".
: Promise<string> — khai báo tường minh kiểu trả về: 1 Promise, khi resolve sẽ ra 1 chuỗi string duy nhất (khác với getVisibleNotesText trả về string[] — ở đây chỉ cần lấy nội dung của 1 dòng nên trả về string, không cần mảng).

    const lastRow = this.page.locator("//table[@id='userTable']/tbody/tr").last();
Tách làm 2 phần:

this.page.locator("//table[@id='userTable']/tbody/tr"): đây là XPath locator (bắt đầu bằng //), trỏ tới tất cả các thẻ <tr> nằm bên trong <tbody> của bảng có id="userTable". Nhớ lại cấu trúc HTML của trang:


<table id="userTable">
  <thead>...</thead>
  <tbody>
    <!-- mỗi user đăng ký sẽ được JS chèn thêm 1 <tr> vào đây -->
  </tbody>
</table>
Nếu bảng đang có 3 user đã đăng ký, locator này sẽ khớp với cả 3 thẻ <tr> đó (Playwright locator có thể đại diện cho nhiều phần tử cùng lúc, chưa cần biết chính xác số lượng bao nhiêu).

.last(): đây là method của Playwright dùng để thu hẹp locator đang trỏ tới nhiều phần tử, chỉ giữ lại phần tử cuối cùng trong danh sách khớp. Ở đây tức là lấy đúng <tr> cuối cùng trong <tbody>.

Lý do dùng .last() thay vì .first(): xem lại code JS của trang — hàm loadUsers() chạy users.forEach((user, index) => { ... userTable.appendChild(row); }). appendChild luôn thêm phần tử mới vào cuối danh sách con hiện có. Vậy user vừa đăng ký gần nhất sẽ luôn nằm ở <tr> cuối cùng trong bảng → dùng .last() là chính xác để lấy đúng dòng vừa mới tạo, bất kể trước đó bảng đã có bao nhiêu user khác.

Lưu ý: .locator() và .last() không phải là thao tác bất đồng bộ (không cần await ở dòng này) — chúng chỉ tạo ra một "công thức tìm kiếm" (Locator object), chưa thực sự truy vấn DOM. Việc truy vấn DOM thật sự chỉ xảy ra khi bạn gọi 1 action cụ thể lên locator đó (như dòng tiếp theo).


    return (await lastRow.innerText()).toLowerCase();
}
lastRow.innerText(): đây mới là lúc Playwright thực sự truy vấn trình duyệt, lấy nội dung text đang hiển thị của thẻ <tr> cuối cùng — bao gồm tất cả text trong các <td> con (STT, Username, Email, Information, Actions...) gộp lại thành 1 chuỗi (các ô cách nhau bằng tab/xuống dòng tùy theo cách trình duyệt render).
Vì đây là thao tác bất đồng bộ (phải chờ trình duyệt trả kết quả), cần có await — và ở đây await được đặt trong dấu ngoặc đơn (await lastRow.innerText()) để đảm bảo nó được thực thi và lấy ra chuỗi kết quả xong xuôi trước, rồi mới gọi tiếp .toLowerCase() lên chuỗi đó. Nếu không có ngoặc bao quanh, .toLowerCase() sẽ vô tình bị gọi lên chính đối tượng Promise (chưa resolve) thay vì lên chuỗi text thật, gây lỗi vì Promise không có method toLowerCase.
.toLowerCase(): chuyển toàn bộ chuỗi về chữ thường. Lý do áp dụng tương tự như ở method getVisibleNotesText trước đó — để việc so sánh sau này (trong bước assert ở file test) không bị ảnh hưởng bởi khác biệt hoa/thường. Ví dụ nếu cột hiển thị "Gender: female" (chữ G hoa), nhưng bạn so sánh với chuỗi cứng "gender: female" (chữ thường) thì nếu không lowercase trước, phép so sánh toContain sẽ thất bại dù nội dung thực chất là khớp nhau.
return trả về chuỗi cuối cùng đã lowercase — chính là toàn bộ nội dung dòng đăng ký mới nhất, dạng chữ thường, sẵn sàng để dùng với các expect(rowText).toContain(...) ở bước verify.
Tóm lại luồng chạy: hàm tìm tất cả các dòng <tr> trong bảng kết quả đăng ký → lấy đúng dòng cuối cùng (vì dòng mới luôn được thêm vào cuối bảng) → đọc toàn bộ text hiển thị của dòng đó → chuyển về chữ thường → trả về, để so sánh với dữ liệu đã "chụp" từ form (captureFormValues()) nhằm xác nhận thông tin đăng ký hiển thị đúng trên bảng.

    */
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

            // console.log(cells);
            // console.log(name);
            // console.log(priceText);
            // console.log(quantityText);
            // console.log(totalText);

            items.push({
                name: name.trim(),
                price: parseFloat(priceText.replace('$', '')),
                quantity: parseInt(quantityText, 10),
                total: parseFloat(totalText.replace('$', '')),
            });
        }

        // console.log(items);
        return items;
    }
    /* Giải thích chi tiết từng phần của method này:

async getCartItems(): Promise<{ name: string; price: number; quantity: number; total: number }[]> {
async — hàm bất đồng bộ, cho phép dùng await bên trong.
Kiểu trả về được khai báo tường minh là 1 Promise bọc quanh mảng các object, mỗi object có 4 trường: name (string), price (number), quantity (number), total (number). Đây gọi là inline object type (khai báo kiểu object trực tiếp ngay tại chỗ dùng, không cần tạo interface/type riêng) — hợp lý khi kiểu dữ liệu này chỉ dùng nội bộ trong 1-2 chỗ, không cần tái sử dụng nhiều nơi khác.
Ý nghĩa: hàm sẽ trả về thông tin đầy đủ của từng dòng sản phẩm đang có trong giỏ hàng.

    const rows = await this.page.locator(this.xpathCartRows).all();
this.page.locator(this.xpathCartRows) trỏ tới tất cả <tr> bên trong <tbody id="cart-items"> (mỗi <tr> là 1 dòng sản phẩm trong giỏ hàng).
.all() — giống các method bạn đã học trước đó (getVisibleNotesText, getCheckedHobbies) — lấy ra 1 mảng các Locator riêng lẻ, mỗi phần tử ứng với 1 <tr> cụ thể đang tồn tại tại thời điểm gọi.
await vì .all() là thao tác bất đồng bộ (phải hỏi trình duyệt để lấy danh sách phần tử thật).

    const items: { name: string; price: number; quantity: number; total: number }[] = [];
Khai báo mảng rỗng để chứa kết quả cuối cùng, kiểu dữ liệu trùng khớp với kiểu trả về của hàm đã khai báo ở trên.

    for (const row of rows) {
Vòng lặp for...of duyệt qua từng phần tử trong mảng rows. Biến row mỗi lần lặp là 1 Locator trỏ tới đúng 1 <tr> cụ thể.

        const cells = row.locator('td');
Đây là điểm quan trọng cần hiểu kỹ: row.locator('td') — gọi .locator() lên chính 1 Locator khác (row), chứ không phải lên this.page.
Khi bạn gọi .locator() trên this.page, phạm vi tìm kiếm là toàn bộ trang. Nhưng khi gọi .locator() trên 1 Locator khác (như row ở đây), phạm vi tìm kiếm sẽ bị thu hẹp lại chỉ bên trong phần tử đó — tức là cells chỉ đại diện cho các thẻ <td> nằm bên trong đúng dòng <tr> này, không lẫn với <td> của các dòng khác trong bảng.
Đây gọi là kỹ thuật locator chaining (lồng locator) — rất hữu ích khi bạn cần thao tác với các phần tử con nằm trong 1 phần tử cha cụ thể, tránh nhầm lẫn khi trang có nhiều phần tử giống nhau lặp lại (ở đây là nhiều <td> trong nhiều <tr>).
Lưu ý: dòng này không có await vì .locator() chỉ tạo ra "công thức tìm kiếm" (chưa truy vấn DOM thật), không phải thao tác bất đồng bộ.

            const name = await cells.nth(0).innerText();
            const priceText = await cells.nth(1).innerText();
            const quantityText = await cells.nth(2).innerText();
            const totalText = await cells.nth(3).innerText();
cells hiện đang đại diện cho nhiều <td> (4 cột: Product Name, Price, Quantity, Total — nhớ lại HTML: mỗi dòng có 4 <td> tương ứng, cột thứ 5 "Actions" chứa nút Remove không cần lấy ở đây).
.nth(index) là method dùng để chọn đúng 1 phần tử theo vị trí (index) trong danh sách phần tử mà locator đang đại diện — index bắt đầu từ 0. Vậy:
cells.nth(0) → cột đầu tiên (Product Name)
cells.nth(1) → cột thứ 2 (Price)
cells.nth(2) → cột thứ 3 (Quantity)
cells.nth(3) → cột thứ 4 (Total)
.innerText() đọc nội dung text đang hiển thị của từng ô — ví dụ name sẽ ra "Product 1", priceText ra "$10.00", quantityText ra "2", totalText ra "$20.00".
Mỗi dòng đều cần await riêng vì .innerText() là thao tác bất đồng bộ (phải hỏi trình duyệt lấy text thật). Ở đây 4 dòng await chạy tuần tự (dòng này xong mới tới dòng kia), không chạy song song — với số lượng ít (4 lệnh, 3 dòng trong giỏ) thì không ảnh hưởng gì tới hiệu năng, nên ưu tiên viết dễ đọc hơn là tối ưu tốc độ.
Sở dĩ đặt tên biến priceText, quantityText, totalText (có hậu tố "Text") chứ không phải price, quantity, total trực tiếp — để phân biệt rõ đây vẫn là chuỗi thô đọc từ UI ("$10.00", "2"), chưa qua xử lý chuyển đổi kiểu dữ liệu, tránh nhầm lẫn với các biến price/quantity/total (dạng số) sẽ tạo ra ở bước tiếp theo.

            items.push({
                name: name.trim(),
                price: parseFloat(priceText.replace('$', '')),
                quantity: parseInt(quantityText, 10),
                total: parseFloat(totalText.replace('$', '')),
            });
items.push({...}) — thêm 1 object mới vào cuối mảng items, object này đại diện cho toàn bộ thông tin của dòng sản phẩm hiện tại.
name: name.trim(): .trim() loại bỏ khoảng trắng thừa ở đầu/cuối chuỗi (nếu HTML có xuống dòng/thụt lề khiến innerText() trả về kèm khoảng trắng dư) — đảm bảo tên sản phẩm sạch sẽ, chính xác, ví dụ đảm bảo ra đúng "Product 1" thay vì " Product 1 " hoặc có ký tự ẩn.
price: parseFloat(priceText.replace('$', '')): xử lý qua 2 bước:
.replace('$', '') — thay thế ký tự $ đầu tiên tìm thấy trong chuỗi bằng chuỗi rỗng, tức là loại bỏ dấu $. Ví dụ "$10.00" → "10.00".
parseFloat(...) — chuyển chuỗi số (có thể có phần thập phân) thành kiểu number thực sự trong JavaScript. Ví dụ parseFloat("10.00") → 10 (kiểu number, không còn là string nữa). Bắt buộc phải chuyển sang number vì bước sau bạn cần làm phép tính toán học (nhân, cộng) — nếu để nguyên dạng string thì các phép toán sẽ cho kết quả sai (JavaScript sẽ nối chuỗi thay vì cộng số, hoặc lỗi khi nhân).
quantity: parseInt(quantityText, 10): tương tự nhưng dùng parseInt thay vì parseFloat vì số lượng luôn là số nguyên (không có phần thập phân, ví dụ "2" → 2). Tham số thứ 2 (10) chỉ định cơ số thập phân (base 10) — đây là thói quen tốt nên luôn ghi rõ, dù trong JS hiện đại parseInt mặc định tự nhận diện base 10 nếu chuỗi không có tiền tố đặc biệt (như "0x" cho hex), nhưng ghi rõ tham số này giúp tránh các trường hợp hiếm gặp gây lỗi khó lường và code rõ ràng ý định hơn.
total: parseFloat(totalText.replace('$', '')): xử lý giống hệt price, áp dụng cho cột "Total" (thành tiền = đơn giá × số lượng của dòng đó).

        }

        return items;
    }
Sau khi vòng lặp chạy qua hết tất cả các dòng trong giỏ hàng, hàm trả về mảng items — chứa đầy đủ dữ liệu đã được parse sạch sẽ, đúng kiểu dữ liệu (string cho tên, number cho giá/số lượng/thành tiền) của từng sản phẩm trong giỏ.
Tóm lại luồng chạy: hàm tìm tất cả các dòng <tr> trong giỏ hàng → với mỗi dòng, thu hẹp phạm vi tìm kiếm chỉ trong dòng đó (row.locator('td')) để lấy đúng 4 ô dữ liệu (tên, giá, số lượng, thành tiền) theo đúng vị trí cột → đọc text thô của từng ô → làm sạch và chuyển đổi kiểu dữ liệu phù hợp (bỏ dấu $, chuyển string → number, trim khoảng trắng) → gom thành 1 object có cấu trúc rõ ràng cho mỗi dòng → trả về mảng các object đó, sẵn sàng để so sánh số lượng (câu b) và tính/so sánh tổng tiền (câu c) ở bước test tiếp theo.

    */

    // Lấy tổng tiền hiển thị cuối bảng giỏ hàng
    async getCartTotalPrice(): Promise<number> {
        const totalText = await this.page.locator(this.xpathTotalPrice).innerText();
        return parseFloat(totalText.replace('$', ''));
    }
    /* Giải thích chi tiết từng phần của method này:

async getCartTotalPrice(): Promise<number> {
async — hàm bất đồng bộ, cho phép dùng await bên trong.
Tên hàm: "lấy tổng tiền của giỏ hàng".
Kiểu trả về khai báo tường minh là Promise<number> — hàm sẽ trả về 1 Promise, khi resolve sẽ ra 1 giá trị kiểu number (số thực), khác với getCartItems() trước đó trả về cả 1 mảng object — ở đây chỉ cần 1 con số duy nhất (tổng tiền hiển thị cuối bảng), nên kiểu trả về đơn giản hơn nhiều.

    const totalText = await this.page.locator(this.xpathTotalPrice).innerText();
Tách làm các phần:

this.page.locator(this.xpathTotalPrice): trỏ tới phần tử <td class="total-price">$0.00</td> — nhớ lại HTML gốc của trang, đây là ô nằm trong <tfoot>, hiển thị tổng tiền toàn bộ giỏ hàng, được JavaScript của trang tự động cập nhật mỗi khi giỏ hàng thay đổi (totalPriceElement.textContent = \$${totalPrice.toFixed(2)}`;`).
Vì class="total-price" là duy nhất trên toàn trang (chỉ có 1 phần tử mang class này), locator này chắc chắn chỉ khớp với đúng 1 phần tử — không cần dùng .first()/.last()/.nth() như các trường hợp trước (khi locator khớp nhiều phần tử cùng lúc).
.innerText(): đọc nội dung text đang hiển thị của phần tử đó — ví dụ nếu tổng tiền hiện tại là $110, sẽ đọc được chuỗi "$110.00".
await vì .innerText() là thao tác bất đồng bộ (phải hỏi trình duyệt lấy nội dung thật sự đang render trên DOM).
Kết quả gán vào biến totalText — đặt tên có hậu tố "Text" để nhấn mạnh đây vẫn là chuỗi thô ("$110.00"), chưa phải số, giống quy ước đặt tên đã dùng ở getCartItems() (priceText, quantityText, totalText).

    return parseFloat(totalText.replace('$', ''));
}
Dòng này thực hiện 2 bước xử lý liên tiếp rồi trả về kết quả ngay lập tức (không cần gán qua biến trung gian vì hàm khá ngắn gọn):

.replace('$', ''): đây là method của string, tìm và thay thế lần xuất hiện đầu tiên của ký tự $ trong chuỗi bằng chuỗi rỗng '' — tức là loại bỏ ký hiệu tiền tệ. Ví dụ "$110.00".replace('$', '') → "110.00".
Lưu ý: .replace() với tham số đầu là string thường (không phải regex) chỉ thay thế 1 lần xuất hiện đầu tiên tìm thấy. Nếu chuỗi có nhiều ký tự $ thì chỉ ký tự đầu bị xóa — nhưng ở đây không vấn đề gì vì chuỗi tiền tệ chỉ có đúng 1 dấu $ duy nhất ở đầu.
parseFloat(...): chuyển chuỗi số (có thể có phần thập phân) thành giá trị number thực sự. Ví dụ parseFloat("110.00") → 110 (kiểu number). Đây là bước bắt buộc để có thể làm phép so sánh/tính toán bằng number ở bên ngoài (như toBeCloseTo, hay cộng dồn reduce trong bước kiểm tra tổng tiền câu c) — nếu giữ nguyên dạng string thì không thể so sánh/tính toán đúng theo ý nghĩa số học.
return trả về ngay giá trị number vừa tính được — đây chính là tổng tiền thực tế đang hiển thị trong giỏ hàng, ở dạng số, sẵn sàng để đem so sánh với tổng tiền tự tính toán từ các dòng sản phẩm (expectedTotal trong bước test Verify total price).
Tóm lại luồng chạy: hàm tìm đúng phần tử hiển thị tổng tiền cuối bảng giỏ hàng → đọc text hiển thị của nó (dạng chuỗi có dấu $) → loại bỏ ký hiệu $ → chuyển chuỗi số còn lại thành kiểu number → trả về, để dùng so sánh xem tổng tiền hiển thị trên UI có khớp với tổng tiền tính toán được từ dữ liệu từng dòng sản phẩm trong giỏ hay không.

    */
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
    /* Giải thích chi tiết từng phần của method này: getTodoItemLocator(taskText: string)

getTodoItemLocator(taskText: string) {
Đây không phải là hàm async — khác với hầu hết các method khác bạn đã viết trước đó (getVisibleNotesText, getCartItems...). Lý do: bên trong hàm này chỉ gọi this.page.locator(...), mà .locator() không phải là thao tác bất đồng bộ — nó chỉ tạo ra 1 "công thức tìm kiếm" (Locator object) trong bộ nhớ, chưa thực sự đi hỏi trình duyệt/DOM gì cả. Vì không có thao tác nào cần await, nên hàm không cần khai báo async.
Tham số taskText: string — nội dung task cần tìm (ví dụ "Todo 8"), được truyền vào từ bên ngoài để hàm này có thể tái sử dụng cho bất kỳ task nào, thay vì phải viết cứng riêng từng hàm getTodo8Locator(), getTodo5Locator()...
Không khai báo kiểu trả về tường minh — để TypeScript tự suy luận. Vì bên trong hàm return ra kết quả của this.page.locator(...), mà .locator() luôn trả về kiểu Locator (kiểu do chính thư viện Playwright định nghĩa), nên TypeScript tự suy ra kiểu trả về của hàm này là Locator — bạn có thể tự kiểm tra bằng cách hover chuột vào tên hàm trong VS Code.

    return this.page.locator(`//li[span[text()='${taskText}']]`);
Đây là dòng quan trọng nhất, tách làm các phần:

Template literal (chuỗi trong dấu backtick `): cho phép nhúng biến trực tiếp vào chuỗi bằng cú pháp ${...}. Ở đây ${taskText} sẽ được thay thế bằng giá trị thực tế của tham số truyền vào. Ví dụ nếu gọi getTodoItemLocator('Todo 8'), chuỗi xpath thực tế được tạo ra sẽ là:


//li[span[text()='Todo 8']]
Đây chính là kỹ thuật xây dựng locator động (dynamic locator) — thay vì viết cứng nhiều xpath riêng lẻ cho từng task cụ thể, bạn chỉ cần viết 1 "khuôn mẫu" xpath và đắp giá trị vào.

Phân tích cú pháp XPath //li[span[text()='...']] — đọc từ trong ra ngoài:

text()='${taskText}': đây là 1 hàm XPath kiểm tra nội dung text bên trong 1 phần tử có khớp chính xác (exact match) với chuỗi cho trước hay không. Ví dụ text()='Todo 8' chỉ khớp với phần tử có text đúng y hệt là "Todo 8", không khớp với "Todo 8 " (dư khoảng trắng) hay "Todo 80" (số khác).
span[text()='${taskText}']: tìm thẻ <span> mà nội dung text bên trong nó khớp đúng với taskText. Nhớ lại HTML gốc: <span>${task}</span> — đây chính là nơi hiển thị nội dung task (ví dụ "Todo 8").
//li[span[...]]: đây là cú pháp XPath dùng điều kiện lọc (predicate) đặt trong dấu ngoặc vuông [...] ngay sau li. Ý nghĩa: tìm tất cả thẻ <li> mà bên trong nó có chứa 1 thẻ <span> thỏa điều kiện phía trong ngoặc. Nói cách khác: "tìm <li> nào có <span> con với đúng nội dung taskText".
// ở đầu: tìm kiếm ở bất kỳ đâu trong toàn bộ document (không cần biết <li> đó nằm sâu bao nhiêu cấp, hay nằm trong <ul> nào).
Kết quả cuối cùng: locator này sẽ trỏ đúng tới cả thẻ <li> cha chứa task đó (không chỉ trỏ tới <span>) — điều này quan trọng vì bạn muốn kiểm tra "cả dòng todo" (bao gồm cả text lẫn các nút Edit/Delete đi kèm) có nằm trong viewport hay không, hoặc cả dòng có còn tồn tại trong DOM hay không — chứ không chỉ riêng phần chữ.

Vì sao cách này hoạt động đúng dù thứ tự <li> thay đổi sau khi xóa task: locator tìm theo nội dung (text()='Todo 8'), không tìm theo vị trí/index trong danh sách. Nên dù sau khi xóa các todo số lẻ, danh sách bị re-render lại và "Todo 8" có thể đổi vị trí (từ dòng thứ 8 xuống dòng thứ 4 chẳng hạn), locator này vẫn luôn tìm đúng <li> chứa "Todo 8", không bị ảnh hưởng.

Một điểm cần lưu ý (rủi ro tiềm ẩn khi dùng cách này):

Vì taskText được nhúng thẳng vào chuỗi xpath bằng template literal, nếu taskText chẳng may chứa ký tự nháy đơn (') — ví dụ bạn truyền vào "Todo's task" — thì chuỗi xpath tạo ra sẽ bị sai cú pháp (text()='Todo's task' — dấu ' giữa chuỗi làm gãy cú pháp XPath), gây lỗi khi Playwright thực thi. Trong bài này không gặp vấn đề vì nội dung chỉ đơn giản là "Todo 1", "Todo 2"... không có ký tự đặc biệt, nhưng đây là điều cần lưu ý nếu sau này bạn tái sử dụng hàm này với dữ liệu động, tự do nhập từ bên ngoài (input của người dùng thật) — khi đó cần có bước xử lý escape ký tự trước khi đưa vào xpath.
Tóm lại luồng chạy: hàm nhận vào nội dung text cần tìm → dùng template literal để "lắp ráp" chuỗi thành 1 xpath động, xpath này tìm đúng thẻ <li> có chứa <span> với nội dung khớp chính xác với text truyền vào → trả về Locator đó (chưa truy vấn DOM ngay, chỉ là "công thức tìm kiếm") — để bên ngoài, mỗi khi bạn gọi 1 action lên locator này (như .toBeInViewport(), .toHaveCount(), .click()...), Playwright mới thực sự đi tìm và thao tác trên phần tử thật trong DOM.

    */

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
    /* Giải thích chi tiết từng phần của method này:

async getVisibleNotesText(): Promise<string[]> {
async khai báo đây là 1 hàm bất đồng bộ (asynchronous) — bên trong có thể dùng await để chờ các thao tác mất thời gian (như thao tác với trang web) hoàn thành trước khi chạy tiếp.
getVisibleNotesText là tên method — đặt tên rõ nghĩa: "lấy text của các note đang hiển thị (trên UI)".
: Promise<string[]> là kiểu dữ liệu trả về. Vì hàm là async, nó luôn trả về 1 Promise (một "lời hứa" sẽ có giá trị sau này). <string[]> nghĩa là khi Promise đó resolve (hoàn thành), giá trị bên trong sẽ là 1 mảng các chuỗi (string[]) — ở đây là mảng nội dung text của từng note.

    const notes = await this.page.locator(this.xpathNotesList).all();
this.page.locator(this.xpathNotesList) tạo ra 1 Locator — không phải lấy ngay phần tử, mà giống như một "công thức tìm kiếm" trỏ tới tất cả các thẻ <li> khớp với xpath //ul[@id='notes-list']/li (mỗi note hiển thị trên trang là 1 <li>).
.all() là method của Locator dùng để lấy ra một mảng các Locator riêng lẻ, mỗi phần tử trong mảng tương ứng với 1 <li> cụ thể đang tồn tại trên trang tại thời điểm gọi. Ví dụ nếu có 3 note đang hiển thị (sau khi search), .all() trả về mảng gồm 3 Locator, mỗi cái trỏ đúng 1 note.
.all() trả về 1 Promise nên phải có await phía trước để "chờ" Playwright query xong DOM rồi mới lấy được mảng thật sự, gán vào biến notes.
Lưu ý: khác với locator.locator(...) (vẫn là 1 locator động, tự động re-query mỗi lần dùng), .all() chụp lại (snapshot) danh sách phần tử tại đúng thời điểm gọi — nếu sau đó DOM thay đổi (thêm/xóa note), mảng notes này sẽ không tự cập nhật.

    const notesText: string[] = [];
Khai báo 1 mảng rỗng kiểu string[] để chứa kết quả — text của từng note sẽ được đẩy (push) vào đây.

    for (const note of notes) {
Vòng lặp for...of duyệt qua từng phần tử trong mảng notes (chính là từng Locator ứng với từng <li>).
Biến note trong mỗi lần lặp là 1 Locator trỏ tới đúng 1 note.

        const text = await note.innerText();
note.innerText() lấy nội dung text hiển thị (visible text) bên trong thẻ <li> đó — bao gồm cả phần title (<strong>) và content (<p>) vì cả hai đều nằm trong cùng 1 <li>.
Đây cũng là 1 thao tác bất đồng bộ (phải hỏi trình duyệt để lấy text thật), nên cần await.
innerText() khác với textContent() ở chỗ: innerText() chỉ lấy text đang thực sự hiển thị (tôn trọng CSS như display: none), còn textContent() lấy tất cả text kể cả phần bị ẩn. Trong trường hợp này dùng innerText() là hợp lý vì mình muốn kiểm tra đúng những gì người dùng nhìn thấy trên UI.

        notesText.push(text.toLowerCase());
.toLowerCase() chuyển toàn bộ text về chữ thường trước khi lưu.
Lý do quan trọng: ở bước trước bạn đã xem code JavaScript của trang web, cơ chế search filter theo title.toLowerCase().includes(searchText) — tức là so sánh không phân biệt hoa/thường. Nếu không lowercase text ở đây, khi so sánh với keyword ở bước assert (expect(text).toContain(keyword)) có thể bị sai lệch nếu title/content có chữ hoa mà keyword bạn gõ toàn chữ thường (hoặc ngược lại).
.push(...) thêm giá trị vào cuối mảng notesText.

    }
    return notesText;
}
Sau khi vòng lặp chạy xong qua tất cả note, hàm trả về mảng notesText — chứa text (đã lowercase) của toàn bộ note đang hiển thị trên UI.
Vì hàm là async, giá trị notesText sẽ tự động được "bọc" vào trong 1 Promise<string[]>, khớp với kiểu trả về đã khai báo ban đầu.
Tóm lại luồng chạy: hàm này tìm tất cả <li> đang hiển thị trong danh sách note → với mỗi <li>, lấy text hiển thị và chuyển về chữ thường → gom tất cả lại thành 1 mảng string trả về, để bên ngoài (trong test) có thể duyệt qua từng note và kiểm tra xem có chứa keyword tìm kiếm hay không.
***
Không khai báo kiểu trả về (: Promise<string[]>) vẫn hoàn toàn chạy được bình thường — không có lỗi gì cả. Giải thích lý do:

TypeScript tự suy luận kiểu (type inference):

Vì hàm là async, TypeScript biết chắc chắn hàm sẽ trả về 1 Promise.
Nhìn vào bên trong hàm, bạn khai báo const notesText: string[] = [] và cuối cùng return notesText; — TypeScript tự suy ra kiểu trả về thực sự là Promise<string[]>, y hệt như khi bạn khai báo tường minh.
Bạn có thể tự kiểm chứng: hover chuột vào tên hàm getVisibleNotesText trong VS Code, tooltip vẫn hiện đúng Promise<string[]> dù không viết ra.
Vậy khi nào nên viết tường minh, khi nào không cần:

Nếu code trong thân hàm đơn giản, rõ ràng (như trường hợp này) → không viết cũng không sao, TypeScript tự lo được.
Nên viết tường minh khi:
Hàm dài, logic phức tạp, nhiều nhánh return khác nhau → viết rõ kiểu trả về giúp người đọc (và cả bạn sau này) hiểu ngay hàm trả về gì mà không cần đọc hết thân hàm.
Muốn TypeScript báo lỗi sớm nếu bạn vô tình return sai kiểu (ví dụ lỡ tay return number[] thay vì string[]) — có khai báo tường minh thì lỗi sẽ hiện ngay tại chỗ khai báo, dễ phát hiện hơn.
Đây là method public trong 1 class dùng chung (như POM class của bạn) — các bạn học viên khác dùng lại class này sẽ dễ biết cách dùng hơn nếu nhìn signature là thấy ngay kiểu trả về, không cần đọc code bên trong.
Kết luận: Bỏ : Promise<string[]> không ảnh hưởng gì tới việc chạy code, chỉ là bớt đi phần "tài liệu tường minh" cho người đọc. Với method ngắn gọn thế này thì bỏ cũng ổn, nhưng giữ lại vẫn là thói quen tốt cho code dễ bảo trì.
***/

};

