export interface Email {
    idEmail: number;
    email: string;
    emailPassword: string;
    isChangePasswordUser: boolean;
    createdAt: Date;
    isActive: boolean;
  }