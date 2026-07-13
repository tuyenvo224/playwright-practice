import { APIRequestContext, expect } from "@playwright/test";

export class TodoApiPage {
    request: APIRequestContext;
    baseUrl: string;

    constructor(request: APIRequestContext){
        this.request=request;
        this.baseUrl='https://material.playwrightvn.com/api/todo-app/v1';
    }

    // get all todo
    async getAll(){
        const response = await this.request.get(`${this.baseUrl}/todos.php`);
        expect(response.status()).toBe(200);

        const responseJson = response.json();
        return responseJson;
    }

    // get single todo
    async getTodo(id: number){
        const response = await this.request.get(`${this.baseUrl}/todo.php?id=${id}`);
        expect(response.status()).toBe(200);

        const reponseJson = response.json();
        return reponseJson;
    }

    // create todo

    // update todo

    // update partial todo

    // delete todo
}