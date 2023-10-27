import { Role } from "./role";

export class User {
    first_login: boolean;
    password_reset: boolean;
    username: string;
    documentNumber: string;
    roles: Role[];
}
