import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { ISupplierProduct } from '../../../models/ISuppliers';
import { ISupplier } from '../../../models/ISuppliers';
import { PurchaseOrderBack, PurchaseOrderRequest, PurchaseOrderResponse } from '../../../models/IPurchaseOrder';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderServiceService {
  url: string = 'http://localhost:5433/purchase-orders';
  idSupplier = new BehaviorSubject<number>(0);
  suplierSelected = new BehaviorSubject<ISupplier>({
    id: 0,
    socialReason: '',
    address: '',
    fantasyName: '',
    cuit: '',
  });
  listProductSelected = new BehaviorSubject<ISupplierProduct[]>([]);
  cartProductList: ISupplierProduct[] = [];
  purchaseOrderFlow = new BehaviorSubject<boolean>(true);
  ListMockPurchase: PurchaseOrderBack[] = [{
    supplierName: 'Supplier A',
    date: new Date('2023-01-01'),
    purchaseStatus: "ACCEPTED",
    total: 1000,
    employeeName: 'John Doe',
    observation: 'Urgent order',
    billUrl: 'https://example.com/bill1.pdf',
  },
  {
    supplierName: 'Supplier B',
    date: new Date('2023-02-15'),
    purchaseStatus: "CANCELLED",
    total: 2500,
    employeeName: 'Jane Smith',
    observation: 'Standard order',
    billUrl: 'https://example.com/bill2.pdf',
  },
  {
    supplierName: 'Supplier C',
    date: new Date('2023-03-10'),
    purchaseStatus: "GENERATED",
    total: 800,
    employeeName: 'Bob Johnson',
    observation: 'Cancelled due to stock availability',
    billUrl: 'https://example.com/bill3.pdf',
  },];
  purchaseOrdersList = new BehaviorSubject<PurchaseOrderResponse[]>([]);
  filteredPurchaseOrdersList = new BehaviorSubject<PurchaseOrderResponse[]>([]);

  constructor(private http: HttpClient) {}

  // PURCHASES
  postPurchaseOrders(purchase: PurchaseOrderRequest): Observable<PurchaseOrderRequest> {
    return this.http
      .post<PurchaseOrderRequest>(this.url, purchase);
  }

  getPurchaseOrders(): void {
    this.http
      .get<PurchaseOrderResponse[]>(this.url)
      .pipe(
        tap((purchaseOrders: PurchaseOrderResponse[]) => {
          this.purchaseOrdersList.next(purchaseOrders);
          this.filteredPurchaseOrdersList.next(purchaseOrders);
        })
      )
      .subscribe();
  }

  getFilteredPurchaseOrdersList() {
    return this.filteredPurchaseOrdersList.asObservable();
  }
  setFilteredPurchaseOrdersList(purchases: PurchaseOrderResponse[]): void {
    this.filteredPurchaseOrdersList.next(purchases);
  }
  deletePurchaseOrder(orderId: number): Observable<number> {
    const deleteUrl = `${this.url}delete/${orderId}`;
    return this.http.delete(deleteUrl)
    .pipe(
      tap(() => {
        console.log(`Purchase order ${orderId} deleted.`);
      }),
      map(() => 1),
      catchError((error: HttpErrorResponse) => {
        console.error(`Error deleting purchase order ${orderId}: ${error.message}`);
        return of(0); // Return 0 in case of an error
      })
    );
  }

  // PRODUCTS
  setProductSelected(productsList: ISupplierProduct[]): void { this.listProductSelected.next(productsList); }
  getListProductSelected(): Observable<ISupplierProduct[]> { return this.listProductSelected.asObservable(); }
  
  // CART
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

  // SUPPLIER
  setIdSupplier(id: number): void { this.idSupplier.next(id); }
  getIdSupplier(): Observable<number> { return this.idSupplier.asObservable(); }

  setSupplierSelected(supplier: ISupplier): void { this.suplierSelected.next(supplier); }
  getSupplierSelected(): Observable<ISupplier> { return this.suplierSelected.asObservable(); }

  // PURCHASE SCREEN FLOW
  getPurchaseOrderFlow(): Observable<boolean> { return this.purchaseOrderFlow.asObservable(); }
  setPurchaseOrderFlow(): void {
    let flow;
    this.getPurchaseOrderFlow().subscribe(purchaseFlow => flow = purchaseFlow)
    this.purchaseOrderFlow.next(!flow); }

}
