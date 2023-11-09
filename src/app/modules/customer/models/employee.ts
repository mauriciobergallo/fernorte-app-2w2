export interface Employee{
    idEmployee?:number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    idDocumentType: number; //Cambiar a tipo de dato acorde dependiendo si usamos Enum o tabla aparte
    idDocumentNumber: string; 
    address: string;
    phoneNumber:string;
    personalEmail: string; //Test

}