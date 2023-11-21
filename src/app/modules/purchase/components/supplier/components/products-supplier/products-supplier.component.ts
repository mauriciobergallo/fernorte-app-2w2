import { Component, Input, OnInit } from '@angular/core';
import { IProduct, IProduct2, ISupplier } from '../../../../models/ISuppliers';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { SupliersService } from '../../services/supliers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-products-supplier',
  templateUrl: './products-supplier.component.html',
  styleUrls: ['./products-supplier.component.css'],
})
export class ProductsSupplierComponent implements OnInit {
  products: IProduct[] = [];
  productsOwned: IProduct[] = [];

  suscription = new Subscription();

  selectedSupplier: ISupplier = {} as ISupplier;
  constructor(
    private _productsService: ProductsService,
    private _supplierService: SupliersService,
    private modalService: NgbModal
  ) {}

  openModal(id: number) {
    this.modalService.open(AddProductModalComponent, {
      backdrop: 'static',
      size: 'md',
    });
    this._productsService.selectedProduct = id;
  }

  getSupplier() {
    this._supplierService
      .getSuplier(this._supplierService.selectedSupplier)
      .subscribe({});
  }

  loadProducts(){
    this._productsService
    .getProductsBySupplier(this._supplierService.selectedSupplier)
    .subscribe((result: any) => {
      this.productsOwned = result.products;
    });
  }

  ngOnInit(): void {
    this._productsService.productCreated$.subscribe(() => {
      this.loadProducts();
    });
    this._supplierService
      .getSuplier(this._supplierService.selectedSupplier)
      .subscribe((supplier) => {
        this.selectedSupplier = supplier;
      });
    this._productsService.getProducts().subscribe((products) => {
      this._productsService.products = products;
      this.products = products;
    });

    this.getSupplier();
    this._productsService
      .getProductsBySupplier(this._supplierService.selectedSupplier)
      .subscribe((result: any) => {
        this.productsOwned = result.products;
      });
  }

  isProductInBothLists(product: IProduct): boolean {
    return (
      this.products.some((item) => item.id === product.id) &&
      this.productsOwned.some((item) => item.id === product.id)
    );
  }
  getProductPrice(productId: number): number {
    const product = this.productsOwned.find((p) => p.id === productId);
    return product ? product.price : 0; // Default to 0 if not found.
  }

  deleteProduct(id: number) {
    this._productsService
      .deleteProduct(this._supplierService.selectedSupplier, id)
      .subscribe(() => {
        this.loadProducts()
        Swal.fire({
          title: 'Transaccion completada',
          text: 'Producto Eliminado con Exito!',
          icon: 'success',
        });
      });
  }
}
