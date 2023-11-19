import { Injectable } from '@angular/core';
import { SaleOrderModel } from '../../models/SaleOrderModel';
import { SaleOrderProvider } from './SaleOrderProvider';
import { ProductModel } from '../../models/ProductModel';
import { DetailsSaleOrderModel } from '../../models/DetailsSaleOrderModel';
import { TypeSalesOrder } from '../../models/TypeSaleOrder';
import { SaleOrderStates } from '../../models/SalesOrderState';
import { MontoTotalModel } from '../../models/ModelTotalModel';
import { DetailsState } from '../../models/DetailsState';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SaleOrderApi } from '../../models/SaleModelApi';

import { SaleOrderView } from '../../models/SaleOrderView';
//import html2PDF from 'jspdf-html2canvas/dist/js-pdf';


@Injectable({
  providedIn: 'root'
})
export class SaleOrderServiceService {

  saleOrderList = new Observable<SaleOrderApi[]>();

  saleOrderListView = new Observable<SaleOrderView[]>();

  saleOrderStates = new Observable<string[]>();

  filters: Map<string, string> = new Map<string, string>();
  get idOrder() {
    return this.filters.get("idOrder")
  }

  get doc() {
    return this.filters.get("doc")
  }
  get fromDate() {
    return this.filters.get("fromDate")
  }
  get toDate() {
    return this.filters.get("toDate")
  }
  get stateOrder() {
    return this.filters.get("stateOrder")
  }

  constructor(private saleOrderProvider: SaleOrderProvider,
    private http: HttpClient) { }

  // getSaleOrders(): SaleOrderModel[] {
  //   return this.saleOrderProvider.getSaleOrders();
  // }

  generatePdf(detalleOrdenVenta: any) {
    // if (detalleOrdenVenta) {
    //   html2PDF(detalleOrdenVenta.nativeElement, {
    //     jsPDF: {
    //       format: 'a4',
    //     },
    //     imageType: 'image/jpeg',
    //     output: './pdf/generate.pdf'
    //   });
    // }
  }
  getSaleOrders(): Observable<SaleOrderApi[]> {
    this.saleOrderList = this.http.get<SaleOrderApi[]>("http://localhost:8087/sales-orders");
    return this.saleOrderList;
  }

  getSaleOrderStates(): Observable<string[]> {
    this.saleOrderStates = this.http.get<string[]>("http://localhost:8087/sales-orders/states");
    return this.saleOrderStates;
  }

  // getSaleOrdersByIdOrder(filterSent:any) : Observable<SaleOrderApi[]> {
  //   this.idOrder=filterSent;
  //   this.saleOrderList = this.http.get<SaleOrderModel[]>(`http://localhost:8080/sales-orders?id_order=${this.idOrder}`)
  //   return this.saleOrderList;
  // }

  // getSaleOrdersByDoc(filterSent:any) : Observable<SaleOrderModel[]> {
  //   this.doc=filterSent;
  //   this.saleOrderList = this.http.get<SaleOrderModel[]>(`http://localhost:8080/sales-orders?doc_client=${this.doc}`)
  //   return this.saleOrderList;
  // }

  // getSaleOrdersByDate(filterSent:any) : Observable<SaleOrderModel[]> {
  //   if(filterSent.includes('-')){
  //     const index = filterSent.indexOf('/')
  //     this.fromDate = filterSent.slice(0,index)
  //     this.toDate = filterSent.slice(index+1, filterSent.length)
  //   }
  //   this.saleOrderList = this.http.get<SaleOrderModel[]>(`http://localhost:8080/sales-orders?from_date=${this.fromDate}&to_date=${this.toDate}`)
  //   console.log(this.saleOrderList);
  //   return this.saleOrderList;
  // }

  // getSaleOrdersByDate(filterSent:any) : Observable<SaleOrderModel[]> {
  //   if(filterSent.includes('-')){
  //     const index = filterSent.indexOf('/')
  //     this.fromDate = filterSent.slice(0,index)
  //     this.toDate = filterSent.slice(index+1, filterSent.length)
  //   }
  //   this.saleOrderList = this.http.get<SaleOrderModel[]>(`http://localhost:8080/sales-orders?from_date=${this.fromDate}&to_date=${this.toDate}`)
  //   console.log(this.saleOrderList);
  //   return this.saleOrderList;
  // }

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

  // getSaleOrdersByFilter(idOrder?:string, doc?:string, fromDate?:string, toDate?:string) : SaleOrderModel[] {
  //   const saleOrdersList : SaleOrderModel[] = [];
  //   if(idOrder != "" && idOrder != null) {
  //     this.saleOrderProvider.getSaleOrdesByFilter(idOrder, '', '', '').subscribe((response) => {
  //       if(response.ok) {
  //         for(let sale of response.data) {
  //           saleOrdersList.push(sale)
  //           console.log(saleOrdersList)
  //         }
  //         return saleOrdersList
  //       } else {
  //         alert('No fue posible recuperar los datos')
  //       }
  //       return null
  //     })
  //   } else if(doc != "" && doc != null) {
  //     this.saleOrderProvider.getSaleOrdesByFilter('', doc, '', '').subscribe((response) => {
  //       if(response.ok) {
  //         for(let sale of response.data) {
  //           saleOrdersList.push(sale)
  //           console.log(saleOrdersList)
  //         }
  //         return saleOrdersList
  //       }
  //       return null
  //     })
  //   } else {
  //     this.saleOrderProvider.getSaleOrdesByFilter('', '', fromDate, toDate).subscribe((response) => {
  //       if(response.ok) {
  //         for(let sale of response.data) {
  //           saleOrdersList.push(sale)
  //           console.log(saleOrdersList)
  //         }
  //         return saleOrdersList
  //       }
  //       return null
  //     })
  //   }

  //   return saleOrdersList;
  // }

  getSaleOrdesByFilter(filters: Map<string, string>): Observable<SaleOrderApi[]> {
    let url: string = '';
    this.filters = filters
    if (this.idOrder != '0' && this.idOrder != undefined) {
      url = `http://localhost:8087/sales-orders?id_order=${this.idOrder}`
    } else if (this.doc != '0' && this.doc != null) {
      url = `http://localhost:8087/sales-orders?doc_client=${this.doc}`
    } else if (this.stateOrder != '' && this.stateOrder != null) {
      url = `http://localhost:8087/sales-orders?state_sale_order=${this.stateOrder}`
    } else {
      url = `http://localhost:8087/sales-orders?from_date=${this.fromDate}&to_date=${this.toDate}`;
    }
    this.saleOrderList = this.http.get<SaleOrderApi[]>(url);
    return this.saleOrderList
  }

  // onReceiveFilters(filters : Map<string, string>) {
  //   this.doc = filters.get("doc")!
  //   this.idOrder = filters.get("idOrder")!
  //   this.fromDate = filters.get("fromDate")!
  //   this.toDate = filters.get("toDate")!
  //   this.stateOrder = filters.get("state")!
  // }

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
        name: "EZE",
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


    getSaleOrdersById(id:number) : Observable<SaleOrderView> {
    return this.http.get<SaleOrderView>(`http://localhost:8080/sales-orders?id_order=${id}`)

    }
}
