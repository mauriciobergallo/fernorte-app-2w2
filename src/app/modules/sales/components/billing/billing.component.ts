import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BillServiceService} from "../../services/billing/bill-service.service";
import {PaymentMethodService} from "../../services/payment-method.service";
import {IPaymentMethod} from "../../interfaces/ipayment-method";
import {SaleOrderServiceService} from "../../services/salesOrder/sale-order-service.service";
import Swal from "sweetalert2";
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
  totalAmount: number = 0;
  orderId: number | null = null;
  paymentModal: any;
  selectedPaymentMethod: any = -1;
  order: any = {};
  name: string = "Cargue una orden para continuar";
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
    if(this.amountPayed == this.realAmount){Swal.fire({
      title: "Pagado exitosamente!",
      text: "Se pago correctamente!",
      icon: "success"
    });
      this.order.paymentList = this.paymentList;
      this.billService.addBill(this.order);
      this.paymentList = [];
      this.paymentModal.hide();
      return
    }
    Swal.fire({
      title: "Falta pagar!",
      text: "Monto restante a pagar!",
      icon: "error"
    });
  }

  printOrder() {

  }

  cancelOrder() {

  }

  checkOrder() {
    if (this.orderId == null || !this.billService.checkOrder(Number(this.orderId))) {
      Swal.fire({
        title: "Orden invalida!",
        text: "Ingrese una orden valida!",
        icon: "error"
      });
      return
    }
    this.openPaymentModal()
  }


  addPayment() {
    if (this.selectedPaymentMethod != -1 && this.amount != null){
      if((Number(this.amount) + Number(this.amountPayed)) > Number(this.realAmount)){
        Swal.fire({
          title: "Monto superado!",
          text: "Ingrese una monto valido!",
          icon: "error"
        });
        return
      }
      this.paymentList.push({
        paymentMethod:this.selectedPaymentMethod,
        amount:this.amount
      });
      let lastPaymentMethod = this.paymentList.at(this.paymentList.length-1);
      this.subCharges += Number(lastPaymentMethod.paymentMethod.surcharge)/100 * Number(lastPaymentMethod.amount);
      this.subCharges = Number(this.subCharges.toFixed(2));
      this.amountPayed += Number(this.amount);
      this.amountPayed = Number(this.amountPayed.toFixed(2));
      this.selectedPaymentMethod = -1;
      this.amount = null;
    }
  }
  cleanPayment(){
    this.paymentList = [];
  }
  searchBill() {
      if(this.orderId!=null){
        this.filters.set("idOrder", this.orderId.toString())
        this.saleOrderService.getSaleOrdesByFilter(this.filters).subscribe((order) => {
          this.order = order[0];
          this.name = this.order.first_name_client + ' ' + this.order.last_name_client;
          this.order.detail_sales_order.forEach((item: any) => {
            this.totalAmount += (item.price * item.quantity);
            this.realAmount = this.totalAmount;
          })
          this.totalAmount = Number(this.totalAmount.toFixed(2));
          this.realAmount = this.totalAmount;
          }
        )
      }



    }
    protected readonly Number = Number;
  }

