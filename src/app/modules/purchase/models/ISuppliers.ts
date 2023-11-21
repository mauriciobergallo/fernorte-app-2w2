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

export interface ISupplierAndProduct {
  supplierName: string;
  productName: string;
  price: number;
}
