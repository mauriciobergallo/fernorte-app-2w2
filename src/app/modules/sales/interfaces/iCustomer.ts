export interface ICustomer {
    firstName: string;
    lastName: string;
    companyName?: string;
    ivaCondition: string;
    email: string;
    phoneNumber: string;
    address: string;
    documentNumber: string;
    documentType: string;
    customerType: string;
    discountFactor: number;
    customerCategory?: string;
  }