import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from './edit-product/edit-product.component';
import { IProductCategory } from '../../models/IProductCategory';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AddProductComponent } from './add-product/add-product.component';


@Component({
  selector: 'fn-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  isLoading = true;

  listProducts: IProductCategory[] = [];
  private subscription = new Subscription();

  currentPage = 1;
  itemsPerPage = 10;
  collectionSize = 20;

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.pagedProducts();
  }

  openEditModal(product: IProductCategory) {
    const modalRef = this.modalService.open(EditProductComponent, { size: 'lg' });
    modalRef.componentInstance.product = product;
  }

  openDeleteModal(product: IProductCategory){
    const modalRef = this.modalService.open(DeleteProductComponent, {size: 'lg'});
    modalRef.componentInstance.product = product;
  }

  openCreateModal() {
    const modalRef = this.modalService.open(AddProductComponent, { size: 'lg' });
    modalRef.result.then(res => {
      if (res) {
        this.productService.get().subscribe((res: IProductCategory[]) => {
          this.listProducts = res;
        })
      }
    })
  }
  private pagedProducts() {
    this.isLoading = true; // Mostrar el spinner
  
    this.subscription.add(
      this.productService.get().subscribe({
        next: (products: IProductCategory[]) => {
          this.listProducts = products;
          this.isLoading = false; // Ocultar el spinner después de que los datos se carguen
        },
        error: () => {
          alert('Error en la API');
          this.isLoading = false; // Ocultar el spinner en caso de error
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
