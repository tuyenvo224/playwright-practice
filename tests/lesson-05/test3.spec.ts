import { test } from '@playwright/test';

test ('Add todo list', async ({ page}) => {
    await test.step('Navigate Material website', async() => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Click Bai hoc 3', async() => {
        await page.locator("//a[@href='03-xpath-todo-list.html']").click();
    });
    
    for(let i=1; i<=10; i++){
        await test.step('Input new task', async() => {
        await page.locator("//input[@id='new-task']").fill(`Todo ${i}`);
    });

    await test.step('Click Add task', async() => {
        await page.locator("//button[@id='add-task']").click();
    });
    };
    
    await test.step('Delete task i', async() => {
        page.on('dialog', async dialog => dialog.accept()); // Nhấn OK trên dialog Delete
        for(let i=9; i>=0; i--){ // xóa từ cuối về đầu để tránh việc xóa làm thay đổi index
            if (i%2===0){
                await page.locator(`//button[@onclick='deleteTask(${i})']`).click();
            }}
    });

})