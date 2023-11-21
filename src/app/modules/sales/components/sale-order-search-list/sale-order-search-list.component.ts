import { Component, OnDestroy, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/salesOrder/sale-order-service.service';
import { Observable, Subscription } from 'rxjs';
import { SaleOrderOk } from '../../models/SaleOrderOk';
import { SaleOrderApi } from '../../models/SaleModelApi';
import { ProductApi } from '../../models/ProductApi';
import { ProductOk } from '../../models/ProductOk';
import { NgModel, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { PrintDocumentsService } from '../../services/print/print-documents-service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-sale-order-search-list',
  templateUrl: './sale-order-search-list.component.html',
  styleUrls: ['./sale-order-search-list.component.css']
})
export class SaleOrderSearchListComponent implements OnInit, OnDestroy {
  saleOrdersList: SaleOrderApi[] = [];
  saleOrdersListOk: SaleOrderOk[]=[];

  selectedOrder : any;

  saleOrderStates: string[] = [];


  idOrder:string="0";
  doc:string="0";
  fromDate:string="";
  toDate:string="";
  stateOrder:string="";
  filters: Map<string, string> = new Map();

  private subscriptions = new Subscription();

  constructor(private saleOrderServiceService: SaleOrderServiceService,
    private print:PrintDocumentsService,
    private route:Router,
    private modalService:NgbModal) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.saleOrderServiceService.getSaleOrders().subscribe(
        ( response : SaleOrderApi[]) => {
          this.saleOrdersList = response.sort((a,b)=>b.id_sale_order! - a.id_sale_order!);
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

  onSendFilters(form : NgForm) {
    if(form.valid) {
      this.filters.set("idOrder", form.value.idOrder)
      this.filters.set("doc", form.value.doc)
      this.filters.set("fromDate", form.value.fromDate)
      this.filters.set("toDate", form.value.toDate)
      this.filters.set("stateOrder", form.value.stateOrder)
      this.filters.set("page","0");
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
    const { id_sale_order, id_seller, id_client, date_of_issue, date_of_expiration, state_sale_order, detail_sales_order, first_name_client, last_name_client, first_name_seller,last_name_seller, address, email, company_name, telephone } = saleOrder;
    const productList: ProductOk[]=[];
    for(let prod of detail_sales_order){
      productList.push(this.mapProduct(prod))
    }
    const saleOrderOk: SaleOrderOk = {
      idSaleOrder: id_sale_order,
      idSeller: id_seller,
      nameSeller: first_name_seller+" "+last_name_seller,
      address: address,
      telephone: telephone,
      email: email,
      companyName: company_name,
      idClient: id_client,
      nameClient: first_name_client+" "+last_name_client,
      dateOfIssue: date_of_issue,
      dateOfExpiration: date_of_expiration,
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
  
  onShowDetails(item:any, content: any){
    this.selectedOrder = item;
    console.log(this.selectedOrder)
    this.openModal(content);
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onCloseDetails() {
    this.modalService.dismissAll();
  }

  onCalculateTotal(saleOrder: any): number {
    let total = 0;
  
    if (saleOrder && saleOrder.details) {
      for (const prod of saleOrder.details) {
        total += prod.quantity * prod.price;
      }
    }
  
    return total;
  }
  onLoadPage(page : number) {
    if(page === 1) {
      this.saleOrdersListOk = this.saleOrdersListOk.slice(page-1,(page*10));
    } else {
      this.saleOrdersListOk = this.saleOrdersListOk.slice((page-1)*10,(page*10));
    }
  }

  onPrint(item:SaleOrderOk) {
    this.print.sendOrder(item);
    this.route.navigateByUrl('printOrder')

  }
}
