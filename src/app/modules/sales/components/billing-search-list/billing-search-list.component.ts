import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BillOk } from '../../models/BillingOk';
import { BillModel } from '../../models/BillingModelApi';
import { ProductApi } from '../../models/ProductApi';
import { ProductOk } from '../../models/ProductOk';
import { BillServiceService } from '../../services/billing/bill-service.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CaseConverterPipe } from '../../pipes/case-converter.pipe';
import { BillView } from '../../models/BillView';
import { DetailBill } from '../../models/DetailBillModel';
import { DetailBillView, Tax } from '../../models/DetailBillView';
import { Payment } from '../../models/PaymentModel';
import { Router } from '@angular/router';
import { PrintDocumentsService } from '../../services/print/print-documents-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-billing-search-list',
  templateUrl: './billing-search-list.component.html',
  styleUrls: ['./billing-search-list.component.css']
})
export class BillingSearchListComponent implements OnInit, OnDestroy {
billList:BillModel[]=[];
billView!:BillView;
bill!:BillModel
billList1:BillView[]=[];

idBill:string="";
doc:string="";
fromDate:string="";
toDate:string="";
filters: Map<string, string> = new Map();
totalPages: number = 0;
totalElements: number = 0;
currentPage : number = 0;
spinner: boolean = true;
selectedBill : any;
private subscriptions = new Subscription();

constructor(private billingService: BillServiceService, 
  private caseConverter: CaseConverterPipe,
  private printService: PrintDocumentsService,
  private route:Router,
  private modaleService:NgbModal) {
}
get totalPagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i);
}


ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
ngOnInit(): void {
    this.billingService.getBills(0).subscribe(
      (response: any)=>{
        let toCamel:BillModel[] = this.caseConverter.toCamelCase(response);
        console.log(response);
        console.log(this.billList)
        this.billList=response.content;  
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.spinner = false;        
      }
    )
}

onSendFilters(form: NgForm){
  if(form.valid){
    this.filters.set("idBill", form.value.idOrder)
      this.filters.set("clientId", form.value.doc)
      this.filters.set("fromDate", form.value.fromDate)
      this.filters.set("toDate", form.value.toDate)
  }
  this.subscriptions.add(
    this.billingService.getBillsByFilter(this.filters).subscribe(

    )
  )

}
mapBill(bill: BillModel): BillView {
  const { id_bill, address, id_seller, name_seller, id_client, first_name, las_name, company_name, telephone, email,vat_condition, bill_type, cae, expiration_date_cae, created_date,total_price,detail_bill,payments, id_sale_order } = bill;
  const detailV: DetailBillView[]=[];
  for(let detail of detail_bill){
    detailV.push(this.mapDetail(detail))
  }
  const bilView: BillView = {
    idBill: id_bill!,
    idSeller: id_seller,
    firstNameSeller: name_seller,
    address: address,
    telephone: telephone,
    email: email,
    companyName: company_name,
    idClient: id_client,
    firstNameClient: first_name,
    lastNameClient: las_name,
    vatCondition: vat_condition,
    billType: bill_type,
    cae: cae,
    expirationDateCae: expiration_date_cae,
    createdDate: created_date,
    totalPrice: total_price,
    detailBill: detailV,
    payment: payments,
    lastNameSeller: '',
    idSaleOrder: id_sale_order!
  };
  return bilView;
}
mapDetail(detail : DetailBill) : DetailBillView {
  const { id, tax , id_product, name_product, quantity, unit, tax_value, unitary_price, discount_amount } = detail;
  const detailV : DetailBillView = {
    id:id!,
    tax: new Tax,
    nameProduct:name_product,    
    idProduct : id_product,
    unit:unit,
    unitaryPrice:unitary_price,
    discountAmount:discount_amount,
    quantity:quantity,
  } 
  return detailV
}
onShowDetails(item:any, content: any){
  this.selectedBill = item;
  console.log(this.selectedBill)
  this.openModal(content);
}
openModal(content: any) {
  this.modaleService.open(content, { centered: true });
}
onCalculateTotal(bill: any): string|number {
  let total = 0;
  
  if (bill && bill.details) {
    for (const prod of bill.details) {
      total += (prod.quantity * prod.unitary_price);
    }
  }

  return bill.total_price;
}
onCloseDetails() {
  this.modaleService.dismissAll();
}

onLoadPage(page : number) {
  this.billList = [];
  this.spinner= true;
  if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;
    this.subscriptions.add(
      this.billingService.getBills(page).subscribe(
        ( response : any ) => {
          console.log(response.content)
          this.billList = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;          
          this.spinner= false;
        }
      )
    )
  }
}

onPrint(bill:BillModel) {    
    this.billView = this.mapBill(bill);
    this.printService.sendBill(this.billView);
    this.route.navigateByUrl('printBill')
  } 
}

