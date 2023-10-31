import { Component, Input, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from '../../../models/ICategory';
import { IProductCategory } from '../../../models/IProductCategory';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'fn-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  @Input() product?: IProductCategory | null = null;
  listCategories:ICategory[] = [];
  formGroup: FormGroup;
  isLoading: boolean = false;

  image?:File

  constructor(private fb: FormBuilder, private prodService: ProductService, @Optional() private modalService: NgbActiveModal, private router: Router,private categoryService:CategoryService) {
    this.formGroup = this.fb.group({
      id_product: [null],
      name: [null],
      description: [null],
      unit_price: [null],
      stock_quantity: [null],
      unit_of_measure: [null],
      id_category: [null],
      image: [null],
      user_created: [null]
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }
 getCategories(){
    this.categoryService.get().subscribe((res) => {
      this.listCategories = res;
    });
 }

  onFileSelected(event:any) {
   this.image= event.target.files[0];
   const fr = new FileReader();
    fr.onload = (e:any) => {
      this.image = e.target.result;
    }
    fr.readAsDataURL(this.image as Blob);
  }
  onSubmit() {
    this.isLoading = true;
    let request = this.formGroup.value;
    request.id_product = Number(request.id_product);
    request.unit_price = Number(request.unit_price);
    request.stock_quantity = Number(request.stock_quantity);
    request.id_category = Number(request.id_category);
    request.user_created = 'prueba';
    request.image = this.image;
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
