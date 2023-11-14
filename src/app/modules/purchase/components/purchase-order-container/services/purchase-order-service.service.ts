import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct, IProduct2, ISupplierProduct } from '../../../models/ISuppliers';
import { ISupplier } from '../../../models/ISuppliers';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderServiceService {

  /*
   * variable to share with diferent components
   * must be suscribed to get the changes of the value from the components
   */
  idSupplier = new BehaviorSubject<number>(0);
  suplierSelected = new BehaviorSubject<ISupplier>({
    id: 0,
    socialReason: '',
    adress: '',
    fantasyName: '',
    cuit: '',
  });
  listProductSelected = new BehaviorSubject<ISupplierProduct[]>([]);
  cartProductList: ISupplierProduct[] = [];
  purchaseOrderFlow = new BehaviorSubject<boolean>(true);

  constructor() {}

  /* method to set & get the list of products */
  getCardProductList(): ISupplierProduct[] { return this.cartProductList; }
  getCardProductList2(): Observable<ISupplierProduct[]> { return this.listProductSelected.asObservable(); }
  setCardProductList(products: ISupplierProduct): void { 
    const cartProductSet: Set<ISupplierProduct> = new Set([...this.cartProductList]);
    cartProductSet.add(products);
    this.cartProductList = Array.from(cartProductSet);
  }
  setCardProductList2(productsList: ISupplierProduct[]): void {
    this.cartProductList = productsList;
    this.listProductSelected.next(this.cartProductList);
  }

  /* method to set and get the id of the supplier */
  setIdSupplier(id: number): void { this.idSupplier.next(id); }
  getIdSupplier(): Observable<number> { return this.idSupplier.asObservable(); }

  /* method to set and get the supplier selected */
  setSupplierSelected(supplier: ISupplier): void { this.suplierSelected.next(supplier); }
  getSupplierSelected(): Observable<ISupplier> { return this.suplierSelected.asObservable(); }

  /* method to set and get the list of products selected */
  setProductSelected(productsList: ISupplierProduct[]): void { this.listProductSelected.next(productsList); }
  getListProductSelected(): Observable<ISupplierProduct[]> { return this.listProductSelected.asObservable(); }

  /* Purchase order navigation between screens */
  getPurchaseOrderFlow(): Observable<boolean> { return this.purchaseOrderFlow.asObservable(); }
  setPurchaseOrderFlow(): void { 
    let flow;
    this.getPurchaseOrderFlow().subscribe(purchaseFlow => flow = purchaseFlow)
    this.purchaseOrderFlow.next(!flow); }

}
