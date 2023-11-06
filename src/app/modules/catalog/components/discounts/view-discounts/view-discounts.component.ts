import { Component, OnInit } from '@angular/core';
import { DiscountsService } from '../../../services/discounts.service';
import { IDiscount } from '../../../models/IDiscounts';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'fn-view-discounts',
  templateUrl: './view-discounts.component.html',
  styleUrls: ['./view-discounts.component.css']
})
export class ViewDiscountsComponent implements OnInit{

  discount:IDiscount | null = null;

  constructor(private disService:DiscountsService, private activeRouter:ActivatedRoute){}
  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((res:any)=>{
      this.disService.getDiscountById(res.params.id).subscribe((res:IDiscount)=>{
        this.discount = res;
      })
    })
  }

  transformDate(date: string) {
    const datePipe = new DatePipe('es-AR');
    const formattedDate = datePipe.transform(date, 'dd \'de\' MMMM \'del\' yyyy');
    return formattedDate;
  }

  isDiscountActive(discount: IDiscount) {
    const currentDate = new Date();
    return new Date(discount.end_date) >= currentDate && new Date(discount.start_date) <= currentDate;
  }


}
