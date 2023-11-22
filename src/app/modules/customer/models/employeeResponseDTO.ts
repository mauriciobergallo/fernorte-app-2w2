export interface EmployeeResponseDTO{
    idEmployee: number;
    firstName: string;
    lastName: string;
    birthDate: string
    documentType: number | string ; //Cambiar a tipo de dato acorde dependiendo si usamos Enum o tabla aparte
    documentNumber: string; 
    address: string;
    phoneNumber:string;
    personalEmail: string; //Test
    isActive: boolean;
}