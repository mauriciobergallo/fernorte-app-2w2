export interface IUpdatedDetailDto {
  id_reception_order_detail: number;
  product_name: string;
  agreed_quantity: number;
  received_quantity: number;
  is_broken: boolean;
  remarks: string;
}
