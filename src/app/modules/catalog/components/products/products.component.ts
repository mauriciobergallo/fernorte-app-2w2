import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProductCategory } from '../../models/IProductCategory';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewImageProductComponent } from './view-image-product/view-image-product.component';
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
  itemsPerPage = 15;
  sortBy = 'name';
  sortDir = 'desc';
  isDeleted = true;


  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.pagedProducts();
  }

  private pagedProducts() {
    this.isLoading = true;
    this.subscription.add(
      this.productService.get(this.currentPage, this.itemsPerPage, this.sortBy, this.sortDir, this.isDeleted).subscribe({
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

  public handlePagination(event: any) {
    this.currentPage = event.page;
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

  openImageModal(imageUrl: string) {
    const modalRef = this.modalService.open(ViewImageProductComponent, {size: 'md'});
    modalRef.componentInstance.imageUrl = imageUrl;
    };


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
