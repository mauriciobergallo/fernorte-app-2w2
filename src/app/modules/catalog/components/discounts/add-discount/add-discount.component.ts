import { Component, Input, OnInit, Optional } from '@angular/core';
import { IDiscount } from '../../../models/IDiscounts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../models/IProduct';
import { DiscountsService } from '../../../services/discounts.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProductCategory } from '../../../models/IProductCategory';

@Component({
  selector: 'fn-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
  
  @Input() discount?:IDiscount | null = null;
  @Input() isEdit?:boolean = false;

  formGroup:FormGroup;
  products:IProductCategory[] = [];
  isLoading:boolean = false;

  constructor(private fb:FormBuilder, private prodService:ProductService, private disService:DiscountsService, @Optional() private modalService: NgbActiveModal){
    this.formGroup = this.fb.group({
      id_discount: [null],
      id_product: [null],
      discount_rate: [null],
      start_date: [null],
      end_date: [null]
    });
  }
  
  
  ngOnInit(): void {
    this.prodService.get().subscribe((res:IProductCategory[])=>{
      this.products = res
      this.formGroup = this.fb.group({
        id_discount:[this.discount?.id_discount],
        id_product:[this.discount?.product.id_product],
        discount_rate: [this.discount?.discount_rate],
        start_date: [this.discount?.start_date],
        end_date: [this.discount?.end_date],
      });
    });
  }

  onSubmit(){
    this.isLoading = true;
    if(this.isEdit){
      let request = this.formGroup.value;
      request.id_product = Number(request.id_product)
      request.start_date = new Date(request.start_date)
      request.end_date = new Date(request.end_date)
      request.user = 'prueba';

      this.disService.updateDiscounts([request]).subscribe((res)=>{
        this.isLoading = false;
        this.modalService.close(res)
      })
    }else{
      let request = this.formGroup.value;
      request.id_discount = 0;
      request.id_product = Number(request.id_product)
      request.start_date = new Date(request.start_date)
      request.end_date = new Date(request.end_date)
      request.user = 'prueba';

      this.disService.updateDiscounts([request]).subscribe((res)=>{
        this.isLoading = false;
        this.modalService.close(res)
      })
    }
  }
  
  close(){
    this.modalService.close(false);
  }


}
