import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../models/ICategory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalDiscountComponent } from '../../discounts/delete-modal-discount/delete-modal-discount.component';
import { CategoryService } from '../../../services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  isLoading = true;
  listCategories: ICategory[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  constructor(private categoryService:CategoryService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.get().subscribe({
      next: (cat: ICategory[]) => {
        this.isLoading = false;
        this.listCategories = cat;
      },
      error: () => {
        this.isLoading = false;
      /*  Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar las categorías, intente nuevamente',
        });*/
      }
    });
  }
  openEditModal(category: ICategory) {
    const modalRef = this.modalService.open(AddCategoryComponent, { size: 'lg' });
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(data => {
      if (data) {
        this.categoryService.get().subscribe((cat: ICategory[]) => {
          this.listCategories = cat;
        })
      }
    })
  }
  openCreateModal() {
    const modalRef = this.modalService.open(AddCategoryComponent, { size: 'lg' });
    modalRef.result.then(data => {
      if (data) {
        this.categoryService.get().subscribe((cat: ICategory[]) => {
          this.listCategories = cat;
        })
      }
    })
  }
  openDeleteModal(category: ICategory) {
    const modalRef = this.modalService.open(DeleteModalDiscountComponent, { size: 'lg' });
    modalRef.componentInstance.category = category;
    modalRef.result.then(() => {
      this.categoryService.get().subscribe((cat: ICategory[]) => {
        this.listCategories = cat;
      })
    })
  }
}
