import { Injectable } from '@angular/core';
import { SaleOrderView } from '../../models/SaleOrderView';
import { SaleOrderServiceService } from '../salesOrder/sale-order-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintDocumentsService {

  saleOrderView:SaleOrderView = new SaleOrderView;

  constructor() { }

  saleOrderNewSnaptshot = new BehaviorSubject<any>(null);
  getSaleOrder$ = this.saleOrderNewSnaptshot.asObservable();
  
  sendOrder(saleOrder: SaleOrderView) {
      this.saleOrderNewSnaptshot.next(saleOrder);
      }

      //this.printService.senOrder(saleOrder);

  
  // print(saleOrder:SaleOrderView):Observable<SaleOrderView> {
  //   this.saleOrderView=this.clear()
  //   this.saleOrderView = saleOrder;
  //     return of(this.saleOrderView);
  // }


  clear():SaleOrderView{
    this.saleOrderView.address = ""
    this.saleOrderView.company_name=""
    this.saleOrderView.date_of_expiration =""
    this.saleOrderView.date_of_issue =""
    this.saleOrderView.detail_sales_order= []
    this.saleOrderView.email = ""
    this.saleOrderView.first_name_client=""
    this.saleOrderView.first_name_seller=""
    this.saleOrderView.id_client=0
    this.saleOrderView.id_sale_order = 0
    this.saleOrderView.id_seller = 0
    this.saleOrderView.last_name_client =""
    this.saleOrderView.state_sale_order = ""
    this.saleOrderView.telephone =0
    return this.saleOrderView
  }


}
