import { Component, Input, OnInit } from '@angular/core';
import { IDiscount } from '../../models/IDiscounts';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'fn-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
  
  @Input() discount?:IDiscount | null = null;
  @Input() isEdit?:boolean = false;

  formGroup:FormGroup | null= null;

  constructor(private fb:FormBuilder){}
  
  
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      products:[this.discount?.product],
      percentage: [this.discount?.discount_rate],
      startDate: [this.discount?.start_date],
      endDate: [this.discount?.end_date]
    });
  }


}
