export interface CustomerRequest {
    firstName: string;
    lastName: string;
    companyName: string;
    ivaCondition: string;
    email: string;
    birthDate: string;
    //documentType: DocumentType; //Cambiar a tipo de dato acorde dependiendo si usamos Enum o tabla aparte
    documentType:documentType;
    documentNumber: string; 
    address: string;
    phoneNumber: string;
    customerType: string;
}

export enum EnumDocumentType {
    DNI=1,
    CUIT,
    CUIL,
     PASSAPORTE,
     LC,
     LE
}
export class documentType {
    idDocumentType : number= 1;
    description: string='DNI';
  }