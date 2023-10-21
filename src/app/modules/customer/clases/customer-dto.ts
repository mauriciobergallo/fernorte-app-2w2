export class CustomerDto {
  
    firstName: string='';
    lastName: string='';
    companyName: string='';
    ivaCondition: string='';
    email: string='';
    phoneNumber: string='';
    address: string='';    
    documentType: DocumentType= DocumentType.DNI;
    documentNumber: string='';
    customerType: string='';
    birthDate: Date= new Date();   
   
}

export enum DocumentType {
    DNI,
    CUIT,
    CUIL,
    PASSAPORTE,
    LC,
    LE
}
  