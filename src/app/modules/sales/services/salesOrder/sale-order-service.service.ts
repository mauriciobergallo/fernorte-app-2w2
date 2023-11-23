import { Injectable } from '@angular/core';
import { SaleOrderModel } from '../../models/SaleOrderModel';
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
import { environment } from '../../enviroment/environment';


@Injectable({
  providedIn: 'root'
})
export class SaleOrderServiceService {
  saleOrderList = new Observable<SaleOrderApi[]>();
  saleOrderListView = new Observable<SaleOrderView[]>();
  saleOrderStates = new Observable<string[]>();
  filters: Map<string, string> = new Map<string, string>();

  get page(){
    return this.filters.get("page")
  }
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

  constructor(private http: HttpClient) { }

    private URL = environment.urlSaleBase+"/sales-orders";
  
    createSaleOrder(saleOrder: SaleOrderModel): Observable<any> {
      const url = this.URL + "/sales-orders";
      const header = { "content-type": "application/json" };
      const body = {
        id_sale_order: saleOrder.idSaleOrder,
        id_seller: saleOrder.idSeller,
        first_name_seller: saleOrder.firstNameSeller,
        last_name_seller: saleOrder.lastNameSeller,
        id_client: saleOrder.idClient,
        first_name_client: saleOrder.firstNameClient,
        last_name_client: saleOrder.lastNameClient,
        company_name: saleOrder.companyName,
        date_of_issue: saleOrder.dateOfIssue,
        date_of_expiration: saleOrder.dateOfExpiration,
        state_sale_order: saleOrder.stateSaleOrder,
        detail_sales_order: saleOrder.detailSalesOrder
      };
      return this.http.post<any>(url, body, { headers: header });
    }  

  getSaleOrders(): Observable<SaleOrderApi[]> {
    this.saleOrderList = this.http.get<SaleOrderApi[]>(this.URL+"?page=0");
    return this.saleOrderList;
  }

  getSaleOrderStates(): Observable<string[]> {
    this.saleOrderStates = this.http.get<string[]>(this.URL+"/states");
    return this.saleOrderStates;
  } 

  getSaleOrdesByFilter(filters: Map<string, string>): Observable<SaleOrderApi[]> {
    let url: string = '';
    this.filters = filters
    if (this.idOrder != '0' && this.idOrder != undefined) {
      url = `${this.URL}/${this.idOrder}`
    } else if (this.doc != '0' && this.doc != null) {
      url = `${this.URL}?page=0&doc_client=${this.doc}`
    } else if (this.stateOrder != '' && this.stateOrder != null) {
      url = `${this.URL}?page=0&state_sale_order=${this.stateOrder}`
    } else {
      url = `${this.URL}?page=0&from_date=${this.fromDate}&to_date=${this.toDate}`;
    }
    this.saleOrderList = this.http.get<SaleOrderApi[]>(url);
    return this.saleOrderList
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
    return this.http.get<SaleOrderView>(`${this.URL}?id_order=${id}`)

    }
}
