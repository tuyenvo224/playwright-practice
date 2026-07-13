import { expect, test } from '@playwright/test';
import { TodoApiPage } from './01-todo.api.page';

test('Get all todo', async ({ request }) => {
    const todoApiPage = new TodoApiPage(request);
    const responseJson = await todoApiPage.getAll();

    expect(responseJson.todos.length).toEqual(152);

});

test('Get todo with id =226', async ({ request }) => {
    const todoApiPage = new TodoApiPage(request);
    const responseJson = await todoApiPage.getTodo(226);

    console.log(responseJson);
    expect(responseJson.todo.title).toContain("Tuyen");
    expect(responseJson.todo.priority).toEqual("high");

});