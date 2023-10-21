import { Component, Input, OnInit } from '@angular/core';
import { IProduct, IProductRequestEdit } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  @Input() product: IProduct = {} as IProduct;
  productModified:IProduct = {} as IProduct;

  constructor(private productService: ProductService, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.productModified = { ...this.product};
  }

  closeModal() {
    this.activeModal.close();
  }

  updateProduct() {
    const { category, urlImage, ...productModifiedWithoutCategory } = this.productModified;
    const productResponse: IProductRequestEdit = {
      ...productModifiedWithoutCategory,
      idCategory: category.idCategory,
      image: urlImage
    };

    console.log(productResponse)

    this.productService.updateProduct(productResponse).subscribe(
      (response) => {
        this.product = { ...this.productModified};
        console.log('Product updated:', response);
        this.closeModal();
      },
      (error) => {
        console.error('Error updating product:', error);
        this.closeModal();
      }
    );
  }
}