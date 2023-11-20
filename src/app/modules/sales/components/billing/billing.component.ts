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
import { MockSalesService } from '../../services/salesOrder/mock-sales.service';
import { SaleOrderOk } from '../../models/SaleOrderOk';
import { MockService } from '../../services/mocks/mock.service';
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
  orderMock: BillModel = new BillModel();
  name: string = "Cargue una orden para continuar";
  amountPayed:number =  0;
  subCharges:number =  0;
  realAmount : number = 0;
  filters: Map<string, string> = new Map();


  billCargada:BillModel=
    {
      id_bill: 12,
      address: "Uritorco 4813",
      id_sale_order: 1561549904,
      id_seller: 1,
      name_seller: "Prado Ignacio",
      id_client: 2,
      first_name: "Tomás",
      las_name: "Aranda",
      company_name: "",
      telephone: 3515605118,
      email: "tomiaranda@gmail.com",
      vat_condition: "Responsable Inscripto",
      bill_type: "A",
      cae: "12345678901234",
      expiration_date_cae: [2023, 11, 30],
      created_date: [2023, 11, 20],
      total_price: 16395.5,
      detail_bill: [
        {
          id: 20,
          tax: { id: 1, tax_type: "IVA", tax_value: 21 },
          id_product: 47,
          name_product: "Amoladora Angular Versa Pro 2400 W 230 Mm Ferreteria Express",
          quantity: 1,
          unit: "unidad",
          tax_value: 2845.5,
          unitary_price: 13550,
          discount_amount: 0,
        },
      ],
      payments: [
        {
          id: 1,
          payment: 16395.5,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 },
        },
      ],
    }
  

  constructor(private billService: BillServiceService, private paymentMethodService: PaymentMethodService,
    private saleOrderService:SaleOrderServiceService,private saleServiceMock : MockSalesService,private billMockService:MockService) {
  }

  ngOnInit(): void {
    /*this.paymentMethodService.getPaymentMethods().subscribe(
      (methods: any[]) =>{
        this.paymentMethods = methods;
      });*/
    this.paymentMethods = [
      {
        "surcharge": 0,
        "id_payment_method": 2,
        "payment_method": "Efectivo"
      },
      {
        "surcharge": 10,
        "id_payment_method": 1,
        "payment_method": "Credito"
      }
    ]
    this.selectedPaymentMethod = this.paymentMethods[0];
    this.paymentModal = new window.bootstrap.Modal(
      document.getElementById('paymentModal')
    );
  }

  openPaymentModal() {
    this.paymentModal.show();
  }
  finishPayment() {
    // confirm or save something
    if(this.amountPayed != 0 && this.amountPayed < this.realAmount){
        Swal.fire({
          title: "Falta pagar!",
          text: "Monto restante a pagar!",
          icon: "error"
        });
        return;
    }
    if(this.amountPayed == 0) {
      Swal.fire({
        title: "Quieres pagar el monto total en efectivo?",
        text: "El monto a pagar es de $" + this.realAmount,
        icon: "warning",
        reverseButtons: true,
        showCancelButton: false,
        showDenyButton: true,
        denyButtonText: `Cancelar`,
        confirmButtonText: "Pagar"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            title: "Pagado exitosamente!",
            text: "Se pago correctamente!",
            icon: "success"
          });
          this.order.payments = this.paymentList;
          delete this.order['id_bill'];
          this.cancelOrder();
          this.paymentModal.hide();
          this.saleServiceMock.addOrder(this.orderOk);
          this.billMockService.addBill(this.billCargada);
        } else {
          this.openPaymentModal();
        }
      });
    }
    else{
      Swal.fire({
        title: "Pagado exitosamente!",
        text: "Se pago correctamente!",
        icon: "success"
      });
      this.order.payments = this.paymentList;
      delete this.order['id_bill'];
      this.cancelOrder();
      this.paymentModal.hide();
      this.saleServiceMock.addOrder(this.orderOk);
      this.billMockService.addBill(this.billCargada)
    }
    return
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
    this.amount = this.realAmount;
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

  searchMockBill() {
    if(this.orderId!=null){
      this.totalAmount = 0;

      let saleOrder : SaleOrderApi = this.saleServiceMock.onSaleToBill();
      this.order = this.billService.mapSaleOrderToBill(saleOrder);
      this.order.vat_condition = "FINAL_CUSTOMER";
      this.order.bill_type = "B";
      this.name = this.order.first_name + ' ' + this.order.las_name;
      this.order.detail_bill.forEach((item: any) => {
        this.totalAmount += (item.unitary_price * item.quantity);
      })
      this.totalAmount = Number(this.totalAmount.toFixed(2));
          this.realAmount = this.totalAmount * 1.21;

    }
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
  orderOk : SaleOrderOk =
    {
      idSaleOrder: 1561549904,
      idSeller: 1,
      nameSeller: "Ignacio Prado",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Uritorco 4813",
      telephone: "3515605118",
      companyName: "",
      email: "tomiaranda@gmail.com",
      dateOfIssue: new Date(2023,11,20,10,11),
      dateOfExpiration: new Date(2023,11,30,10,11),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 47,
          name: "Amoladora Angular Versa Pro 2400 W 230 Mm Ferreteria Express",
          idSaleOrderDetails:154561900,
          price : 13550,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED", //RESERVED, DELIVERED, CANCELLED, CREATED
        }
      ]
    }
}

