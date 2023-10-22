import { Injectable } from '@angular/core';
import { ISaleOrder } from '../interfaces/isale-order';
import { SaleOrderProvider } from './SaleOrderProvider';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderServiceService {

  constructor(private saleOrderProvider: SaleOrderProvider) { }


  createSaleOrder(saleOrder: ISaleOrder) {
    
    this.saleOrderProvider.createSaleOrder(saleOrder).subscribe((res) => {
      if (res.ok) {
        return res.data
      }
      return null;
    });
  }
  ValidarPresupuestoOOrdenVenta(saleOrder: ISaleOrder, carrito:IProduct[] ):boolean {
    return saleOrder.detail_sales_order.some(x => x.quantity > carrito.find( y => parseInt(y.codigo) == x.id_product)!.cantidad)
  }

}
