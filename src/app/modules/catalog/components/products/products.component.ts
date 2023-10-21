import { Component } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  listProducts: IProduct[] = [];
  private subscription = new Subscription();

  currentPage = 1;
  itemsPerPage = 7;

  constructor(private productService: ProductService) { }

  private pagedProducts() {

      this.subscription.add(
        this.productService.get().subscribe({
          next: (products: IProduct[]) => {
            this.listProducts = products;
          },
          error: () => {
            alert('error en la API')
          }
        }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.pagedProducts();
  }
}
