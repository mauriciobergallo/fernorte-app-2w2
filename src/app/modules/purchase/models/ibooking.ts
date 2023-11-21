export interface IBooking {
    orders: Order[];
    id_supplier: number;
}
  
export  interface Order {
    details: OrderDetail[];
    receptiondate?: string;
    receptionhour?: string;
}

  
export interface OrderDetail {
    quantity: number;
    id_product: number;
}
  

