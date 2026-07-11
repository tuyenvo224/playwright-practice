import { expect, test } from '@playwright/test';
import { TodoPage } from './pom/01-pom';

test('Add todo list', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await test.step('Navigate Material website', async () => {
        await todoPage.openMaterialPage();
    });

    await test.step('Click Bai hoc 3', async () => {
        await todoPage.gotoPage('Bài 3')
    });

    // add 100 todo - truyền vào n=100
    await test.step('Add new tasks', async () => {
        await todoPage.fillTodo(100);
    });

    // Gọi hàm delete todo lẻ theo index - truyền vào n-1=100-1=99
    // await test.step('Delete odd tasks - index', async () => {
    //     await todoPage.deleteTask(99);
    // });

    // Gọi hàm delete todo lẻ theo tên task - truyền vào n=100
    await test.step('Delete odd tasks - task name', async () => {
        await todoPage.deleteOddTasks(100);
    });

    await test.step('Verify Todo 90 is in viewport', async () => {
        const todo90 = todoPage.getTodoItemLocator('Todo 90');
        // Cuộn trang tới phần tử này trước khi kiểm tra
        await todo90.scrollIntoViewIfNeeded();
        await expect(todo90).toBeInViewport();
    });

    await test.step('Verify Todo 21 is removed from DOM', async () => {
        const todo21 = todoPage.getTodoItemLocator('Todo 21');
        await expect(todo21).toHaveCount(0);
    });
});