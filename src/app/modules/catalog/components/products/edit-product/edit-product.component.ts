import { Component, Input, OnInit, Optional } from '@angular/core';
import { IProductCategory } from '../../../models/IProductCategory';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../models/ICategory';

@Component({
  selector: 'fn-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() product?: IProductCategory | null = null;
  listCategories:ICategory[] = [];
  formGroup: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private prodService: ProductService, @Optional() private modalService: NgbActiveModal, private router: Router,private categoryService:CategoryService) {
    this.formGroup = this.fb.group({
      id_product: [null],
      name: [null],
      description: [null],
      unit_price: [null],
      stock_quantity: [null],
      unit_of_measure: [null],
      id_category: [null],
      user_created: [null]
    });
  }

  ngOnInit(): void {
    this.formGroup.patchValue({
      id_product: this.product?.id_product,
      name: this.product?.name,
      description: this.product?.description,
      unit_price: this.product?.unit_price,
      stock_quantity: this.product?.stock_quantity,
      unit_of_measure: this.product?.unit_of_measure,
      id_category: this.product?.category.id_category,
      user_created: this.product?.user_created
    });
    this.getCategories();
  }
 getCategories(){
    this.categoryService.get().subscribe((res) => {
      this.listCategories = res;
    });
 }
  onSubmit() {
    this.isLoading = true;
    let request = this.formGroup.value;
    request.id_product = Number(request.id_product);
    request.unit_price = Number(request.unit_price);
    request.stock_quantity = Number(request.stock_quantity);
    request.id_category = Number(request.id_category);
    request.user_created = 'prueba';
debugger
    this.prodService.put(request).subscribe((res) => {
      this.isLoading = false;
      this.modalService.close(res);
      this.router.navigateByUrl('/catalog/products/list', { skipLocationChange: true }).then(() => {
      location.reload();
      });
    });
  }

  close() {
    this.modalService.close(false);
  }
}
