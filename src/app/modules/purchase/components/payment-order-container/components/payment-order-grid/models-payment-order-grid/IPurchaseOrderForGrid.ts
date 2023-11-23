import { IPurchaseOrderDetail } from './IPurchaseOrderDetailForGrid';

export interface IPurchaseOrder {
    id: number;
    supplierId: number,
    date: Date,
    purchaseStatus: string,
    total: number,
    employeeId: number,
    observation: string,
    billUrl: string,
    purchaseDetails: IPurchaseOrderDetail[];
    selected: boolean; // Nueva propiedad para seguimiento de selección
    paymentMethod:string;
}