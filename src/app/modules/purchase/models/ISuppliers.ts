// --------------------------------------------------- SUPPLIERS
/* export interface ISupplier {
  id: number;
  socialReason: string;
  fantasyName: string;
  cuit: string;
  adress: string;
  active?: boolean;
} */

/* export interface IContacts {
  id: number;
  contacts: Contact[]; // An array of Contact objects
}
export interface Contact {
  id: number;
  contactType: string;
  contactValue: string;
} */

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


//----------------NUEVO
// --------------------------------------------------- SUPPLIERS
export interface ISupplier {
  id: number;
  socialReason: string;
  fantasyName: string;
  cuit: string;
  address: string;
  active?: boolean;
}

export interface IContact {
  id: number;
  contactType: string;
  contactValue: string;
}


export interface IProduct {
  id_product: number;
  name: string;
  description: string;
  unit_price: number;
  stock_quantity: number;
  unit_of_Measure: string;
  id_category: number;
  url_image: string;
  price: number;
}

export interface ISupplierProduct {
  idSupplier: number;
  idProduct: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ISupplierPrice {
  id: number;
  socialReason: string;
  fantasyName: string;
  cuit: string;
  address: string;
  active: boolean;
  price: number;
}

export interface IProductSupplierResponse {
  suppliers: ISupplierPrice[]
}