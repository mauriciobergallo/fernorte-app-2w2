export interface IBooking {
  groupings: Grouping[];
  id_supplier: number;
}

export interface Grouping {
  groupingItems: GroupingItem[];
  receptiondate?: string;
  receptionhour?: string;
}

export interface GroupingItem {
  quantity: number;
  id_product: number | string;
}

// export interface IBooking {
//   orders: Order[];
//   id_supplier: number;
// }

// export interface Order {
//   details: OrderDetail[];
//   receptiondate?: string;
//   receptionhour?: string;
// }

// export interface OrderDetail {
//   quantity: number;
//   id_product: number;
// }
