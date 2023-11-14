import { Component, Input } from '@angular/core';
import {
  ISupplier,
  ISupplierProduct,
} from 'src/app/modules/purchase/models/ISuppliers';
import { SupliersService } from '../../../supplier/services/supliers.service';
import {
  PurchaseOrderDetailRequest,
  PurchaseOrderDetailResponse,
} from 'src/app/modules/purchase/models/IPurchaseOrder';
import { PaymentOrderDetailResponse } from 'src/app/modules/purchase/models/IPaymentOrder';
import { ClaimOrderDetailResponse } from 'src/app/modules/purchase/models/IClaimOrder';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';

@Component({
  selector: 'fn-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent {
  id: number = 0;
  supplierId: number = 0;
  creationDate: string = ''; // Change to Date if it's a Date type
  purchaseStatus: string = '';
  total: number = 0; // Assuming total is of type number
  employeeId: number = 0;
  observation: string = '';
  billUrl: string = '';
  cardProducts: ISupplierProduct[] = [];
  purchaseDetails: PurchaseOrderDetailResponse[] = [];
  supplier: ISupplier = {
    id: 1,
    socialReason: 'Proveedor',
    fantasyName: 'Cachito',
    cuit: '20323730019',
    adress: 'Alberdi 342',
  };
  currentDate: Date = new Date();

  constructor(private purchaseOrderService: PurchaseOrderServiceService) {}

  ngOnInit() {
    this.purchaseOrderService
      .getSupplierSelected()
      .subscribe((data: ISupplier) => {
        // this.supplier = data;
      });

    this.purchaseOrderService
      .getCardProductList2()
      .subscribe((prod: ISupplierProduct[]) => {
        this.cardProducts = prod;
        this.purchaseDetails = this.mapPurchaseDetails();
      });
  }

  mapPurchaseDetails(): PurchaseOrderDetailResponse[] {
    const purchaseDetails: PurchaseOrderDetailResponse[] =
      this.cardProducts.map((product) => ({
        id: 0,
        purchaseOrderId: 0,
        productSupplierId: product.idSupplier,
        quantityReceived: product.quantity,
        deliveryDate: new Date(),
        observation: '',
      }));
    return purchaseDetails;
  }

  onEdit(): void {
    this.purchaseOrderService.setPurchaseOrderFlow();
  }
}
