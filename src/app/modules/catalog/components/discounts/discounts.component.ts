import { Component, OnInit } from '@angular/core';
import { IDiscount } from '../../models/IDiscounts';
import { DiscountsService } from '../../services/discounts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDiscountComponent } from '../add-discount/add-discount.component';

@Component({
  selector: 'fn-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit{
  discountsList:IDiscount[] = [];

  currentPage = 1;
  itemsPerPage = 10;

  constructor(private disService:DiscountsService, private modalService: NgbModal){}

  ngOnInit(): void {
    this.disService.getDescuentos().subscribe((res:IDiscount[])=>{
      this.discountsList = res;
    })
  }

  // get pagedDiscounts(): IDiscount[] {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  // }

  isDiscountActive(discount: IDiscount) {
    const currentDate = new Date();
    return discount.end_date > currentDate;
  }

  openEditModal(discount: IDiscount) {
    const modalRef = this.modalService.open(AddDiscountComponent, { size: 'lg' });
    modalRef.componentInstance.discount = discount;
    modalRef.componentInstance.isEdit = true;
  }

}
