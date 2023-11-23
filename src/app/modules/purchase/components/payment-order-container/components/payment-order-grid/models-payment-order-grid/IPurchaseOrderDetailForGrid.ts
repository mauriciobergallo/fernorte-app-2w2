export interface IPurchaseOrderDetail {
    id: number,
    purchaseOrderId: number,
    productSupplierId: number,
    quantityReceived: number,
    deliveryDate: string,
    observation: string
}