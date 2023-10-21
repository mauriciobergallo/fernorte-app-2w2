export interface Employee{
    firstName: string;
    lastName: string;
    birthDate: Date;
    documentType: number; //Cambiar a tipo de dato acorde dependiendo si usamos Enum o tabla aparte
    documentNumber: string; 
    address: string;
    phoneNumber:string;
    personalEmail: string; //Test
}