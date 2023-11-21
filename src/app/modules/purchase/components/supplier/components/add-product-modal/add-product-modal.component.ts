import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { SupliersService } from '../../services/supliers.service';
import { ISupplier } from '../../../../models/ISuppliers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent implements OnInit {
  product = {
    id: 0,
    precio: '',
    observations: '',
  };

  constructor(
    private _productService: ProductsService,
    private _supplierService: SupliersService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.product.id = this._productService.selectedProduct;
  }

  closeModal() {
    this.activeModal.close('Modal closed');
  }

  deleteProductBtn(id: number) {
    this.product.id = id;
  }

  addSupplier() {
    this._productService
      .addProduct(
        this._supplierService.selectedSupplier,
        this.product.id,
        parseInt(this.product.precio),
        this.product.observations
      )
      .subscribe(() => {
        this._productService.notifyProductCreated();
        this.closeModal();
      });
  }
}
