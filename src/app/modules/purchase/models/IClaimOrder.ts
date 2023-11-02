// -------------------------------------------- CLAIM ORDER
export interface ClaimOrderRequest {
    purchaseOrderId: number;
    claimDate: Date;
    claimOrderDetails: ClaimOrderDetailRequest[];
    supplierId: number;
    observation: string;
}

export interface ClaimOrderResponse {
    id: number;
    purchaseOrderId: number;
    claimDate: Date;
    claimOrderDetails: ClaimOrderDetailResponse[];
    claimStatus: ClaimStatus;
    supplierId: number;
    observation: string;
}

// ------------------------------------------- CLAIM ORDER DETAIL
export interface ClaimOrderDetailRequest {
    claimOrderId: number;
    productId: number;
    quantity: number;
    observation: string;
}

export interface ClaimOrderDetailResponse {
    id: number;
    claimOrderId: number;
    productId: number;
    quantity: number;
    observation: string;
}

// -------------------------------------------- TYPES

export type ClaimStatus = 'RECOGNIZED' | 'UNRECOGNIZED'


  
  
  
  
  