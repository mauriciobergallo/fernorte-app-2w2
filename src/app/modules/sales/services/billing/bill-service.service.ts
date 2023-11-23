import { Injectable } from '@angular/core';
import { BillModel } from '../../models/BillingModelApi';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {SaleOrderApi} from "../../models/SaleModelApi";
import {ProductApi} from "../../models/ProductApi";
import {DetailBill} from "../../models/DetailBillModel";
import {Tax} from "../../models/TaxModel";
import { environment } from '../../enviroment/environment';
import { IResponse } from '../../interfaces/IResponse';
import {YearReport} from "../../models/YearReport";

@Injectable({
  providedIn: 'root'
})
export class BillServiceService {

  billList = new Observable<BillModel[]>();
  cae : number = 67360085835381

  filters : Map<string, string> = new Map<string, string>();

  get idBill() {
    return this.filters.get("idBill")
  }
  get clientId() {
    return this.filters.get("clientId")
  }
  get fromDate() {
    return this.filters.get("fromDate")
  }
  get toDate() {
    return this.filters.get("toDate")
  }

  constructor(private http : HttpClient) { }

  private URL = environment.urlBillBase+"/bills";

  createBill(bill: BillModel): Observable<IResponse> {
    const header = { "content-type": "application/json" };
    const body = bill;
    return this.http.post<IResponse>(this.URL, body, { headers: header });
  }

    getBills(page:number) : Observable<BillModel[]> {
      this.billList = this.http.get<BillModel[]>(this.URL+ `?pageNumber=`+page);
      return this.billList;
    }

    getBillsByFilter(filters : Map<string, string>): Observable<BillModel[]> {
    let url:string = '';
    this.filters = filters
    if (this.idBill != '0' && this.idBill != undefined) {
      url = this.URL + `?pageNumber=0&id=${this.idBill}`
    } else if (this.clientId != '0' && this.clientId != null) {
      url = this.URL + `?pageNumber=0&clientId=${this.clientId}`
    } else {
      url = this.URL + `?pageNumber=0&from_date=${this.fromDate}&to_date=${this.toDate}`;
    }
    this.billList = this.http.get<BillModel[]>(url);
    return this.billList
    }


  getReport(): Observable<YearReport> {
    return this.http.get<YearReport>(this.URL + `/report`);
  }

    checkOrder(orderId: number): boolean{
    return true
    }
    addBill(bill: BillModel) : Observable<BillModel[]> {
    return this.http.post<BillModel[]>(this.URL, bill);
  }

  mapSaleOrderToBill(saleOrder: SaleOrderApi): BillModel{
    this.cae += 1
    let order = new BillModel();
    order.id_bill=0;
    order.id_sale_order = saleOrder.id_sale_order || 0;
    order.id_seller = saleOrder.id_seller || 0;
    order.id_client = saleOrder.id_client || 0;
    order.first_name = saleOrder.first_name_client || "";
    order.las_name = saleOrder.last_name_client || "";
    order.company_name = saleOrder.company_name || "";
    order.telephone = Number(saleOrder.telephone) || 0;
    order.email = saleOrder.email || "";
    order.address = saleOrder.address || "";
    order.name_seller = saleOrder.first_name_seller || "";
    order.total_price = 0;
    order.vat_condition = "";
    order.bill_type = "";
    order.cae = this.cae.toString();
    order.expiration_date_cae = saleOrder.date_of_expiration || [];
    order.created_date = saleOrder.date_of_issue || [];

    order.detail_bill = saleOrder.detail_sales_order.map((productApi: ProductApi) => {
      const detailBill = new DetailBill();
      detailBill.id_product = productApi.id_product || 0;
      detailBill.name_product = productApi.name || "";
      detailBill.quantity = productApi.quantity || 0;
      detailBill.unit = "";
      detailBill.tax = {id:1,tax_type:"VAT",tax_value:1.21};
      detailBill.tax.tax_type = "VAT";
      detailBill.tax_value = detailBill.tax.tax_value || 0;
      detailBill.unitary_price = productApi.price || 0;
      detailBill.discount_amount = 0;
      return detailBill;
    });
    return order
  }
}
