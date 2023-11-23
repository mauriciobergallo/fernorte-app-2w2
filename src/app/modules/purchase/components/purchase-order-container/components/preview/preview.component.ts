import { Component, Input } from '@angular/core';
import {
  ISupplier,
  ISupplierProduct,
} from 'src/app/modules/purchase/models/ISuppliers';
import { SupliersService } from '../../../supplier/services/supliers.service';
import {
  PurchaseOrderDetailRequest,
  PurchaseOrderDetailResponse,
  PurchaseOrderRequest,
} from 'src/app/modules/purchase/models/IPurchaseOrder';
import { PaymentOrderDetailResponse } from 'src/app/modules/purchase/models/IPaymentOrder';
import { ClaimOrderDetailResponse } from 'src/app/modules/purchase/models/IClaimOrder';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

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
  supplier!: ISupplier; /* = {
    id: 1,
    socialReason: 'Proveedor',
    fantasyName: 'Cachito',
    cuit: '20323730019',
    adress: 'Alberdi 342',
  }; */
  currentDate: Date = new Date();

  isTotalExceedsOneMillion = false;

  constructor(private purchaseOrderService: PurchaseOrderServiceService) {}

  suscription = new Subscription();

  ngOnInit() {
    this.purchaseOrderService
      .getSupplierSelected()
      .subscribe((data: ISupplier) => {
        this.supplier = data;
      });

    this.purchaseOrderService
      .getCardProductList2()
      .subscribe((prod: ISupplierProduct[]) => {
        this.cardProducts = prod;
        console.log('CARD PRODUCTS->', this.cardProducts);
        this.purchaseDetails = this.mapPurchaseDetails();
        this.calculateTotal();
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

  calculateTotal(): void {
    this.total = this.cardProducts
      ?.map((prod) => prod.price * prod.quantity)
      .reduce((a, b) => a + b, 0);
    this.isTotalExceedsOneMillion = this.total > 1000000;
  }

  onSubmit(): void {
    const purchaseOrder: PurchaseOrderRequest = {
      supplierId: this.supplier.id,
      date: this.currentDate,
      total: this.total,
      employeeId: this.employeeId,
      observation: this.observation,
      billUrl: this.billUrl,
      purchaseDetails: this.purchaseDetails,
    };
    this.suscription.add(
      this.purchaseOrderService.postPurchaseOrders(purchaseOrder).subscribe(
        (response) => {
          // Manejar la respuesta exitosa
          Swal.fire({
            title: 'Success!',
            text: 'Orden de compra creada',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        (error) => {
          // Manejar el error
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al crear la orden de compra',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          console.error('Error al crear la orden de compra', error);
        }
      )
    );
  }
}
