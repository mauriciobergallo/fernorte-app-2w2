import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  isLoading = true;
  private subscription = new Subscription();
  @Input() product: IProduct = {} as IProduct;
  productModified:IProduct = {} as IProduct;

  constructor(private productService: ProductService, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.productModified = { ...this.product};
    console.log(this.product)
  }

  closeModal() {
    this.activeModal.close();
  }

  updateProduct() {
    this.isLoading = true;

    const updatedProductData = {
      id_product: this.productModified.idProduct,
      name: this.productModified.name,
      description: this.productModified.description,
      unit_price: this.productModified.unitPrice,
      stock_quantity: this.productModified.stockQuantity,
      unit_of_measure: this.productModified.unitOfMeasure,
      id_category: Number(this.productModified.category.idCategory),
      ///Modificar con archivo image
      image: null,
      user_created: 'string'
    };

    this.subscription.add(
      this.productService.updateOrCreateProduct(updatedProductData).subscribe(
        (response) => {
          this.product = { ...this.productModified};
          this.isLoading = false;
          this.closeModal();
        },
        (error) => {
          console.error('Error updating product:', error);
          this.isLoading = false;
          this.closeModal();
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}