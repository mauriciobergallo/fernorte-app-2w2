import { Component } from '@angular/core';
import { IDiscount } from '../../models/IDiscounts';
import { DISCOUNT_LIST } from '../data/discounts-data';

@Component({
  selector: 'fn-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent {
  products: IDiscount[] = DISCOUNT_LIST;

  currentPage = 1;
  itemsPerPage = 10;

  get pagedDiscounts(): IDiscount[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  isDiscountActive(discount: IDiscount) {
    const currentDate = new Date();
    return discount.end_date > currentDate;
  }
}
