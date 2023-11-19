import { Component, OnInit, OnDestroy } from '@angular/core';
import { SaleOrderServiceService } from '../../services/salesOrder/sale-order-service.service';
import { SaleOrderView } from '../../models/SaleOrderView';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintDocumentsService } from '../../services/print/print-documents-service';
import { PdfInstance } from 'jspdf-html2canvas/dist/types';
import { Subscription } from 'rxjs';


@Component({
  selector: 'fn-sale-order-view',
  templateUrl: './sale-order-view.component.html',
  styleUrls: ['./sale-order-view.component.css']
})
export class SaleOrderViewComponent implements OnInit, OnDestroy {
  listSaleOrder!: SaleOrderView;
  saleOrder!: SaleOrderView;
  subscription!: Subscription;


  
/*   saleOrder: SaleOrderView = {
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
  } */
  
  subtotal:number = 0;
  iva: number = 0;
  saleOrderId: number = 0;

  constructor(private saleOrderService : SaleOrderServiceService, private activatedRoute: ActivatedRoute, 
    private router: Router, private printService: PrintDocumentsService) {}

  
    ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.printService.clear();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(s => {
      this.saleOrderId = +s.get('id')!});
      this.saleOrderService.getSaleOrdersById(this.saleOrderId).subscribe((x)=>{
      this.listSaleOrder = x;
      });   

  
        this.subscription = this.printService.getSaleOrder$.subscribe((saleOrder) => {
          this.saleOrder = saleOrder;
        });
    

      // this.printService.print().subscribe(x =>{
      //       this.saleOrderNew = x;
      // })

    //this.calculateSub();
    this.calculateIva();

  }
/*   calculateSub(){
    this.saleOrder.detail_sales_order.forEach(detail=>{
      this.subtotal+= detail.quantity*detail.price;
    })
  } */
  calculateIva(){
    this.iva = this.subtotal * 0.21;
  }



  

}


