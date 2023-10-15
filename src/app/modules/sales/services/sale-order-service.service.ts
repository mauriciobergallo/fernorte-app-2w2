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
        return alert(res.data);
      }
      return alert(res.error.message)
    });
  }
}
