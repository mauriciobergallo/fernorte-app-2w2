import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProductCategory } from '../../models/IProductCategory';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewImageProductComponent } from './view-image-product/view-image-product.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/ICategory';
//import Swal from 'sweetalert2';

@Component({
  selector: 'fn-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  isLoading = false;

  listProducts: IProductCategory[] = [];
  private subscription = new Subscription();
  filterProduct: FormGroup;

  currentPage = 1;
  itemsPerPage = 15;
  sortBy = 'name';
  sortDir = 'desc';
  totalItems: number = 0;
  listCategories: ICategory[] = [];
  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.filterProduct = this.fb.group({
      name: [''],
      category: [''],
      isDeleted: [true]
    });
  }

  ngOnInit() {
    this.pagedProducts();
    this.filterProduct.valueChanges.subscribe(() => {
      this.pagedProducts();
    });
    this.categoryService.get().subscribe((res: ICategory[]) => {
      this.listCategories = res;
    });

  }

  private pagedProducts() {
    this.isLoading = true;
    this.subscription.add(
      this.productService
        .get(
          this.currentPage,
          this.itemsPerPage,
          this.sortBy,
          this.sortDir,
          this.filterProduct.value.isDeleted,
          this.filterProduct.value.name,
          this.filterProduct.value.category
        )
        .subscribe({
          next: (products: any) => {
            this.listProducts = products.products;
            this.totalItems = products.length;
            this.isLoading = false;
          },
          error: () => {
            /*  Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al cargar los productos, intente nuevamente',
            });*/
            this.isLoading = false;
          },
        })
    );
  }

  public handlePagination(event: any) {
    this.currentPage = event;
    this.pagedProducts();
  }

  openEditModal(product: IProductCategory) {
    const modalRef = this.modalService.open(AddProductComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then((data) => {
      if (data) {
        this.productService.get().subscribe((products: IProductCategory[]) => {
          this.listProducts = products;
        });
      }
    });
  }

  openDeleteModal(product: IProductCategory) {
    const modalRef = this.modalService.open(DeleteProductComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.product = product;
    modalRef.result.then(() => {
      this.productService.get().subscribe((res: IProductCategory[]) => {
        this.isLoading = false;
        this.listProducts = res;
      });
    });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(AddProductComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.result.then((res) => {
      if (res) {
        this.productService.get().subscribe((res: IProductCategory[]) => {
          this.listProducts = res;
        });
      }
    });
  }

  openImageModal(imageUrl: string) {
    const modalRef = this.modalService.open(ViewImageProductComponent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.imageUrl = imageUrl;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
