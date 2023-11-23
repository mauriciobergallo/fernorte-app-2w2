import { DocumentType } from "./documentType";

export interface CustomerRequest {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    ivaCondition: string;
    email: string;
    birthDate: string;
    idDocumentType: number; 
    documentNumber: string; 
    address?: string;
    phoneNumber: string;
    customerType: string;
}
