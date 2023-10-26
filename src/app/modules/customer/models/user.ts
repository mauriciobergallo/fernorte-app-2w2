import { Email } from "./email";
import { Role } from "./role";

export interface User {
    idUser: number;
    employeeDocumentNumber: string;
    email: Email;
    userName: string;
    userPassword: string;
    isActive: boolean;
    roles: Role[];
  }