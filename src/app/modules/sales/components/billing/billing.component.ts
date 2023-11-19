import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import { BillServiceService } from '../../services/billing/bill-service.service';
import {PaymentMethodService} from "../../services/payment-method.service";
import {IPaymentMethod} from "../../interfaces/ipayment-method";
import {SaleOrderServiceService} from "../../services/salesOrder/sale-order-service.service";
import Swal from "sweetalert2";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
import {BillModel} from "../../models/BillingModelApi";
import {SaleOrderApi} from "../../models/SaleModelApi";
import {Payment} from "../../models/PaymentModel";
declare var window: any;

@Component({
  selector: 'fn-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  paymentMethods: any[] = [];
  paymentList: Payment[] = [];
  amount: number | null = null;
  totalAmount: number = 0;
  orderId: number | null = null;
  paymentModal: any;
  selectedPaymentMethod: any = -1;
  order: BillModel = new BillModel();
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
    if(this.amountPayed >= this.realAmount){Swal.fire({
      title: "Pagado exitosamente!",
      text: "Se pago correctamente!",
      icon: "success"
    });
      this.order.payments = this.paymentList;
      delete this.order['id_bill'];
      this.billService.addBill(this.order).subscribe((response) => {
        this.cancelOrder();
        this.paymentModal.hide();
      });
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
    this.paymentList = [];
    this.order = new BillModel();
    this.name= "Cargue una orden para continuar";
    this.realAmount=0;
    this.totalAmount=0;
    this.subCharges=0;
    this.orderId = null;
    this.amountPayed=0;
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
    if (this.order.bill_type == "") {
      Swal.fire({
        title: "Orden invalida!",
        text: "Recuerde ingresar tipo de factura!",
        icon: "error"
      });
      return
    }

    if (this.order.vat_condition == "") {
      Swal.fire({
        title: "Orden invalida!",
        text: "Recuerde ingresar condicion de iva!",
        icon: "error"
      });
      return
    }
    this.openPaymentModal()
  }


  addPayment() {
    if (this.selectedPaymentMethod != -1 && this.amount != null){
      if((Number(this.amount) + Number(this.amountPayed)) > (Number(this.realAmount)+1)){
        Swal.fire({
          title: "Monto superado!",
          text: "Ingrese una monto valido!",
          icon: "error"
        });
        return
      }
      this.paymentList.push({
        id:this.selectedPaymentMethod.id_payment_method,
        surcharge:this.selectedPaymentMethod.surcharge,
        payment_method: {
          id_payment_method: this.selectedPaymentMethod.id_payment_method,
          payment_method: this.selectedPaymentMethod.payment_method,
          surcharge: this.selectedPaymentMethod.surcharge
        },
        payment: this.amount
      });
      let lastPaymentMethod = this.paymentList.at(this.paymentList.length-1)!;
      this.subCharges += Number(lastPaymentMethod.payment_method.surcharge)/100 * Number(lastPaymentMethod.payment);
      this.subCharges = Number(this.subCharges.toFixed(2));
      this.amountPayed += Number(this.amount);
      this.amountPayed = Number(this.amountPayed.toFixed(2));
      this.selectedPaymentMethod = -1;
      this.amount = null;
      return;
    }
    Swal.fire({
      title: "Metodo de pago invalido!",
      text: "Ingrese una metodo de pago valido!",
      icon: "error"
    });
  }
  cleanPayment(){
    this.paymentList = [];
  }
  searchBill() {
      if(this.orderId!=null){
        this.totalAmount = 0;
        this.filters.set("idOrder", this.orderId.toString())
        this.saleOrderService.getSaleOrdesByFilter(this.filters).subscribe((saleOrderList) => {
          let saleOrder : SaleOrderApi =  saleOrderList[0];
          console.log(saleOrder);
          this.order = this.billService.mapSaleOrderToBill(saleOrder);
          console.log(this.order);
          this.name = this.order.first_name + ' ' + this.order.las_name;
          this.order.detail_bill.forEach((item: any) => {
            this.totalAmount += (item.unitary_price * item.quantity);
          })
          this.totalAmount = Number(this.totalAmount.toFixed(2));
          this.realAmount = this.totalAmount * 1.21;
          }
        )
      }
    }
    protected readonly Number = Number;
}

