import { Email } from "./email";
import { Role } from "./role";

export interface User {
    id_user: number;
    first_login: boolean;
    password_reset: boolean;
    document_number: string;
    email: Email;
    username: string;
    user_password: string;
    is_active: boolean;
    roles: Role[];
  }
