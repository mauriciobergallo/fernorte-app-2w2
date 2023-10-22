import { Component, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../purchase-order-container/services/purchase-order-service.service';
import { ISupliers } from '../../../models/ISuppliers';
import { SupliersService } from '../../../services/supliers.service';
import { ProductsService } from '../../../services/products.service';
import { Isupplier } from '../interfaces/isupplier';

@Component({
  selector: 'fn-hedear-supplier',
  templateUrl: './hedear-supplier.component.html',
  styleUrls: ['./hedear-supplier.component.css']
})
export class HedearSupplierComponent implements OnInit {

  constructor(private _purchaseOrderService: PurchaseOrderServiceService) { }

  idSelected: number = 0
  supplierList: ISupliers[] = []
  supplier: ISupliers = {id: 0, socialReason:"", cuit:"",adress:"", fantasyName:""} 
  
  

  ngOnInit(): void {
    this.getIdSelected()
   
  }

  onSelectChange(event: any){
    this.idSelected = event.target.value
    this.supplier = this.supplierList.find(x => x.id == this.idSelected)!
    console.log(this.supplier)
  }


  getIdSelected(){
    this._purchaseOrderService.getIdSupplier().subscribe(
      {
        next: data  =>{console.log(data)},
        error: error => {console.log(error)},
      })
    }


}
