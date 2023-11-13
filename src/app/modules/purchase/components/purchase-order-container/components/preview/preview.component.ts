import { Component, Input } from '@angular/core';
import { ISupplier, ISupplierProduct} from 'src/app/modules/purchase/models/ISuppliers';
import { SupliersService } from '../../../supplier/services/supliers.service';
import {PurchaseOrderDetailRequest, PurchaseOrderDetailResponse} from 'src/app/modules/purchase/models/IPurchaseOrder';
import {PaymentOrderDetailResponse} from 'src/app/modules/purchase/models/IPaymentOrder';
import {ClaimOrderDetailResponse} from 'src/app/modules/purchase/models/IClaimOrder';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';

@Component({
  selector: 'fn-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {

  id: number = 0;;
   supplierId: number = 0;;
  creationDate: string = ""; // Change to Date if it's a Date type
  purchaseStatus: string ="";
  total: number = 0; // Assuming total is of type number
   employeeId: number = 0;
  observation: string ="";
  billUrl: string ="";
  cardProducts: ISupplierProduct[] = [{
    idSupplier: 1,
    idProduct: 2,
    name: 'Taladro',
    price: 254,
    quantity: 15,
  },
  {
    idSupplier: 1,
    idProduct: 2,
    name: 'Taladro',
    price: 254,
    quantity: 15,
  },
  {
    idSupplier: 1,
    idProduct: 2,
    name: 'Taladro',
    price: 254,
    quantity: 15,
  }];
  purchaseDetails:PurchaseOrderDetailResponse[] = []

 

 supplier:ISupplier = {
    id: 1,
    socialReason: "Proveedor",
    fantasyName: "Cachito",
    cuit: "20323730019",
    adress: "Alberdi 342"
  };
   currentDate: Date = new Date();

  constructor(private purchaseOrderService : PurchaseOrderServiceService){
    
  }

  ngOnInit(){
    
    this.purchaseOrderService.getSupplierSelected().subscribe((data: ISupplier) => {
      // this.supplier = data; 
    });
    
    // this.cardProducts = this.purchaseOrderService.getCardProductList();
    
  const purchaseDetails = this.cardProducts.map((product) => ({
  id: 0,  // You can set the appropriate values for these fields
  purchaseOrderId: 0,  // You can set the appropriate values for these fields
  productSupplierId: product.idSupplier,
  quantityReceived: product.quantity,
  deliveryDate: new Date(),  // You can set the appropriate date
  observation: ''
}));
  this.purchaseDetails = purchaseDetails;


  }


}
