import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { PurchaseOrderResponse } from '../../../models/IPurchaseOrder';
import {
  PaymentOrderDetailResponse,
  PaymentOrderResponse,
} from '../../../models/IPaymentOrder';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportsServiceService {
  url: string = 'http://localhost:5433/';
  purchaseOrdersList = new BehaviorSubject<PurchaseOrderResponse[]>([]);
  paymentOrdersList = new BehaviorSubject<PaymentOrderResponse[]>([]);
  filteredPurchaseOrdersList = new BehaviorSubject<PurchaseOrderResponse[]>([]);
  filteredPaymentOrdersList = new BehaviorSubject<PaymentOrderResponse[]>([]);
  constructor(
    private http: HttpClient
  ) {}

  getPurchaseOrders(): void {
    this.http
      .get<PurchaseOrderResponse[]>(`${this.url}purchase-orders`)
      .pipe(
        tap((purchaseOrders: PurchaseOrderResponse[]) => {
          this.purchaseOrdersList.next(purchaseOrders);
          this.filteredPurchaseOrdersList.next(purchaseOrders);
        })
      )
      .subscribe();
  }
  getPaymentOrders(): void {
    this.http
      .get<PaymentOrderResponse[]>(`${this.url}payment-orders`)
      .pipe(
        tap((paymentOrders: PaymentOrderResponse[]) => {
          this.paymentOrdersList.next(paymentOrders);
          this.filteredPaymentOrdersList.next(paymentOrders);
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

  getFilteredPaymentOrdersList() {
    return this.filteredPaymentOrdersList.asObservable();
  }
  setFilteredPaymentOrdersList(payments: PaymentOrderResponse[]): void {
    this.filteredPaymentOrdersList.next(payments);
  }

  applyFilter(
    rangeValue: number = 0,
    supplierId: number = 0,
    fromDate: Date | null = null,
    toDate: Date | null = null,
    tab: any = null
  ): void {
    if (!rangeValue && !supplierId && !fromDate && !toDate && !tab) {
      this.setFilteredPaymentOrdersList(this.paymentOrdersList.getValue());
      this.setFilteredPurchaseOrdersList(this.purchaseOrdersList.getValue());
      return;
    }
    tab.getValue() === 'COMPRA'
      ? this.filterPurchases(rangeValue, supplierId, fromDate, toDate)
      : this.filterPayments(rangeValue, supplierId, fromDate, toDate);
  }

  filterPurchases(
    rangeValue: number = 0,
    supplierId: number = 0,
    fromDate: Date | null = null,
    toDate: Date | null = null
  ): void {
    let filteredPurchaseOrders = this.purchaseOrdersList.getValue();
    if (rangeValue) {
      filteredPurchaseOrders = filteredPurchaseOrders.filter((purchase: PurchaseOrderResponse) => purchase.total <= rangeValue);
    }
    if (supplierId) {
      filteredPurchaseOrders = filteredPurchaseOrders
        .filter((purchase: PurchaseOrderResponse) => purchase.supplierId = supplierId);
    }
    if (fromDate) {
      filteredPurchaseOrders = filteredPurchaseOrders
        .filter((purchase: PurchaseOrderResponse) => new Date(purchase.date).getTime() > fromDate.getTime()
        );
    }
    if (toDate) {
      filteredPurchaseOrders = filteredPurchaseOrders
        .filter((purchase: PurchaseOrderResponse) => new Date(purchase.date).getTime() < toDate.getTime() );
    }
    this.setFilteredPurchaseOrdersList(filteredPurchaseOrders);
  }

  filterPayments(
    rangeValue: number = 0,
    supplierId: number = 0,
    fromDate: Date | null = null,
    toDate: Date | null = null
  ): void {
    let filteredPaymentsOrders = this.paymentOrdersList.getValue();
    if (rangeValue) {
      filteredPaymentsOrders = filteredPaymentsOrders
        .filter((payment: PaymentOrderResponse) => {
          const detailsTotal = this.setPaymentTotal(payment.paymentDetails);
          return detailsTotal <= rangeValue;
        });
    }
    if (supplierId) {
      filteredPaymentsOrders = filteredPaymentsOrders
        .filter((payment: PaymentOrderResponse) => payment.supplierId = supplierId);
    }
    if (fromDate) {
      filteredPaymentsOrders = filteredPaymentsOrders
        .filter((payment: PaymentOrderResponse) => payment.date >= fromDate);
    }
    if (toDate) {
      filteredPaymentsOrders = filteredPaymentsOrders
        .filter((payment: PaymentOrderResponse) => payment.date <= toDate);
    }
    this.setFilteredPaymentOrdersList(filteredPaymentsOrders);
  }

  setPaymentTotal(details: PaymentOrderDetailResponse[]): number {
    const total = details.reduce(
      (total: number, detail: PaymentOrderDetailResponse) =>
        total + detail.amount,
      0
    );
    return total;
  }
}
