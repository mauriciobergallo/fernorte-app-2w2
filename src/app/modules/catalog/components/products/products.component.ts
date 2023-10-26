import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from '../edit-product/edit-product.component';


@Component({
  selector: 'fn-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  isLoading = true;

  listProducts: IProduct[] = [];
  private subscription = new Subscription();

  currentPage = 1;
  itemsPerPage = 10;

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.pagedProducts();
  }

  openEditModal(product: IProduct) {
    const modalRef = this.modalService.open(EditProductComponent, { size: 'lg' });
    modalRef.componentInstance.product = product;
  }

  private pagedProducts() {
    this.isLoading = true;

    this.subscription.add(
      this.productService.get().subscribe({
        next: (data: any[]) => {
          this.listProducts = data.map(item => ({
            idProduct: item.id_product,
            name: item.name,
            description: item.description,
            unitPrice: item.unit_price, 
            stockQuantity: item.stock_quantity, 
            unitOfMeasure: item.unit_of_measure, 
            category: {
              idCategory: item.category.id_category, 
              name: item.category.name, 
              description: item.category.description
            },
            urlImage: item.url_image, 
          }));
          this.isLoading = false;
        },
        error: () => {
          alert('Error in the API');
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
