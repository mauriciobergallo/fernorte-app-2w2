import { Component, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/salesOrder/sale-order-service.service';
import { SaleOrderView } from '../../models/SaleOrderView';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'fn-sale-order-view',
  templateUrl: './sale-order-view.component.html',
  styleUrls: ['./sale-order-view.component.css']
})
export class SaleOrderViewComponent implements OnInit {
  listSaleOrder!: SaleOrderView

  
  saleOrder: SaleOrderView = {
    id_sale_order: 10000,
    id_seller: 2,
    first_name_seller:  "Ignacio",
    last_name_seller: "Prado",
    id_client: 1,
    first_name_client: "Juan",
    last_name_client: "Angeloni",
    company_name:  "",
    address: "Rodriguez Busto 1640",
    telephone:3513064323,
    email: "juani@hotmail.com",
    date_of_issue: "13/10/23",
    date_of_expiration: "23/10/23",
    state_sale_order: "CREATED",
    detail_sales_order: [
      {  name: "Martillo",
      id_sale_order_details: 1,
      id_product: 24,
      quantity:  3,
      price: 5500,
      state_sale_order_detail: "PENDING_DELIVERY"
    },
    {  name: "Serrucho",
    id_sale_order_details: 2,
    id_product: 23,
    quantity:  4,
    price: 2000,
    state_sale_order_detail: "DELIVERED"
  },
    {  name: "Clavo",
    id_sale_order_details: 3,
    id_product:43,
    quantity:  2,
    price: 100,
    state_sale_order_detail: "DELIVERED"  
  }]
  }
  
  subtotal:number = 0;
  iva: number = 0;

  constructor(private saleOrderService : SaleOrderServiceService, private activatedRoute: ActivatedRoute, 
    private router: Router,) {}

  ngOnInit(): void {
    this.calculateSub();
    this.calculateIva();

  }
  calculateSub(){
    this.saleOrder.detail_sales_order.forEach(detail=>{
      this.subtotal+= detail.quantity*detail.price;
    })
  }
  calculateIva(){
    this.iva = this.subtotal * 0.21;
  }
  
}
