import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SupliersService } from '../../../supplier/services/supliers.service';
import { ISupplier } from 'src/app/modules/purchase/models/ISuppliers';
import Swal from 'sweetalert2';
import { PaymentOrderDetailResponse, PaymentOrderResponse } from 'src/app/modules/purchase/models/IPaymentOrder';
import { PaymentOrderServiceService } from '../../services/payment-order-service.service';

@Component({
  selector: 'fn-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit{

  paymentOrderList!: Observable<PaymentOrderResponse[]>;
  listOrdersFiltered!: PaymentOrderResponse[];
  suppliers: ISupplier[] = []
  collectionSize!: number;
  page: number = 1;
  pageSize: number = 2;

  constructor(private paymentService: PaymentOrderServiceService,
    private suppliersService: SupliersService){}

  ngOnInit(): void {
    this.paymentService.getPaymentOrders();
    this.suppliersService.getSupliers().subscribe((suppliers: ISupplier[]) => this.suppliers = suppliers);
    this.paymentService.getFilteredPaymentOrdersList().subscribe((paymentOrders: PaymentOrderResponse[]) => {
      this.paymentOrderList = of(paymentOrders);
    })
  }

  filterOrder(value: string): void {
      this.paymentOrderList.subscribe(payments => {
        this.collectionSize = payments.length;

        const filterList = payments.filter((paymentOrder) =>
        this.setSupplierName(paymentOrder.supplierId)?.toLowerCase().includes(value.toLowerCase()) ||
        this.setEmployeeName(paymentOrder.employeeId).toLowerCase().includes(value.toLowerCase()) ||
        paymentOrder.observation.toLowerCase().includes(value.toLowerCase()) ||
        paymentOrder.paymentState.toLowerCase().includes(value.toLowerCase()) ||
        this.setPaymentTotal(paymentOrder.paymentDetails).toString().includes(value));

        this.listOrdersFiltered = filterList;
      })
  }

  onPageChange(page: number) {
    this.page = page;
  }

  setSupplierName(supplierId: number): string | undefined {
    if (!supplierId) return;
    const name = this.suppliers.filter(supplier => supplier.id === supplierId)[0].fantasyName;
    return name;
  }

  setEmployeeName(employeeId: number): string {
    const name = `Ignacio Gallo ${employeeId}`
    return name;
  }

  setPaymentTotal(details: PaymentOrderDetailResponse[]) : number {
    const total = details.reduce((total: number, detail: PaymentOrderDetailResponse) => total + detail.amount, 0);
    return total;
  }

  onDelete(orderId: number): void {
    let deleted: number = 0; 
    this.paymentService.deletePaymentOrder(orderId).subscribe(res => deleted = res);
    if (deleted) {
      this.paymentService.getFilteredPaymentOrdersList().subscribe((paymentOrders: PaymentOrderResponse[]) => {
        this.paymentOrderList = of(paymentOrders);
      })
      Swal.fire({
        title: 'Éxito!', 
        text: "Order de pago eliminada!", 
        icon: 'success', 
        confirmButtonText: 'ok'
      })
    } else {
      Swal.fire({
        title: 'Error!', 
        text: "Hubo un error al eliminar la order", 
        icon: 'error', 
        confirmButtonText: 'ok'
      })
    }
  }
}
