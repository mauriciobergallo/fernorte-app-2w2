import { Injectable } from '@angular/core';
import { ISaleOrder } from '../interfaces/isale-order';
import { SaleOrderProvider } from '../providers/SaleOrderProvider';
@Injectable({
  providedIn: 'root'
})
export class SaleOrderServiceService {

  constructor(private saleOrderProvider: SaleOrderProvider) { }


  createSaleOrder(saleOrder: ISaleOrder) {
    
    this.saleOrderProvider.createSaleOrder(saleOrder).subscribe((res) => {
      if (res.ok) {
        return res.data
      }
      return null;
    });
  }

  getSaleOrders() : ISaleOrder[] {
    return this.saleOrderProvider.getSaleOrders();
  }

  getSaleOrdersByFilter(filter : string) : ISaleOrder[] {
    const saleOrdersList : ISaleOrder[] = [];
    this.saleOrderProvider.getSaleOrdesByFilter(filter).subscribe((response) => {
      if(response.ok) {
        for(let sale of response.data) {
          saleOrdersList.push(sale)
          return saleOrdersList;
        }
      }
      return null
    });
    return saleOrdersList;
  }
}
