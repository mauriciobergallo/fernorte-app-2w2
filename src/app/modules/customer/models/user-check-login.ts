import { Role } from "./role";

export class UserCheckLogin {
    first_login: boolean;
    password_reset: boolean;
    username: string;
    document_number: string;
    roles: Role[];
}