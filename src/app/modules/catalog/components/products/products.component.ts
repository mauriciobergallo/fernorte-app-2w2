import { Component } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { PRODUCT_LIST } from '../data/products-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from '../edit-product/edit-product.component';


@Component({
  selector: 'fn-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private modalService: NgbModal) { }


  products: IProduct[] = PRODUCT_LIST;

  currentPage = 1;
  itemsPerPage = 10;


  openEditModal(product: IProduct) {
    const modalRef = this.modalService.open(EditProductComponent, { size: 'lg' });
    modalRef.componentInstance.product = product;
  }


  get pagedProducts(): IProduct[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
