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

private subscriptions = new Subscription();

constructor(private billingService: BillServiceService, 
  private caseConverter: CaseConverterPipe,
  private printService: PrintDocumentsService,
  private route:Router) {
}



ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
ngOnInit(): void {
    this.billingService.getBills().subscribe(
      (response)=>{
        let toCamel:BillModel[] = this.caseConverter.toCamelCase(response);
        console.log(response);
        console.log(this.billList)
        this.billList=response.sort((a,b)=>b.id_bill! - a.id_bill!);          
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
    expirationDateCae: expiration_date_cae.toString(),
    createdDate: created_date.toString(),
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
onShowDetails(){

}

onPrint(bill:BillModel) {    
    this.billView = this.mapBill(bill);
    this.printService.sendBill(this.billView);
    this.route.navigateByUrl('printBill')
  } 
}

