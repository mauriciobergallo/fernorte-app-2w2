import { DocumentType } from "./documentType";

export interface CustomerRequest {
    first_name: string;
    last_name: string;
    company_name: string;
    iva_condition: string;
    email: string;
    birth_date: string;
    id_document_type: number; 
    document_number: string; 
    address: string;
    phone_number: string;
    customer_type: string;
}