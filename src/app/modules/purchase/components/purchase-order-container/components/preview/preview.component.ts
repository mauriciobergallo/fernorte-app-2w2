import { Component, Input } from '@angular/core';
import { ISupliers} from 'src/app/modules/purchase/models/ISuppliers';
import { SupliersService } from '../../../supplier/services/supliers.service';
import {PurchaseOrderDetailResponse} from 'src/app/modules/purchase/models/IPurchaseOrder';
import {PaymentOrderDetailResponse} from 'src/app/modules/purchase/models/IPaymentOrder';
import {ClaimOrderDetailResponse} from 'src/app/modules/purchase/models/IClaimOrder';

@Component({
  selector: 'fn-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {

  id: number = 0;;
  @Input() supplierId: number = 0;;
  creationDate: string = ""; // Change to Date if it's a Date type
  purchaseStatus: string ="";
  total: number = 0; // Assuming total is of type number
  @Input() employeeId: number = 0;
  observation: string ="";
  billUrl: string ="";
  @Input() purchaseDetails: PurchaseOrderDetailResponse[] = [
    {
      id: 1,
      purchaseOrderId: 1001,
      productSupplierId: 2001,
      quantityReceived: 10,
      deliveryDate: new Date('2023-10-28'),
      observation: 'Received in good condition.',
    },
    {
      id: 2,
      purchaseOrderId: 1001,
      productSupplierId: 2002,
      quantityReceived: 5,
      deliveryDate: new Date('2023-10-28'),
      observation: 'Partial delivery, awaiting the rest.',
    },
    {
      id: 3,
      purchaseOrderId: 1001,
      productSupplierId: 2003,
      quantityReceived: 8,
      deliveryDate: new Date('2023-10-28'),
      observation: 'Quality issue, need to return some items.',
    },
  ];
  paymentDetails: PaymentOrderDetailResponse[] = [
    {
      id: 1,
      purchaseOrderId: 101,
      paymentOrderId: 201,
      amount: 100.0,
      paymentMethod: "CREDIT",
      observation: 'Payment received on time',
    },
    {
      id: 2,
      purchaseOrderId: 102,
      paymentOrderId: 202,
      amount: 150.5,
      paymentMethod: "CREDIT",
      observation: 'Partial payment made',
    },
    {
      id: 3,
      purchaseOrderId: 103,
      paymentOrderId: 203,
      amount: 75.25,
      paymentMethod: "CREDIT",
      observation: 'Cash payment with change',
    },
    {
      id: 4,
      purchaseOrderId: 104,
      paymentOrderId: 204,
      amount: 90.0,
      paymentMethod: "CASH",
      observation: 'Payment received on time',
    },
  ];
  claimOrders: ClaimOrderDetailResponse[] =[];

 supplier:ISupliers = {
    id: 1,
    socialReason: "ABC Suppliers Inc.",
    fantasyName: "ABC Stores",
    cuit: "30-12345678-9",
    adress: "123 Main Street, Cityville"
  };
   currentDate: Date = new Date();

  constructor(private supplierService : SupliersService){
    
  }

  ngOnInit(){
    this.supplierService.getSuplier(this.supplierId).subscribe((data: ISupliers) => {
      this.supplier = data; 
    });

  }


}
