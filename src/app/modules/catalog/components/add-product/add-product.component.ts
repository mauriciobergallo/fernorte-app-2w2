import { Component, ViewChild } from '@angular/core';
import { IProduct, IProductRequest } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'fn-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productRequest:IProductRequest = {} as IProductRequest;
  @ViewChild('productForm') productForm: any;

  constructor(private productService: ProductService){}

  addCategoryVisible = false;
  addCategoryLinkVisible = true;
  showAddCategory() {
    this.addCategoryVisible = true;
    this.addCategoryLinkVisible = false;
  }

  hideAddCategory(){
    this.addCategoryVisible = false;
    this.addCategoryLinkVisible = true;
  }

  createProduct() {
    this.productService.updateOrCreateProduct(this.productRequest).subscribe(
      (response) => {
        console.log('Product created:', response);
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  cleanForm(){
    this.productForm.resetForm();
  }
}
