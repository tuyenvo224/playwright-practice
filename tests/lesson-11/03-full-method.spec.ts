import { test } from '@playwright/test';

test.describe('Full method', async () => {
    let id: any;
    test('1. Create todo', async ({ request }) => {
        const response = await request.post('https://material.playwrightvn.com/api/todo-app/v1/todo.php', {
            data: {
                "title": "Tuyen test add todo",
                "description": "Write comprehensive docs for the API",
                "status": "pending",
                "priority": "high",
                "due_date": "2025-10-25T17:00:00",
                "user_id": 1
            }
        });

        const reponseJson = await response.json();
        console.log(reponseJson);
        id = reponseJson.todo.id;
        console.log(id);
    });

    test('2. Delete todo', async ({ request }) => {
        const responseDelete = await request.delete('https://material.playwrightvn.com/api/todo-app/v1/todo.php', {
            data: {
                "id": id
            }
        });

        const responseDeleteJson = await responseDelete.json();
        console.log(responseDeleteJson);
    });
});