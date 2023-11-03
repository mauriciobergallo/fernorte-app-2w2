import { Component, OnDestroy, OnInit } from '@angular/core';
import { SaleOrderModel } from '../../models/SaleOrderModel';
import { SaleOrderServiceService } from '../../services/salesOrder/sale-order-service.service';
import { Observable, Subscription } from 'rxjs';
import { SaleOrderOk } from '../../models/SaleOrderOk';
import { SaleOrderApi } from '../../models/SaleModelApi';
import { ProductApi } from '../../models/ProductApi';
import { ProductOk } from '../../models/ProductOk';

@Component({
  selector: 'fn-sale-order-search-list',
  templateUrl: './sale-order-search-list.component.html',
  styleUrls: ['./sale-order-search-list.component.css']
})
export class SaleOrderSearchListComponent implements OnInit, OnDestroy {
  saleOrdersList: SaleOrderApi[] = [];
  saleOrdersListOk: SaleOrderOk[]=[];

  private subscriptions = new Subscription();

  constructor(private saleOrderServiceService: SaleOrderServiceService) {
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
          console.log(this.saleOrdersList)
        }
      )
    )
  }

  // showSaleOrderFiltered() {
  //   this.saleOrderServiceService.getSaleOrdesByFilter().subscribe(
  //     ( response : SaleOrderModel[]) => {
  //       this.saleOrdersList = response;
  //     }
  //   )
  // }

  mapSaleOrder(saleOrder: SaleOrderApi): SaleOrderOk {
    const { id_sale_order, id_seller, id_client, date_of_issue, date_of_expiration, state_sale_order, detail_sales_order } = saleOrder;
    const productList: ProductOk[]=[];
    for(let prod of detail_sales_order){
      productList.push(this.mapProduct(prod))
    }
    const saleOrderOk: SaleOrderOk = {
      idSaleOrder: id_sale_order,
      idSeller: id_seller,
      idClient: id_client,
      dateOfIssue: new Date(date_of_issue[0], date_of_issue[1]-1, date_of_issue[2], date_of_issue[3], date_of_issue[4]),
      dateOfExpiration: new Date(date_of_expiration[0], date_of_expiration[1]-1, date_of_expiration[2], date_of_expiration[3], date_of_expiration[4]),
      stateSaleOrder: state_sale_order,
      details: productList
    };
    return saleOrderOk;
  }

  mapProduct(product : ProductApi) : ProductOk {
    const { id_product, id_sale_order_details, price, quantity, state_sale_order_detail } = product;
    const productOk : ProductOk = {
      idProduct : id_product,
      idSaleOrderDetails:id_sale_order_details,
      price : price,
      quantity : quantity,
      stateSaleOrderDetail : state_sale_order_detail
    } 
    return productOk
  }
}
