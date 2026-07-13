import { APIRequestContext, expect } from "@playwright/test";

export class UserApiPage {
    request: APIRequestContext;
    baseUrl: string;
    token: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = 'https://material.playwrightvn.com/api/user-management/v1';
        this.token = '';
    }

    async login(email: string, password: string) {
        const loginResponse = await this.request.post(`${this.baseUrl}/login.php`, {
            data: {
                "email": email,
                "password": password
            }
        });
        expect(loginResponse.status()).toBe(200);

        const loginResponsejson = await loginResponse.json();
        this.token = loginResponsejson.data.token;
        return loginResponsejson;
    }

    async createUser(name: string, email: string, password: string, facebook: string, avatar: string, hobbies: string, role: string) {
        const createResponse = await this.request.post(`${this.baseUrl}/users.php`, {
            headers: {
                authorization: `Bearer ${this.token}`
            },
            data: {
                "name": name,
                "email": email,
                "password": password,
                "facebook": facebook,
                "avatar": avatar,
                "hobbies": hobbies,
                "role": role
            }
        });
        expect(createResponse.status()).toBe(201);
        
        const createResponseJson = await createResponse.json();
        return createResponseJson;
    }

    async getUsersList(){
        const usersListResponse = await this.request.get(`${this.baseUrl}/users.php`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        });
        expect(usersListResponse.status()).toBe(200);

        const usersListResponseJson = await usersListResponse.json();
        return usersListResponseJson;
    }

    async deleteUser(id: number){
        const deleteResponse =  await this.request.delete(`${this.baseUrl}/users.php`, {
            headers: {
                authorization: `Bearer ${this.token}`
            },
            data: {
                "id": id
            }
        });
        expect(deleteResponse.status()).toBe(200);

        const deleteResponseJson = await deleteResponse.json();
        return deleteResponseJson;
    }

};