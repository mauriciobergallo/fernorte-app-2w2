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
  ngbModal: NgbModal
  subscription: Subscription;

  currentPage = 1;
  itemsPerPage = 15;
  sortBy = 'name';
  sortDir = 'asc';
  totalItems: number = 0;
  isDeleted: boolean = false
  name = '';
  category = 0;

  constructor(private fb: FormBuilder, _ngbModal: NgbModal, private prodService: ProductService, private disService: DiscountsService, @Optional() private modalService: NgbActiveModal) {
    this.formGroup = this.fb.group({
      idDiscount: [null],
      idProduct: [null],
      discountRate: [null],
      startDate: [null],
      endDate: [null]
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
    this.prodService.get(this.currentPage,1500,this.sortBy,this.sortDir,false).subscribe((res: any) => {
      this.listProducts = res.products
    })

  }



  onSubmit() {
    this.isLoading = true;
    if (this.isEdit) {
      let request = this.formGroup.value;
      request.idProduct = Number(request.idProduct)
      request.startDate = new Date(request.startDate)
      request.endDate = new Date(request.endDate)
      request.user = 'prueba';

      this.disService.updateDiscounts([request]).subscribe((res) => {
        this.isLoading = false;
        this.modalService.close(res)
      })
    } else {
      let request = this.formGroup.value;
      request.idDiscount = 0;
      request.idProduct = Number(request.idProduct)
      request.startDate = new Date(request.startDate)
      request.endDate = new Date(request.endDate)
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
