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

  // getSaleOrdersByFilter(filter: string): SaleOrderModel[] {
  //   const saleOrdersList: SaleOrderModel[] = [];
  //   this.saleOrderProvider.getSaleOrdesByFilter(filter).subscribe((response) => {
  //     if (response.ok) {
  //       for (let sale of response.data) {
  //         saleOrdersList.push(sale)
  //         return saleOrdersList;
  //       }
  //     }
  //     return null
  //   });
  //   return saleOrdersList;
  // }

  getSaleOrdersByFilter(idOrder?: string, doc?: string, fromDate?: string, toDate?: string): SaleOrderModel[] {
    const saleOrdersList: SaleOrderModel[] = [];
    if (idOrder != "" && idOrder != null) {
      this.saleOrderProvider.getSaleOrdesByFilter(idOrder, '', '', '').subscribe((response) => {
        if (response.ok) {
          for (let sale of response.data) {
            saleOrdersList.push(sale)
            console.log(saleOrdersList)
          }
          return saleOrdersList
        } else {
          alert('No fue posible recuperar los datos')
        }
        return null
      })
    } else if (doc != "" && doc != null) {
      this.saleOrderProvider.getSaleOrdesByFilter('', doc, '', '').subscribe((response) => {
        if (response.ok) {
          for (let sale of response.data) {
            saleOrdersList.push(sale)
            console.log(saleOrdersList)
          }
          return saleOrdersList
        }
        return null
      })
    } else {
      this.saleOrderProvider.getSaleOrdesByFilter('', '', fromDate, toDate).subscribe((response) => {
        if (response.ok) {
          for (let sale of response.data) {
            saleOrdersList.push(sale)
            console.log(saleOrdersList)
          }
          return saleOrdersList
        }
        return null
      })
    }

    return saleOrdersList;
  }

  ValidarPresupuestoOOrdenVenta(saleOrder: SaleOrderModel, carrito: ProductModel[]): boolean {
    return saleOrder.detailSalesOrder!.some(x => x.quantity > carrito.find(y => y.idProduct == x.id_product)!.stockQuantity)
  }
  buildSaleOrder(state: SaleOrderStates, type: TypeSalesOrder, carrito: ProductModel[], orderSale?: SaleOrderModel): SaleOrderModel {
    let id = 0;
    let detailsState: DetailsState = DetailsState.CANCELLED;
    if (type == TypeSalesOrder.ORDEN_VENTA) {
      id = orderSale?.idSaleOrder!
    } else if (type == TypeSalesOrder.PRESUPUESTO) {
      detailsState = DetailsState.RESERVED
    }

    let saleOrder: SaleOrderModel = ({
      idSaleOrder: id,
      idSeller: 1,
      firstNameClient: "Eze",
      firstNameSeller: "Eze vende",
      lastNameClient: "ale",
      lastNameSeller: "ale vende",
      companyName: "",
      idClient: 1,
      dateOfIssue: new Date().toISOString(),
      dateOfExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      stateSaleOrder: state,
      detailSalesOrder: []

    });

    for (let index = 0; index < carrito.length; index++) {
      const element = carrito[index];
      let idDetail: number = 0;

      if (type == TypeSalesOrder.ORDEN_VENTA) {
        const matchingDetails = orderSale!.detailSalesOrder!.filter(x => element.idProduct === x.id_product);

        if (matchingDetails.length > 0) {
          idDetail = matchingDetails[0].id_sale_order_details!;
        }
      }

      const detail_sales_order: DetailsSaleOrderModel = {
        name: "Eze",
        id_sale_order_details: idDetail,
        id_product: element.idProduct,
        quantity: element.cantidadSeleccionado!,
        price: element.cantidadSeleccionado! * element.unitPrice,
        state_sale_order_detail: detailsState,
      };
      saleOrder.detailSalesOrder!.push(detail_sales_order);
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
