import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Isupplier } from '../../shared/interfaces/isupplier';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../../../models/ISuppliers';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderServiceService {

  /*
  * variable to share with diferent components
  * must be suscribed to get the changes of the value from the components
  */
  idSupplier = new BehaviorSubject<number>(0)
  suplierSelected = new BehaviorSubject<Isupplier>({ id: 0, socialReason: "", cuit: 0, adress: "", fantasyName: "" })
  listProductSelected = new BehaviorSubject<IProduct[]>([])


  constructor() { }



  /*
   * method to set and get the id of the supplier
   */
  setIdSupplier(id: number) {
    this.idSupplier.next(id)
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
  setSupplierSelected(supplier: Isupplier) {
    this.suplierSelected.next(supplier)
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
