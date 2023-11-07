import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BillServiceService} from "../../services/billing/bill-service.service";
declare var window: any;

@Component({
  selector: 'fn-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  productList: any[] = [];
  paymentList: any[] = [];
  orderId: number = 0;
  paymentModal: any;
  selectedPaymentMethod: any = "";

  constructor(private billService: BillServiceService) {
  }

  ngOnInit(): void {
    this.paymentModal = new window.bootstrap.Modal(
      document.getElementById('paymentModal')
    );
  }

  openPaymentModal() {
    this.paymentModal.show();
  }
  finishPayment() {
    // confirm or save something
    console.log(this.selectedPaymentMethod);
    alert("pagado");
    this.paymentModal.hide();
  }

  printOrder() {

  }

  cancelOrder() {

  }

  checkOrder(id: number) {
    if (!this.billService.checkOrder(id)) {
      alert("invalidOrder")
      return
    }
    this.openPaymentModal()
  }


  addPayment() {

  }
}
