import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { IDiscount } from '../../../models/IDiscounts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { DiscountsService } from '../../../services/discounts.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProductCategory } from '../../../models/IProductCategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit, OnDestroy {

  @Input() discount?: IDiscount | null = null;
  @Input() isEdit?: boolean = false;

  formGroup: FormGroup;
  listProducts: IProductCategory[] = [];
  isLoading: boolean = false;
  ngbModal:NgbModal
  subscription: Subscription;

  constructor(private fb: FormBuilder, _ngbModal:NgbModal, private prodService: ProductService, private disService: DiscountsService, @Optional() private modalService: NgbActiveModal) {
    this.formGroup = this.fb.group({
      id_discount: [null],
      id_product: [null],
      discount_rate: [null],
      start_date: [null],
      end_date: [null]
    });
   this.ngbModal = _ngbModal;
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.listProducts);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getProducts() {
    this.subscription.add(this.prodService.get().subscribe((res) => {
      this.listProducts = res;
    }));
  }




  onSubmit() {
    this.isLoading = true;
    if (this.isEdit) {
      let request = this.formGroup.value;
      request.id_product = Number(request.id_product)
      request.start_date = new Date(request.start_date)
      request.end_date = new Date(request.end_date)
      request.user = 'prueba';

      this.disService.updateDiscounts([request]).subscribe((res) => {
        this.isLoading = false;
        this.modalService.close(res)
      })
    } else {
      let request = this.formGroup.value;
      request.id_discount = 0;
      request.id_product = Number(request.id_product)
      request.start_date = new Date(request.start_date)
      request.end_date = new Date(request.end_date)
      request.user = 'prueba';

      this.disService.updateDiscounts([request]).subscribe((res) => {
        this.isLoading = false;
        this.modalService.close(res)
      })
    }
  }

  close() {
    this.modalService.close(false);
  }


}
