import { Component, OnInit } from '@angular/core';
import { IPurchaseOrderDetail } from './models/PurchaseOrderDetail';
import { IPurchaseOrder } from './models/PurchaseOrder';
import { PurchaseOrderService } from './services/purchase-order.service';

@Component({
  selector: 'fn-payment-order-grid',
  templateUrl: './payment-order-grid.component.html',
  styleUrls: ['./payment-order-grid.component.css']
})
export class PaymentOrderGridComponent implements OnInit{
  //aca se cargarian todos las ordenes de compra que no estan pagas, es decir que itsPaid=false.
  allPurchaseOrder: IPurchaseOrder[]=[];
  // aca se carga el total del precio de las ordenes de compra seleccionadas.
  totalSeleccionado: number | null = null; 

  constructor(private _purchaseOrdersService:PurchaseOrderService){}

  ngOnInit(): void {
    this._purchaseOrdersService.getUnpaidPurchaseOrders().subscribe({
      next: (data: IPurchaseOrder[]) => {
        this.allPurchaseOrder = data;
        console.log(this.allPurchaseOrder);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  enviarOrdenDeCompraSeleccionada() {
    // Filtra las órdenes de compra seleccionadas
    const ordenesSeleccionadas = this.allPurchaseOrder.filter((order) => order.selected);

    if (ordenesSeleccionadas.length === 0) {
      alert('No seleccionaste ninguna orden');
      this.totalSeleccionado = null; // Restablece el total a null si no hay órdenes seleccionadas
    } else {
      // aca deberia enviar las ordenes de compra cuando me digan como las mando y a donde xddd
      console.log('Órdenes de compra seleccionadas:', ordenesSeleccionadas);
    }
  }

  actualizarTotal() {
    // Filtra las órdenes de compra seleccionadas para enviar las que quiero pagar
    const ordenesSeleccionadas = this.allPurchaseOrder.filter((order) => order.selected);
  
    // Calcula el total de las órdenes seleccionadas
    this.totalSeleccionado = ordenesSeleccionadas.reduce((total, order) => total + order.total, 0);
  }
}
