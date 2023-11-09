import { Role } from "./role";

export class UserCheckLogin {
    first_login: boolean = false;
    password_reset: boolean = false;
    username: string = "";
    document_number: string = "";
    roles: Role[] = [];
}