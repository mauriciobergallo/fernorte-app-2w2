import { Component, OnInit } from '@angular/core';
import { IPurchaseOrderDetail } from './models/PurchaseOrderDetail';
import { IPurchaseOrder } from './models/PurchaseOrder';
import { PurchaseOrderService } from './services/purchase-order.service';
import { SupliersService } from 'src/app/modules/purchase/services/supliers.service';
import { ISupliers } from 'src/app/modules/purchase/models/ISuppliers';

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

  allSupplierList:ISupliers[]=[];

  selectedSupplierId: number | null = null;

  constructor(private _purchaseOrdersService:PurchaseOrderService,
              private _suppliersService: SupliersService){}

ngOnInit(): void {
    // Cargar la lista de proveedores al iniciar el componente
    this._suppliersService.getSupliers().subscribe({
      next: (data: ISupliers[]) => {
        this.allSupplierList = data;
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
      //envio las ordenes seleccionadas al service para que lo pidan por ahi.
      ordenesSeleccionadas.forEach((order) => this._purchaseOrdersService.addSelectedPurchaseOrder(order));
    }
  }
  // enviarOrdenDeCompraSeleccionada() {
  //   const ordenesSeleccionadas = this.allPurchaseOrder.filter((order) => order.selected);

  //   if (ordenesSeleccionadas.length === 0) {
  //     alert('No seleccionaste ninguna orden');
  //     this.totalSeleccionado = null;
  //   } else {
  //     Swal.fire({
  //       title: '¿Deseas enviar las órdenes de compra seleccionadas?',
  //       icon: 'question',
  //       showCancelButton: true,
  //       confirmButtonText: 'Sí',
  //       cancelButtonText: 'No',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // Aquí puedes realizar la acción de enviar las órdenes de compra
  //         console.log('Órdenes de compra seleccionadas:', ordenesSeleccionadas);
  //         Swal.fire('Órdenes de compra enviadas', '', 'success');
  //       }
  //     });
  //   }
  // }

  actualizarTotal() {
    // Filtra las órdenes de compra seleccionadas para enviar las que quiero pagar
    const ordenesSeleccionadas = this.allPurchaseOrder.filter((order) => order.selected);
  
    // Calcula el total de las órdenes seleccionadas
    this.totalSeleccionado = ordenesSeleccionadas.reduce((total, order) => total + order.total, 0);
  }

  onSupplierSelected() {
    // Cuando se selecciona un proveedor, filtra las órdenes de compra por su ID y por el estado, que tiene que ser ACCEPTED
    console.log('Selected Supplier ID:', this.selectedSupplierId);
    if (this.selectedSupplierId !== null) {
      this._purchaseOrdersService.getUnpaidPurchaseOrdersBySupplier(this.selectedSupplierId).subscribe({
        next: (data: IPurchaseOrder[]) => {
          this.allPurchaseOrder = data;
          console.log('Purchase Orders after filtering:', this.allPurchaseOrder);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
