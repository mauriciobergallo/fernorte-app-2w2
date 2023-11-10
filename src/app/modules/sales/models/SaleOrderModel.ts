import { DetailsSaleOrderModel } from "./DetailsSaleOrderModel";
export class SaleOrderModel {
    idSaleOrder?: number = 0;
    idSeller?: number = 0;
    firstNameSeller?: string = "";
    lastNameSeller?: string = "";
    idClient?: number = 0;
    firstNameClient?: string = "";
    lastNameClient?: string = "";
    companyName?: string = "";
    dateOfIssue?: string = "";
    dateOfExpiration?: string = "";
    stateSaleOrder?: string = "";
    detailSalesOrder?: DetailsSaleOrderModel[] = [];
}
