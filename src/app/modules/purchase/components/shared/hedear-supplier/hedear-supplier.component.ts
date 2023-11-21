import { Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../purchase-order-container/services/purchase-order-service.service';
import { Isupplier } from '../../shared/interfaces/isupplier';
import { SupliersService } from '../../../services/supliers.service';
import { Subscription } from 'rxjs';
import { ISupplier } from '../../../models/ISuppliers';

@Component({
  selector: 'fn-hedear-supplier',
  templateUrl: './hedear-supplier.component.html',
  styleUrls: ['./hedear-supplier.component.css']
})
export class HedearSupplierComponent implements OnInit, OnDestroy {

  constructor(
    private _purchaseOrderService: PurchaseOrderServiceService,
    private _suplierService: SupliersService,
    ) { }



  idSelected: number = 0
  supplierList: ISupplier[] = []
  public supplierSelected : ISupplier = {id: 0, socialReason:"", cuit:"" ,address:"", fantasyName:""} 
  showDropDown: boolean = true

  suscription = new Subscription()
  

  ngOnInit(): void {
    this._purchaseOrderService.setIdSupplier(0)
    this.getListSuplierFromService()

  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
    this._purchaseOrderService.setIdSupplier(0)
  }

  /*
  * function that is executed when the select changes
  * when taking the value of the select, it is assigned to the variable idSelected
  * then the supplier is searched in the list of suppliers with the id that was selected
  */
  onSelectChange(event: any){
   
   

      this.supplierSelected = this.supplierList.find(x => x.id == this.idSelected)!

    // console.log("supplier selected: " + this.supplierSelected + "id selected: " + this.idSelected)

    //going to the service to change the value of the supplier selected and the id of the supplier
    this._purchaseOrderService.setIdSupplier(this.idSelected)
    this._purchaseOrderService.setSupplierSelected(this.supplierSelected)

    //changing the value of the supplier selected and the id of the supplier to 0 to sure that the value
    // is changed when go to the service
    this.idSelected= 0
    this.supplierSelected = {id: 0, socialReason:"", cuit:"" ,address:"", fantasyName:""}

    //getting the value of the supplier selected and the id of the supplier from service
    this.getSupplierSelectedFromService()
    this.getIdFromService()

    
    


  }

  getListSuplierFromService() {
    this.suscription.add(
      this._suplierService.getSupliers().subscribe({
        next: (data: ISupplier[]) => {
          console.log(data);
          this.supplierList = data;
        },
        error: (error: any) => {
          console.log(error);
        },
      })
    );
  }

  getIdFromService() {
    //getting the value of the id supplier from service
    this.suscription.add(
      this._purchaseOrderService.getIdSupplier().subscribe(
        {
          next: (data: number) => {
            console.log("id supplier from service: " + data),
              this.idSelected = data
          },
          error: (error: any) => { console.log(error) }
        }
      ))
  }

  getSupplierSelectedFromService() {
    //getting the value of the supplier selected and the id of the supplier from service
    this.suscription.add(
      this._purchaseOrderService.getSupplierSelected().subscribe(
        {
          next: (data: ISupplier) => {
            console.log("supplier selected from service: " + data.socialReason),
              this.supplierSelected = data
          },
          error: (error: any) => { console.log(error) }
        }
      ))
  }

  showSelectSupplier(){
    this.showDropDown = false
  }

}
