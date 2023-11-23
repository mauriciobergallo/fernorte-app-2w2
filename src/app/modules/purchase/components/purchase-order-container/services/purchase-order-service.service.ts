import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { ISupplierProduct } from '../../../models/ISuppliers';
import { ISupplier } from '../../../models/ISuppliers';
import { PurchaseOrderBack, PurchaseOrderRequest, PurchaseOrderResponse } from '../../../models/IPurchaseOrder';
import { IBooking, Order } from '../../../models/ibooking';

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
  // private booking = new BehaviorSubject<IBooking>({} as IBooking);
  private bookings: IBooking = {} as IBooking;
  
  //banderas para mostrar ocultar componentes
  purchaseBookingFlow = new BehaviorSubject<boolean>(false);
  purchaseHeaderFlow = new BehaviorSubject<boolean>(true);
  purchaseProductCardFlow = new BehaviorSubject<boolean>(true);
  purchaseCartFlow = new BehaviorSubject<boolean>(true);
  purchasePreviewFlow = new BehaviorSubject<boolean>(false);
  purchaseOrderFlow = new BehaviorSubject<boolean>(true);


  listProductSelectedToBooking = new BehaviorSubject<any[]>([]);
  listProductOriginalToBooking = new BehaviorSubject<any[]>([ 
    { idSupplier:0, idProduct:1, name:"mi producto", price: 100, quantity: 1, isSelected: false},
    { idSupplier:0, idProduct:2, name:"mi producto 2", price: 200, quantity: 1, isSelected: false},
    { idSupplier:0, idProduct:3, name:"mi producto 3", price: 300, quantity: 1, isSelected: false}
  ]);

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

  // PRODUCTS
  /* method to set and get the list of products selected */
  setProductSelected(productsList: ISupplierProduct[]): void { this.listProductSelected.next(productsList); }
  getListProductSelected(): Observable<ISupplierProduct[]> { return this.listProductSelected.asObservable(); }

  /* Navegacion general*/
  // PURCHASE SCREEN FLOW
  getPurchaseOrderFlow(): Observable<boolean> { return this.purchaseOrderFlow.asObservable(); }
  setPurchaseOrderFlow(): void {
    let flow;
    this.getPurchaseOrderFlow().subscribe(purchaseFlow => flow = purchaseFlow)
    this.purchaseOrderFlow.next(!flow); }

  /*Navegacion del Booking */  
  getPurchaseBookingFlow(): Observable<boolean> { return this.purchaseBookingFlow.asObservable(); }
  setPurchaseBookingFlow(value: boolean): void {
    let flow;
    this.getPurchaseBookingFlow().subscribe(bookingFlow => flow = bookingFlow)
    this.purchaseBookingFlow.next(value); }


  /*Navegacion del Header */
  getPurchaseHeaderFlow(): Observable<boolean> { return this.purchaseHeaderFlow.asObservable(); }
  setPurchaseHeaderFlow(value: boolean): void {
    let flow;
    this.getPurchaseHeaderFlow().subscribe(headerFlow => flow = headerFlow)
    this.purchaseHeaderFlow.next(value); }

  /*Navegacion del Product Card */
  getPurchaseProductCardFlow(): Observable<boolean> { return this.purchaseProductCardFlow.asObservable(); }
  setPurchaseProductCardFlow(value: boolean): void {
    let flow;
    this.getPurchaseProductCardFlow().subscribe(productCardFlow => flow = productCardFlow)
    this.purchaseProductCardFlow.next(value); }

  /*Navegacion del Cart */
  getPurchaseCartFlow(): Observable<boolean> { return this.purchaseCartFlow.asObservable(); }
  setPurchaseCartFlow(value: boolean): void {
    let flow;
    this.getPurchaseCartFlow().subscribe(cartFlow => flow = cartFlow)
    this.purchaseCartFlow.next(value); }

  /*Navegacion del Preview */
  getPurchasePreviewFlow(): Observable<boolean> { return this.purchasePreviewFlow.asObservable(); }
  setPurchasePreviewFlow(value: boolean): void {
    let flow;
    this.getPurchasePreviewFlow().subscribe(previewFlow => flow = previewFlow)
    this.purchasePreviewFlow.next(value); }
  

  /* metodo para obtener los productos del carrito */
  getListProductToBooking(): Observable<any[]> { return this.listProductOriginalToBooking.asObservable(); }
  
  //metodo para borrar un producto de la lista del carrito
  deleteProductToBooking(idProduct: number): void {
    const listProduct = this.listProductOriginalToBooking


    // const listProduct = this.listProductOriginalToBooking.getValue();
    // const newListProduct = listProduct.filter(product => product.idProduct !== idProduct);
    // this.listProductOriginalToBooking.next(newListProduct);
  }  

  /* method to get the list of products selected to change date and hour (booking) */
  getListProductSelectedToBooking(): Observable<any[]> { return this.listProductSelectedToBooking.asObservable(); }
  setListProductSelectedToBooking(productsList: any[]): void { this.listProductSelectedToBooking.next(productsList); }
  
  //setear una orden de compra
  setPurchaseOrder(purchaseOrder: any): void {
    this.purchaseOrderFlow.next(purchaseOrder);
  }
  

  // setBooking(orders: Order[]): void {
  //   this.booking.value.orders = orders;
  // }

  getBooking(): IBooking {
    return this.bookings;
  }
}
