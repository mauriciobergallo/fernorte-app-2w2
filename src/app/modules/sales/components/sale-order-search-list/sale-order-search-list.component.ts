import { Component, OnDestroy, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/salesOrder/sale-order-service.service';
import { Observable, Subscription } from 'rxjs';
import { SaleOrderOk } from '../../models/SaleOrderOk';
import { SaleOrderApi } from '../../models/SaleModelApi';
import { ProductApi } from '../../models/ProductApi';
import { ProductOk } from '../../models/ProductOk';
import { NgModel, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SaleOrderView } from '../../models/SaleOrderView';
import { PrintDocumentsService } from '../../services/print/print-documents-service';

@Component({
  selector: 'fn-sale-order-search-list',
  templateUrl: './sale-order-search-list.component.html',
  styleUrls: ['./sale-order-search-list.component.css']
})
export class SaleOrderSearchListComponent implements OnInit, OnDestroy {
  saleOrdersList: SaleOrderApi[] = [];
  saleOrdersListOk: SaleOrderOk[]=[];
  saleOrderStates: string[] = [];
  saleOrderOk!: SaleOrderOk;
  salePick:boolean= false;


  idOrder:string="0";
  doc:string="0";       
  fromDate:string="";
  toDate:string="";
  stateOrder:string="";
  filters: Map<string, string> = new Map();

  private subscriptions = new Subscription();

  constructor(private saleOrderServiceService: SaleOrderServiceService, private print 
    : PrintDocumentsService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.saleOrderServiceService.getSaleOrders().subscribe(
        ( response : SaleOrderApi[]) => {
          this.saleOrdersList = response;
          for(let item of this.saleOrdersList) {
            this.saleOrdersListOk.push(this.mapSaleOrder(item))
          }
        }
      )
    )
    this.subscriptions.add(
      this.saleOrderServiceService.getSaleOrderStates().subscribe(
        (response : string[]) => {
          this.saleOrderStates = response;
        }
      )
    )
  }

  onShowDetails() {
  

  }


  onSendFilters(form : NgForm) {
    if(form.valid) {
      this.filters.set("idOrder", form.value.idOrder)
      this.filters.set("doc", form.value.doc)
      this.filters.set("fromDate", form.value.fromDate)
      this.filters.set("toDate", form.value.toDate)
      this.filters.set("stateOrder", form.value.stateOrder)
    }
    this.saleOrdersListOk = [];
    this.subscriptions.add(
      this.saleOrderServiceService.getSaleOrdesByFilter(this.filters).subscribe(
        ( response : SaleOrderApi[]) => {
          this.saleOrdersList = response;
          for(let item of this.saleOrdersList) {
            this.saleOrdersListOk.push(this.mapSaleOrder(item))
          }
          console.log(this.saleOrdersList);
        }
      )
    )
  }

  mapSaleOrder(saleOrder: SaleOrderApi): SaleOrderOk {
    const { id_sale_order, id_seller, id_client,last_name_seller,first_name_seller,address,telephone,email ,date_of_issue, date_of_expiration, state_sale_order, detail_sales_order, first_name_client, last_name_client,company_name } = saleOrder;
    const productList: ProductOk[]=[];
    for(let prod of detail_sales_order){
      productList.push(this.mapProduct(prod))
    }
    const saleOrderOk: SaleOrderOk = {
      idSaleOrder: id_sale_order,
      idSeller: id_seller,
      idClient: id_client,
      companyName:company_name,
      address,
      email,
      telephone,
      nameSeller:first_name_seller+" "+last_name_seller,
      nameClient: first_name_client+" "+last_name_client,
      dateOfIssue: new Date(date_of_issue[0], date_of_issue[1]-1, date_of_issue[2], date_of_issue[3], date_of_issue[4]),
      dateOfExpiration: new Date(date_of_expiration[0], date_of_expiration[1]-1, date_of_expiration[2], date_of_expiration[3], date_of_expiration[4]),
      stateSaleOrder: state_sale_order,
      details: productList
    };
    return saleOrderOk;
  }

  mapProduct(product : ProductApi) : ProductOk {
    const { id_product, id_sale_order_details, price, quantity, state_sale_order_detail, name } = product;
    const productOk : ProductOk = {
      name: name,
      idProduct : id_product,
      idSaleOrderDetails:id_sale_order_details,
      price : price,
      quantity : quantity,
      stateSaleOrderDetail : state_sale_order_detail
    } 
    return productOk
  }


  onPrint(saleOrder:SaleOrderOk) {
    this.saleOrderOk = saleOrder;
    alert("click on Print")
    this.print.sendOrder(this.saleOrderOk);
  }
}
