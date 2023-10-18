import { Component, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/sale-order-service.service';
import { ISaleOrder } from '../../interfaces/isale-order';
import { LoadingService } from '../../services/loading.service';
import { IProduct } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'fn-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.css']
})
export class SaleOrderComponent implements OnInit {

  constructor(private saleOrderServiceService: SaleOrderServiceService, 
    private loadingService: LoadingService,
    private productService: ProductService){}
  loader = this.loadingService.viewLoader();
  listProduct: IProduct[] = [];
  ngOnInit(): void {
    this.listProduct = this.productService.getlistProduct();
  }


 async generateSaleOrder() {
  this.loader = this.loadingService.loading();
    const saleOrder:ISaleOrder = ({
      id_sale_order: 2,
      id_seller: 1,
      id_client: 1,
      date_of_issue: Date.now(),
      date_of_expiration: Date.now() + 1000 * 60 * 60 * 24,
      state_sale_order: 'DELIVERED',
      detail_sales_order: [
        {
          id_sale_order_details: 1,
          id_sale_order: 1,
          id_product: 1,
          quantity: 1,
          price: 100,
          state_sale_order_detail: 'DELIVERED'
        }
      ]
    });
  await this.saleOrderServiceService.createSaleOrder(saleOrder)
  this.loader = this.loadingService.loading();
  }
}
