// --------------------------------------------------- SUPPLIERS
export interface ISupplier {
  id: number;
  socialReason: string;
  fantasyName: string;
  cuit: string;
  adress: string;
  active?: boolean;
}
export interface IContacts {
  id: number;
  contacts: Contact[]; // An array of Contact objects
}
export interface Contact {
  id: number;
  contactType: string;
  contactValue: string;
}

// ---------------------------------------------------- PRODUCTS
export interface IProduct {
  id: number;
  name: string;
  price: number;
}
export interface IProduct2 {
  name: string;
  price: number;
  active: boolean;
  imageUrl: string;
  productId: number;
  supplierId: number;
  observations: string;
}

export interface ISupplierProduct {
  idSupplier: number;
  idProduct: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ISupplierAndProduct {
  supplierName: string;
  productName: string;
  price: number;
}

export interface IProductBySupplierDTO {
  supplierId: number;
  productId: number;
  name: string;
  price: number;
  observations: string;
  active: true;
}

  