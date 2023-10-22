import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../../../models/ISuppliers';
import { ISupliers } from '../../../models/ISuppliers'; 

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderServiceService {

  /*
  * variable to share with diferent components
  * must be suscribed to get the changes of the value from the components
  */
  idSupplier = new BehaviorSubject<number>(0)
  suplierSelected = new BehaviorSubject<ISupliers>({ id: 0, socialReason: "", adress: "", fantasyName: "", cuit: "" })
  listProductSelected = new BehaviorSubject<IProduct[]>([])


  constructor() { }



  /*
   * method to set and get the id of the supplier
   */
  setIdSupplier(id: number) {
    this.idSupplier.next(id)
    // alert("desde el servicio se cambio el id supplier: " + id)
  }

  /*
   * method to retunr the id of the supplier 
   */
  getIdSupplier() {
    return this.idSupplier.asObservable()
  }




  /*
  * method to set and get the supplier selected
  */
  setSupplierSelected(supplier: ISupliers) {

    this.suplierSelected.next(supplier)
    // alert("desde el servicio se cambio el supplier selected: " + supplier.socialReason)
  }


  /*
  * method to return the supplier selected
  */
  getSupplierSelected() {
    return this.suplierSelected.asObservable()
  }




  /*
  * method to set and get the list of products selected
  */
  setListProductSelected(list: IProduct[]) {
    this.listProductSelected.next(list)
  }


  /*
  * method to return the list of products selected
  */
  getListProductSelected() {
    return this.listProductSelected.asObservable()
  }






}
