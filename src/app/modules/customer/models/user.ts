export interface User {
    id_user: number;
    employee_documentNumber: string;
    email: {
      id: number;
    }; //cambiar a solo string de mail cuando hagan los cambios xd
    username: string;
    user_password: string;
    is_active: boolean;
    password_reset: boolean;
    first_login: boolean;
  }
  