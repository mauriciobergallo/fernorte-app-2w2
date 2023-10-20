export interface CustomerRequest {
    firstName: string;
    lastName: string;
    companyName: string;
    ivaCondition: string;
    email: string;
    birthDate: Date;
    documentType: number; //Cambiar a tipo de dato acorde dependiendo si usamos Enum o tabla aparte
    documentNumber: string; 
    address: string;
    phoneNumber: string;
    customerType: string;
}