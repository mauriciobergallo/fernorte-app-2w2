export interface ISupliers {
  id: number;
  socialReason: string;
  fantasyName: string;
  cuit: string;
  adress: string;
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

export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export interface IProduct2 {
  id: number;
  name: string;
  price: number;
}


// export interface ISupplierProduct { 
//   supplier: ISupliers;
//   products: IProduct2[];
// }