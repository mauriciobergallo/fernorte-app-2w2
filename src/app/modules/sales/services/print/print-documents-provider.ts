import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SaleOrderView } from '../../models/SaleOrderView';

@Injectable({
    providedIn: 'root',
})
export class DataService {
private saleOrderNew = new BehaviorSubject<any>(null);
getSaleOrder$ = this.saleOrderNew.asObservable();

sendOrder(saleOrder: SaleOrderView) {
    this.saleOrderNew.next(saleOrder);
    }
}