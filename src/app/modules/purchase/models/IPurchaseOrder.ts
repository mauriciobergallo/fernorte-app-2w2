import { ClaimOrderDetailResponse } from './IClaimOrder';
import { PaymentOrderDetailResponse } from './IPaymentOrder';

// ------------------------------------------------ PURCHASE ORDER
export interface PurchaseOrderRequest {
    supplierId: number;
    date: Date;
    total: number;
    employeeId: number;
    observation: string;
    billUrl: string;
    purchaseDetails: PurchaseOrderDetailRequest[];
}

export interface PurchaseOrderResponse {
    id: number;
    supplierId: number;
    date: Date;
    purchaseStatus: PurchaseStatus;
    total: number;
    employeeId: number;
    observation: string;
    billUrl: string;
    purchaseDetails: PurchaseOrderDetailResponse[];
    paymentDetails: PaymentOrderDetailResponse[];
    claimOrder: ClaimOrderDetailResponse[];
}
export interface PurchaseOrderBack{
  supplierName: string;
  date: Date;
  purchaseStatus: PurchaseStatus;
  total: number;
  employeeName: string;
  observation: string;
  billUrl: string;
}

export interface PurchaseOrderFront{
    supplierName: string;
    date: Date;
    purchaseStatus: PurchaseStatus;
    total: number;
    employeeName: string;
    observation: string;
    billUrl: string;
}

// ----------------------------------------------- PURCHASE ORDER DETAIL
export interface PurchaseOrderDetailRequest {
    purchaseOrderId: number;
    productSupplierId: number;
    quantityReceived: number;
    deliveryDate: Date;
    observation: string;
}

export interface PurchaseOrderDetailResponse {
    id: number;
    purchaseOrderId: number;
    productSupplierId: number;
    quantityReceived: number;
    deliveryDate: Date;
    observation: string;

}

// -------------------------------------------- TYPES

export type PurchaseStatus = 'GENERATED' | 'SENT' | 'ACCEPTED' | 'CANCELLED'






