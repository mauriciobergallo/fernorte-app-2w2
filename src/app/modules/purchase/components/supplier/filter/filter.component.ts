import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct, ISupplier } from '../models/ISuppliers';
import { SupliersService } from '../services/supliers.service';
import { PricesModalComponent } from '../prices-modal/prices-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  searchText: string = '';
  products: IProduct[] = [];
  suppliers: ISupplier[] = [];
  filteredProducts: IProduct[] = [];

  constructor(
    private productService: ProductsService,
    private supplierService: SupliersService,
    private modalService: NgbModal
  ) {}

  openModal(id: number) {
    this.modalService.open(PricesModalComponent, {
      backdrop: 'static',
      size: 'md',
    });
    this.productService.selectedProductPrice = id;
  }


  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
    this.supplierService.getSupliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
    });
  }

  getProductBySupplier(event: any) {
    this.clearInput()
    console.log(event.target.value)
    if (event.target.value == '0' || event.target.value == ''){
      this.loadData()
      return
    }
    this.productService
      .getProductsBySupplier(event.target.value)
      .subscribe((response) => {
        this.products = response[0].products;
        this.filteredProducts = response[0].products;
      });
  }

  filterProducts(searchText: string) {
    this.filteredProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  clearInput() {
    this.searchText = '';
  }

  
}
