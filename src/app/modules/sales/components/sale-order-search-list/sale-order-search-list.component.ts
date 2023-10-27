import { Component } from '@angular/core';
import { SaleOrderModel } from '../../models/SaleOrderModel';
import { SaleOrderServiceService } from '../../services/sale-order-service.service';

@Component({
  selector: 'fn-sale-order-search-list',
  templateUrl: './sale-order-search-list.component.html',
  styleUrls: ['./sale-order-search-list.component.css']
})
export class SaleOrderSearchListComponent {
  saleOrder: SaleOrderModel ={
    id_seller: 0,
    id_client: 0,
    date_of_issue: '',
    date_of_expiration: '',
    state_sale_order: '',
    detail_sales_order: []
  }
    
    listSaleOrder: SaleOrderModel[]=[];
  
  constructor(private saleOrderService : SaleOrderServiceService ) {
    
  }
  
    ngOnInit(): void {
      this.listSaleOrder = this.saleOrderService.getSaleOrders();
    }
  


}
