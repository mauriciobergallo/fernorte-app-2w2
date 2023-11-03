import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProductCategory } from '../../models/IProductCategory';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AddProductComponent } from './add-product/add-product.component';
//import Swal from 'sweetalert2';


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
    const modalRef = this.modalService.open(AddProductComponent, { size: 'lg' });
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(data => {
      if (data) {
        this.productService.get().subscribe((products: IProductCategory[]) => {
          this.listProducts = products;
        })
      }
    })
  }

  openDeleteModal(product: IProductCategory) {
    const modalRef = this.modalService.open(DeleteProductComponent, { size: 'lg' });
    modalRef.componentInstance.product = product;
    modalRef.result.then(() => {
      this.productService.get().subscribe((res: IProductCategory[]) => {
        this.isLoading = false;
        this.listProducts = res;
      })
    })
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
    this.isLoading = true;
    this.subscription.add(
      this.productService.get().subscribe({
        next: (products: IProductCategory[]) => {
          this.listProducts = products;
          this.isLoading = false;
        },
        error: () => {
          /*  Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al cargar los productos, intente nuevamente',
            });*/
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
