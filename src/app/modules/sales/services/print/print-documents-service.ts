import { Injectable } from '@angular/core';
import { SaleOrderView } from '../../models/SaleOrderView';
import { SaleOrderServiceService } from '../salesOrder/sale-order-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SaleOrderOk } from '../../models/SaleOrderOk';
import { BillModel } from '../../models/BillingModelApi';
import { BillOk } from '../../models/BillingOk';
import { BillView, Payment } from '../../models/BillView';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PrintDocumentsService {

  saleOrderOk: SaleOrderOk = new SaleOrderOk;
  bill!: BillView;

  constructor() { }

  saleOrderNewSnaptshot = new BehaviorSubject<any>(null);
  getSaleOrder$ = this.saleOrderNewSnaptshot.asObservable();

  billSnapshot = new BehaviorSubject<any>(null);
  getBillOrder$ = this.billSnapshot.asObservable();


  sendOrder(saleOrder: SaleOrderOk) {
    this.saleOrderNewSnaptshot.next(saleOrder);
  }


  sendBill(bill: BillView) {
    this.saleOrderNewSnaptshot.next(bill);
  }

  //this.printService.senOrder(saleOrder);


  // print(saleOrder:SaleOrderView):Observable<SaleOrderView> {
  //   this.saleOrderView=this.clear()
  //   this.saleOrderView = saleOrder;
  //     return of(this.saleOrderView);
  // }


  clear(): SaleOrderOk {
    this.saleOrderOk.address = ""
    this.saleOrderOk.companyName = ""
    this.saleOrderOk.dateOfExpiration!
    this.saleOrderOk.dateOfIssue = new Date()
    this.saleOrderOk.details = []
    this.saleOrderOk.email = ""
    this.saleOrderOk.nameClient = ""
    this.saleOrderOk.nameSeller = ""
    this.saleOrderOk.idClient = 0
    this.saleOrderOk.idSaleOrder = 0
    this.saleOrderOk.idSeller = 0
    this.saleOrderOk.stateSaleOrder = ""
    this.saleOrderOk.telephone = ""
    return this.saleOrderOk
  }
  clearBill(): BillView {
    this.bill.address = ""
    this.bill.companyName = ""
    this.bill.expirationDateCae!
    this.bill.createdDate = ""
    this.bill.detailBill = []
    this.bill.email = ""
    this.bill.firstNameClient = ""
    this.bill.lastNameClient = ""
    this.bill.idClient = 0
    this.bill.idSaleOrder = 0
    this.bill.idSeller = 0
    this.bill.billType = ""
    this.bill.telephone = 0
    this.bill.cae = ""
    this.bill.idBill = 0
    this.bill.totalPrice = 0
    this.bill.payment!
    this.bill.totalPrice = 0
    return this.bill
  }

  getSwal(title: String, text: String, icon: SweetAlertIcon, nameBottom: String, callbalck: any, navigationCallBack: any) {
    Swal.fire({
      title: title,
      text: text.toString(),
      icon: icon, // Puedes cambiar 'info' por el icono que desees, por ejemplo, 'printer'
      showCancelButton: true,
      cancelButtonColor: '#808080',
      cancelButtonText: 'Cancelar',  // Agregamos texto personalizado para el botón de cancelar
      confirmButtonColor: '#3085d6',
      confirmButtonText: nameBottom.toString(),
      reverseButtons: true, // Intercambiamos la posición de los botones
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para imprimir
        callbalck();
        navigationCallBack();
      }
    });
  }

}
