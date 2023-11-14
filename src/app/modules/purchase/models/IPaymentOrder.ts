
// ---------------------------------------------- PAYMENT ORDER
export interface PaymentOrderRequest {
    date: Date;
    paymentDetails: PaymentOrderDetailsRequest[];
    employeeId: number;
    observation: string;
}

export interface PaymentOrderResponse {
    id: number;
    supplierId: number;
    date: Date;
    paymentDetails: PaymentOrderDetailResponse[];
    paymentState: PaymentState;
    employeeId: number;
    observation: string;
}

// ----------------------------------------------- PAYMENT ORDER DETAIL
export interface PaymentOrderDetailsRequest {
    purchaseOrderId: number;
    paymentOrderId: number;
    amount: number;
    paymentMethod: PaymentMethod;
    observation: string;
}

export interface PaymentOrderDetailResponse {
    id: number;
    purchaseOrderId: number;
    paymentOrderId: number;
    amount: number;
    paymentMethod: PaymentMethod;
    observation: string;
}

// ------------------------------------------------ TYPES

export type PaymentMethod = 'CASH' | 'DEBIT' | 'CREDIT'
export type PaymentState = 'GENERATED' | 'PAID' | 'ACCEPTED' | 'CANCELLED'
export type PaymentFlow = 'GRID' | 'METHODS' | 'PREVIEW'

