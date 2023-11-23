import { Component, Input, OnInit } from '@angular/core';
import { IProduct, ISupplier } from '../models/ISuppliers';
import { ProductsService } from '../services/products.service';
import { Subscription } from 'rxjs';
import { SupliersService } from '../services/supliers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-products-supplier',
  templateUrl: './products-supplier.component.html',
  styleUrls: ['./products-supplier.component.css'],
})
export class ProductsSupplierComponent implements OnInit {
  searchText: string = '';
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
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

  filterProducts(searchText: string) {
    this.filteredProducts = this.products.filter((product) => {
      return (
        product.name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    });
  }

  loadProducts() {
    this._productsService
      .getProductsBySupplier(this._supplierService.selectedSupplier)
      .subscribe((result: any) => {
        if (result.length == 0) {
          this.productsOwned = [];
        } else {
          this.productsOwned = result[0]?.products;
        }


        this._productsService.getProducts().subscribe((products) => {
          products.forEach((product) => {
            this.productsOwned.forEach((p) => {
              if (p.id_product == product.id_product) {
                product.price = p.price;
              }
            })
          })
          this.products = products;
          this.filteredProducts = products;
          this.clearInput()
        });
      });
  }
  clearInput(){
    this.searchText = '';
    this.filterProducts(this.searchText)

  }

  ngOnInit(): void {
    this._productsService.productCreated$.subscribe(() => {
      this.loadProducts();
    });
    this.loadProducts();
    this._supplierService
      .getSuplier(this._supplierService.selectedSupplier)
      .subscribe((supplier) => {
        this.selectedSupplier = supplier;
      });
  }

  deleteProduct(id: number) {
    this._productsService
      .deleteProduct(this._supplierService.selectedSupplier, id)
      .subscribe(() => {
        Swal.fire({
          title: 'Transaccion completada',
          text: 'Producto Eliminado con Exito!',
          icon: 'success',
        });
        this.loadProducts();
      });
  }
}
