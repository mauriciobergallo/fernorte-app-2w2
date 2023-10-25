import { Injectable } from '@angular/core';
import { SaleOrderModel } from '../../models/SaleOrderModel';
import { SaleOrderProvider } from './SaleOrderProvider';
import { ProductModel } from '../../models/ProductModel';
import { DetailsSaleOrderModel } from '../../models/DetailsSaleOrderModel';
import { TypeSalesOrder } from '../../models/TypeSaleOrder';
import { SaleOrderStates } from '../../models/SalesOrderState';
import { MontoTotalModel } from '../../models/ModelTotalModel';
import { DetailsState } from '../../models/DetailsState';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderServiceService {


  constructor(private saleOrderProvider: SaleOrderProvider) { }

  getSaleOrders(): SaleOrderModel[] {
    return this.saleOrderProvider.getSaleOrders();
  }

  getSaleOrdersByFilter(filter: string): SaleOrderModel[] {
    const saleOrdersList: SaleOrderModel[] = [];
    this.saleOrderProvider.getSaleOrdesByFilter(filter).subscribe((response) => {
      if (response.ok) {
        for (let sale of response.data) {
          saleOrdersList.push(sale)
          return saleOrdersList;
        }
      }
      return null
    });
    return saleOrdersList;
  }

  ValidarPresupuestoOOrdenVenta(saleOrder: SaleOrderModel, carrito: ProductModel[]): boolean {
    return saleOrder.detail_sales_order.some(x => x.quantity > carrito.find(y => y.idProduct == x.id_product)!.stockQuantity)
  }
  buildSaleOrder(state: SaleOrderStates, type: TypeSalesOrder, carrito: ProductModel[], orderSale?:SaleOrderModel): SaleOrderModel {
    let id = 0;
    let detailsState: DetailsState = DetailsState.CANCELLED;
    if(type == TypeSalesOrder.ORDEN_VENTA){
        id = orderSale?.id_sale_order!
    } else if(type == TypeSalesOrder.PRESUPUESTO){
      detailsState = DetailsState.RESERVED
    }

    let saleOrder: SaleOrderModel = ({
      id_sale_order: id,
      id_seller: 1,
      id_client: 1,
      date_of_issue: new Date().toISOString(),
      date_of_expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      state_sale_order: state,
      detail_sales_order: []

    });

    for (let index = 0; index < carrito.length; index++) {
      const element = carrito[index];
      let idDetail:number = 0;

      if (type == TypeSalesOrder.ORDEN_VENTA) {
        const matchingDetails = orderSale!.detail_sales_order.filter(x => element.idProduct === x.id_product);
    
        if (matchingDetails.length > 0) {
          idDetail = matchingDetails[0].id_sale_order_details!;
        }
      }

      const detail_sales_order: DetailsSaleOrderModel = {
        id_sale_order: id,
        id_sale_order_details: idDetail,
        id_product: element.idProduct,
        quantity: element.cantidadSeleccionado!,
        price: element.cantidadSeleccionado! * element.unitPrice,
        state_sale_order_detail: detailsState,
      };
      saleOrder.detail_sales_order.push(detail_sales_order);
    }


    return saleOrder;
  }

  calcularTotal(carrito: ProductModel[]): MontoTotalModel {
    let montoTotal: MontoTotalModel = new MontoTotalModel();
    for (let index = 0; index < carrito.length; index++) {
      const element = carrito[index];
      montoTotal.subTotal += element.cantidadSeleccionado! * element.unitPrice;
    }
    return montoTotal;
  }
  ActualizarSubTotal(carrito: ProductModel[]): MontoTotalModel {
    let montoTotal: MontoTotalModel = new MontoTotalModel();
    for (let index = 0; index < carrito.length; index++) {
      const element = carrito[index];
      montoTotal.subTotal += element.cantidadSeleccionado! * element.unitPrice
    }
    return montoTotal;
  }


}
