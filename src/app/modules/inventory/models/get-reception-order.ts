export interface GetReceptionOrderDto {
    id_reception_order: number;
    reception_date: string;
    reception_hour: string;
    state: string;
    purchase_order_number: number;
    id_supplier : string;
    supplier_name : string;
}