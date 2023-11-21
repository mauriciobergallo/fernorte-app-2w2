export interface ICustomer {
    first_name: string;
    last_name: string;
    company_name?: string;
    iva_condition: string;
    email: string;
    phone_number: string;
    address: string;
    document_number: string;
    document_type: string;
    customer_type: string;
    discount_factor: number;
    customer_category?: string;
  }