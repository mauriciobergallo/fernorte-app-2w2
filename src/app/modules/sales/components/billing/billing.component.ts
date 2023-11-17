import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BillServiceService} from "../../services/billing/bill-service.service";
import {PaymentMethodService} from "../../services/payment-method.service";
import {IPaymentMethod} from "../../interfaces/ipayment-method";
import {SaleOrderServiceService} from "../../services/salesOrder/sale-order-service.service";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
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
  totalAmount: number | null = null;
  orderId: number | null = null;
  paymentModal: any;
  selectedPaymentMethod: any = -1;
  order: any = {};
  name: string = "";
  amountPayed:number =  0;
  subCharges:number =  0;
  realAmount : number = 0;
  filters: Map<string, string> = new Map();

  constructor(private billService: BillServiceService, private paymentMethodService: PaymentMethodService,
    private saleOrderService:SaleOrderServiceService) {
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
    if(this.amountPayed == this.realAmount){
      alert("pagado");
      this.paymentModal.hide();
      return
    }
    alert("monto restante a pagar")
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
    if (this.selectedPaymentMethod != -1 && this.amount != null){
      if((Number(this.amount) + Number(this.amountPayed)) > Number(this.realAmount)){
        alert("Monto superado")
        return
      }
      this.paymentList.push({
        paymentMethod:this.selectedPaymentMethod,
        amount:this.amount
      });
      let lastPaymentMethod = this.paymentList.at(this.paymentList.length-1);
      this.subCharges += Number(lastPaymentMethod.paymentMethod.surcharge)/100 * Number(lastPaymentMethod.amount);
      this.amountPayed += Number(this.amount);
      this.selectedPaymentMethod = -1;
      this.amount = null;
    }
  }

  searchBill() {

   /*  if (this.orderId != null){
      if(this.orderId == 1){
        this.name = "Lucas A";
        this.totalAmount = 100;
        this.realAmount = 110;
        this.order.detailBill = [
          {
            idBill: 1,
            itemName:"clavo",
            unitPrice:100,
            quantity:1
          }
        ]
      }
      if(this.orderId == 2){
        this.name = "Juan A";
        this.totalAmount = 150;
        this.realAmount = 165;
        this.order.detailBill = [
          {
            idBill: 1,
            itemName:"martillo",
            unitPrice:150,
            quantity:1
          }
        ]
      }
      if(this.orderId == 3){
        this.name = "Ignacio P"
        this.totalAmount = 200;
        this.realAmount = 220;

        this.order.detailBill = [
          {
            idBill: 1,
            itemName:"clavo",
            unitPrice:100,
            quantity:2
          }
        ]
      } */
      if(this.orderId!=null){
        this.filters.set("idOrder", this.orderId.toString())
        this.saleOrderService.getSaleOrdesByFilter(this.filters).subscribe((order) => {
          this.order = order[0];
          console.log(this.order);
          }
        )
      }
        
      
      
    }
    protected readonly Number = Number;
  }

  