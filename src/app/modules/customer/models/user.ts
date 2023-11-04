import { Role } from "./role";

export interface User {
    id_user: number;
    password_reset: boolean;
    username: string;
    documentNumber: string;
    roles: Role[];
}
