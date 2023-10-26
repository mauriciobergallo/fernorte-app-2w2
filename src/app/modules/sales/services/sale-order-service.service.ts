import { Injectable } from '@angular/core';
import { ISaleOrder } from '../interfaces/isale-order';
import { SaleOrderProvider } from '../providers/SaleOrderProvider';
import { ProductModel } from '../models/ProductModel';
import { IDetailsSaleOrder } from '../interfaces/idetails-sale-order';
import { TypeSalesOrder } from '../models/TypeSaleOrder';
import { SaleOrderStates } from '../models/SalesOrderState';
import { MontoTotalModel } from '../models/ModelTotalModel';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderServiceService {

  constructor(private saleOrderProvider: SaleOrderProvider) { }


  createSaleOrder(saleOrder: ISaleOrder){

    this.saleOrderProvider.createSaleOrder(saleOrder).subscribe((res) => {
      if (res.ok) {
        return res.data
      }
      return null;
    });
  }

  getSaleOrders() : ISaleOrder[] {
    return this.saleOrderProvider.getSaleOrders();
  }

  getSaleOrdersByFilter(idOrder?:string, doc?:string, fromDate?:string, toDate?:string) : ISaleOrder[] {
    const saleOrdersList : ISaleOrder[] = [];
    if(idOrder != '' || idOrder != null) {
      this.saleOrderProvider.getSaleOrdesByFilter(idOrder, '', '', '').subscribe((response) => {
        if(response.ok) {
          for(let sale of response.data) {
            saleOrdersList.push(sale)
            console.log(saleOrdersList)
            return saleOrdersList;
          }
        } else {
          alert('No fue posible recuperar los datos')
        }
        return null
      })
    } else if(doc != '' || doc != null) {
      this.saleOrderProvider.getSaleOrdesByFilter('', doc, '', '').subscribe((response) => {
        if(response.ok) {
          for(let sale of response.data) {
            saleOrdersList.push(sale)
            console.log(saleOrdersList.toString())
            return saleOrdersList;
          }
        }
        return null
      })
    } else {
      this.saleOrderProvider.getSaleOrdesByFilter('', '', fromDate, toDate).subscribe((response) => {
        if(response.ok) {
          for(let sale of response.data) {
            saleOrdersList.push(sale)
            console.log(saleOrdersList.toString())
            return saleOrdersList;
          }
        }
        return null
      })
    }
    
    return saleOrdersList;
  }

  ValidarPresupuestoOOrdenVenta(saleOrder: ISaleOrder, carrito: ProductModel[]): boolean {
    return saleOrder.detail_sales_order.some(x => x.quantity > carrito.find(y => parseInt(y.codigo) == x.id_product)!.cantidad)
  }
  buildSaleOrder(stateDetail: SaleOrderStates, type: TypeSalesOrder, carrito: ProductModel[]) :ISaleOrder{
    let saleOrder: ISaleOrder = ({
      id_seller: 1,
      id_client: 1,
      date_of_issue: new Date().toISOString(),
      date_of_expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      state_sale_order: stateDetail,
      detail_sales_order: []

    });

    for (let index = 0; index < carrito.length; index++) {
      const element = carrito[index];
      const detail_sales_order: IDetailsSaleOrder = {
        id_product: parseInt(element.codigo),
        quantity: element.cantidadSeleccionado!,
        price: element.cantidadSeleccionado! * element.precioUnitario,
        state_sale_order_detail: stateDetail,
      };
      saleOrder.detail_sales_order.push(detail_sales_order);
    }


    return saleOrder;
  }

  calcularTotal(carrito: ProductModel[]):MontoTotalModel {
    let montoTotal: MontoTotalModel = new MontoTotalModel();
    for (let index = 0; index < carrito.length; index++) {
      const element = carrito[index];
      montoTotal.subTotal += element.cantidadSeleccionado! * element.precioUnitario
    }
    return montoTotal;
  }
  ActualizarSubTotal(carrito: ProductModel[],productoSeleccionado:ProductModel):MontoTotalModel {
    let montoTotal: MontoTotalModel = new MontoTotalModel();
    for (let index = 0; index < carrito.length; index++) {
      const element = carrito[index];
      montoTotal.subTotal += element.cantidadSeleccionado! * element.precioUnitario
    }
    return montoTotal;
  }


}
