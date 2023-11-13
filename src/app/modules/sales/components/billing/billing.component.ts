import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BillServiceService} from "../../services/billing/bill-service.service";
import {PaymentMethodService} from "../../services/payment-method.service";
import {IPaymentMethod} from "../../interfaces/ipayment-method";
import {SaleOrderServiceService} from "../../services/salesOrder/sale-order-service.service";
declare var window: any;

@Component({
  selector: 'fn-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  paymentMethods: any[] = [];
  paymentList: any = [];
  amount: number | null = null;
  orderId: number | null = null;
  paymentModal: any;
  selectedPaymentMethod: any = -1;
  order: any = {};

  constructor(private billService: BillServiceService, private paymentMethodService: PaymentMethodService, private saleOrderService: SaleOrderServiceService) {
  }

  ngOnInit(): void {
   this.paymentMethodService.getPaymentMethods().subscribe(
     (methods: any[]) =>
       this.paymentMethods = methods
   );
    this.paymentModal = new window.bootstrap.Modal(
      document.getElementById('paymentModal')
    );
  }

  openPaymentModal() {
    this.paymentModal.show();
  }
  finishPayment() {
    // confirm or save something
    alert("pagado");
    this.paymentModal.hide();
  }

  printOrder() {

  }

  cancelOrder() {

  }

  checkOrder() {
    if (this.orderId == null || !this.billService.checkOrder(Number(this.orderId))) {
      alert("invalidOrder")
      return
    }
    this.openPaymentModal()
  }


  addPayment() {
    if (this.selectedPaymentMethod != -1){
      this.paymentList.push({
        paymentMethod:this.selectedPaymentMethod,
        amount:this.amount
      });
      console.log(this.selectedPaymentMethod);
      this.selectedPaymentMethod = -1;
      this.amount = null;
    }
  }

  searchBill() {
    //if (this.orderId != null){
      //this.saleOrderService.getSaleOrder(this.orderId).subscribe((order) => {
        //this.order = order;
        //console.log(this.order);
       // }
     // )
    //}
  }

  protected readonly Number = Number;
}
